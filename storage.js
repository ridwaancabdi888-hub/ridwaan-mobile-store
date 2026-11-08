(function attachStorageUtilities(global) {
  function createJsonStorage(getStorage) {
    function read(key, fallback) {
      try {
        const raw = getStorage().getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw) ?? fallback;
      } catch {
        return fallback;
      }
    }

    function write(key, value) {
      try {
        const serialized = JSON.stringify(value);
        if (typeof serialized !== 'string') return false;
        getStorage().setItem(key, serialized);
        return true;
      } catch {
        return false;
      }
    }

    return {read, write};
  }

  const api = {createJsonStorage};
  global.RidwaanStorage = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
