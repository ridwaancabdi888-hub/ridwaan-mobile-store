(function attachDialogUtilities(global) {
  const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function createDialogManager(root, doc = global.document, schedule = global.setTimeout) {
    let returnFocus = null;
    let titleSequence = 0;

    function focusableElements(dialog) {
      return [...dialog.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element =>
        !element.hidden && element.getAttribute('aria-hidden') !== 'true'
      );
    }

    function open(content, extraClass = '') {
      if (!root.firstElementChild) returnFocus = doc.activeElement;
      root.innerHTML = `<div class="sheet ${extraClass}" role="dialog" aria-modal="true" tabindex="-1"><div class="grabber"></div>${content}</div>`;

      const dialog = root.firstElementChild;
      const heading = dialog.querySelector('h1,h2,h3');
      if (heading) {
        heading.id ||= `sheet-title-${++titleSequence}`;
        dialog.setAttribute('aria-labelledby', heading.id);
      } else {
        dialog.setAttribute('aria-label', 'Dialog');
      }

      root.onclick = event => {
        if (event.target === root) close();
      };
      schedule(() => (focusableElements(dialog)[0] || dialog).focus(), 0);
    }

    function close() {
      if (!root.firstElementChild) return;
      const previousFocus = returnFocus;
      returnFocus = null;
      root.innerHTML = '';
      root.onclick = null;
      if (previousFocus && doc.contains(previousFocus)) schedule(() => previousFocus.focus(), 0);
    }

    function handleKeydown(event) {
      const dialog = root.firstElementChild;
      if (!dialog) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = focusableElements(dialog);
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    return {open, close, handleKeydown};
  }

  const api = {createDialogManager};
  global.RidwaanDialogs = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
