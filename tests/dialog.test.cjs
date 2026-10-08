const test = require('node:test');
const assert = require('node:assert/strict');
const {createDialogManager} = require('../dialog.js');

function element(name) {
  return {
    name,
    hidden: false,
    attributes: {},
    focusCount: 0,
    focus() { this.focusCount += 1; },
    getAttribute(key) { return this.attributes[key] ?? null; },
    setAttribute(key, value) { this.attributes[key] = value; }
  };
}

function harness({withHeading = true, controls = []} = {}) {
  const launcher = element('launcher');
  const heading = withHeading ? element('heading') : null;
  const dialog = element('dialog');
  dialog.querySelector = selector => selector === 'h1,h2,h3' ? heading : null;
  dialog.querySelectorAll = () => controls;

  let markup = '';
  const root = {
    firstElementChild: null,
    onclick: null,
    get innerHTML() { return markup; },
    set innerHTML(value) {
      markup = value;
      this.firstElementChild = value ? dialog : null;
    }
  };
  const doc = {
    activeElement: launcher,
    contains: candidate => candidate === launcher
  };
  const manager = createDialogManager(root, doc, callback => callback());
  return {manager, root, doc, launcher, heading, dialog};
}

test('labels a dialog from its first heading and focuses its first control', () => {
  const first = element('first');
  const {manager, dialog, heading} = harness({controls: [first]});

  manager.open('<h2>Filters</h2><button>Close</button>');

  assert.match(heading.id, /^sheet-title-\d+$/);
  assert.equal(dialog.attributes['aria-labelledby'], heading.id);
  assert.equal(first.focusCount, 1);
});

test('falls back to an accessible label when content has no heading', () => {
  const {manager, dialog} = harness({withHeading: false});
  manager.open('<button>Continue</button>');
  assert.equal(dialog.attributes['aria-label'], 'Dialog');
});

test('focuses the dialog container when it has no interactive controls', () => {
  const {manager, dialog} = harness();
  manager.open('<h2>Status</h2><p>Saved.</p>');
  assert.equal(dialog.focusCount, 1);
});

test('traps forward and backward tab navigation inside the dialog', () => {
  const first = element('first');
  const last = element('last');
  const {manager, doc} = harness({controls: [first, last]});
  manager.open('<h2>Dialog</h2>');

  doc.activeElement = last;
  let prevented = false;
  manager.handleKeydown({key: 'Tab', shiftKey: false, preventDefault() { prevented = true; }});
  assert.equal(prevented, true);
  assert.equal(first.focusCount, 2);

  doc.activeElement = first;
  prevented = false;
  manager.handleKeydown({key: 'Tab', shiftKey: true, preventDefault() { prevented = true; }});
  assert.equal(prevented, true);
  assert.equal(last.focusCount, 1);
});

test('Escape closes the dialog and restores focus to its launcher', () => {
  const {manager, root, launcher} = harness({controls: [element('close')]});
  manager.open('<h2>Dialog</h2>');
  let prevented = false;

  manager.handleKeydown({key: 'Escape', preventDefault() { prevented = true; }});

  assert.equal(prevented, true);
  assert.equal(root.firstElementChild, null);
  assert.equal(launcher.focusCount, 1);
});

test('clicking the backdrop closes the dialog', () => {
  const {manager, root, launcher} = harness({controls: [element('close')]});
  manager.open('<h2>Dialog</h2>');

  root.onclick({target: root});

  assert.equal(root.firstElementChild, null);
  assert.equal(launcher.focusCount, 1);
});
