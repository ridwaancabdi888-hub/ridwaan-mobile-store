(function attachStateNormalizer(global) {
  const COLLECTION_KEYS = ['cart', 'wishlist', 'orders', 'users', 'products'];

  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function normalizeStoreState(defaults, stored) {
    const input = isRecord(stored) ? stored : {};
    const normalized = {...defaults, ...input};

    for (const key of COLLECTION_KEYS) {
      normalized[key] = Array.isArray(input[key]) ? input[key] : [...defaults[key]];
    }

    normalized.profile = {
      ...defaults.profile,
      ...(isRecord(input.profile) ? input.profile : {})
    };
    normalized.session = input.session === null || isRecord(input.session)
      ? input.session
      : defaults.session;
    normalized.points = Number.isFinite(input.points) && input.points >= 0
      ? input.points
      : defaults.points;
    normalized.theme = ['light', 'dark'].includes(input.theme)
      ? input.theme
      : defaults.theme;
    normalized.language = ['English', 'Somali', 'Arabic'].includes(input.language)
      ? input.language
      : defaults.language;

    for (const key of ['notifications', 'biometric', 'usePoints']) {
      normalized[key] = typeof input[key] === 'boolean' ? input[key] : defaults[key];
    }

    normalized.promo = typeof input.promo === 'string' ? input.promo : defaults.promo;
    return normalized;
  }

  const api = {normalizeStoreState};
  global.RidwaanState = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
