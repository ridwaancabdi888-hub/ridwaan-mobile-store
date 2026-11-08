const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createJsonStorage} = require('../storage.js');

const storefrontScript = fs.readFileSync(path.resolve(__dirname, '..', 'script.js'), 'utf8');

test('reads valid JSON and returns the fallback for missing or malformed data', () => {
  const values = new Map([
    ['valid', JSON.stringify({theme: 'dark'})],
    ['malformed', '{not-json']
  ]);
  const storage = createJsonStorage(() => ({
    getItem: key => values.has(key) ? values.get(key) : null
  }));

  assert.deepEqual(storage.read('valid', {}), {theme: 'dark'});
  assert.deepEqual(storage.read('missing', {theme: 'light'}), {theme: 'light'});
  assert.deepEqual(storage.read('malformed', {theme: 'light'}), {theme: 'light'});
});

test('keeps the app usable when browser storage is unavailable', () => {
  const storage = createJsonStorage(() => {
    throw new Error('Storage blocked');
  });

  assert.deepEqual(storage.read('state', {cart: []}), {cart: []});
  assert.equal(storage.write('state', {cart: []}), false);
});

test('serializes state once before writing it', () => {
  let storedKey;
  let storedValue;
  const storage = createJsonStorage(() => ({
    setItem(key, value) {
      storedKey = key;
      storedValue = value;
    }
  }));

  assert.equal(storage.write('rms_state', {points: 1850}), true);
  assert.equal(storedKey, 'rms_state');
  assert.equal(storedValue, '{"points":1850}');
});

test('reports quota and serialization failures without throwing', () => {
  const quotaFailure = createJsonStorage(() => ({
    setItem() { throw new Error('Quota exceeded'); }
  }));
  const circular = {};
  circular.self = circular;

  assert.equal(quotaFailure.write('state', {}), false);
  assert.equal(quotaFailure.write('state', circular), false);
});

test('the storefront routes all persisted state through the safe storage adapter', () => {
  assert.match(storefrontScript, /RidwaanStorage\.createJsonStorage/);
  assert.match(storefrontScript, /storeStorage\.read\('rms_state'/);
  assert.match(storefrontScript, /storeStorage\.write\('rms_state'/);
  assert.doesNotMatch(storefrontScript, /localStorage\.(?:getItem|setItem)/);
});
