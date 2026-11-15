const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const serviceWorker = fs.readFileSync(path.join(projectRoot, 'sw.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, 'manifest.webmanifest'), 'utf8'));

function localPath(reference) {
  if (!reference || reference.startsWith('#') || /^(?:data:|https?:|\/\/)/.test(reference)) return null;
  return new URL(reference, 'https://store.test/').pathname;
}

function appShellAssets() {
  const declaration = serviceWorker.match(/const APP_SHELL\s*=\s*(\[[\s\S]*?\]);/);
  assert.ok(declaration, 'sw.js must declare APP_SHELL as an array');
  return vm.runInNewContext(declaration[1]);
}

function assertProjectFile(asset) {
  const file = path.join(projectRoot, asset.replace(/^\//, ''));
  assert.equal(fs.existsSync(file), true, `${asset} must exist in the repository`);
}

function createServiceWorkerHarness({networkResponse, networkError, fallback} = {}) {
  const listeners = {};
  const writes = [];
  const sandbox = {
    URL,
    self: {
      location: {origin: 'https://store.test'},
      clients: {claim: async () => {}},
      skipWaiting() {},
      addEventListener(type, handler) { listeners[type] = handler; }
    },
    caches: {
      async open() {
        return {
          async addAll() {},
          async put(key, response) { writes.push({key, response}); }
        };
      },
      async keys() { return []; },
      async delete() { return true; },
      async match(key) { return key === '/index.html' ? fallback : undefined; }
    },
    async fetch() {
      if (networkError) throw networkError;
      return networkResponse;
    }
  };

  vm.runInNewContext(serviceWorker, sandbox);
  return {listeners, writes};
}

function navigationEvent(listener) {
  let responsePromise;
  listener({
    request: {method: 'GET', mode: 'navigate', url: 'https://store.test/shop'},
    respondWith(value) { responsePromise = Promise.resolve(value); }
  });
  return responsePromise;
}

test('the service worker pre-caches every local asset required by index.html', () => {
  const shell = new Set(appShellAssets());
  const references = [...indexHtml.matchAll(/<(?:link|script)\b[^>]*(?:href|src)=["']([^"']+)["']/gi)]
    .map(match => localPath(match[1]))
    .filter(Boolean);

  for (const asset of references) {
    assertProjectFile(asset);
    assert.ok(shell.has(asset), `${asset} must be included in APP_SHELL`);
  }
});

test('every pre-cached app-shell asset exists', () => {
  for (const asset of appShellAssets()) {
    if (asset === '/') continue;
    assertProjectFile(asset);
  }
});

test('the web manifest points to valid in-scope files', () => {
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest must provide an icon');

  for (const icon of manifest.icons) {
    const asset = localPath(icon.src);
    assert.ok(asset, `manifest icon ${icon.src} must be a local file`);
    assertProjectFile(asset);
    assert.ok(appShellAssets().includes(asset), `${asset} must be available offline`);
  }
});

test('the page registers the repository service worker', () => {
  const script = fs.readFileSync(path.join(projectRoot, 'script.js'), 'utf8');
  assert.match(script, /navigator\.serviceWorker\.register\(['"]\.\/sw\.js['"]\)/);
});

test('successful navigation refreshes the offline fallback before resolving', async () => {
  const cachedCopy = {source: 'network copy'};
  const response = {ok: true, clone: () => cachedCopy};
  const {listeners, writes} = createServiceWorkerHarness({networkResponse: response});

  const result = await navigationEvent(listeners.fetch);

  assert.equal(result, response);
  assert.deepEqual(writes, [{key: '/index.html', response: cachedCopy}]);
});

test('failed HTTP navigation does not replace the working offline fallback', async () => {
  const response = {ok: false, status: 404, clone() { throw new Error('must not clone'); }};
  const {listeners, writes} = createServiceWorkerHarness({networkResponse: response});

  const result = await navigationEvent(listeners.fetch);

  assert.equal(result, response);
  assert.deepEqual(writes, []);
});

test('offline navigation returns the cached app shell', async () => {
  const fallback = {ok: true, source: 'cache'};
  const {listeners, writes} = createServiceWorkerHarness({
    networkError: new Error('offline'),
    fallback
  });

  const result = await navigationEvent(listeners.fetch);

  assert.equal(result, fallback);
  assert.deepEqual(writes, []);
});
