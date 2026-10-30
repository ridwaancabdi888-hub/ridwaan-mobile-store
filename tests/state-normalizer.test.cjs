const test = require('node:test');
const assert = require('node:assert/strict');
const {normalizeStoreState} = require('../state-normalizer.js');

const defaults = {
  cart: [],
  wishlist: [],
  orders: [],
  users: [{id: 'admin'}],
  products: [{id: 1}],
  profile: {name: 'Ridwaan', city: 'Hargeisa'},
  session: null,
  points: 1850,
  theme: 'light',
  language: 'English',
  notifications: true,
  biometric: true,
  usePoints: false,
  promo: ''
};

test('falls back safely when stored state is not an object', () => {
  const state = normalizeStoreState(defaults, 'corrupt state');

  assert.deepEqual(state.cart, []);
  assert.deepEqual(state.products, [{id: 1}]);
  assert.deepEqual(state.profile, defaults.profile);
  assert.equal(state.points, 1850);
});

test('repairs collections with invalid shapes', () => {
  const state = normalizeStoreState(defaults, {
    cart: {id: 1},
    wishlist: null,
    orders: 'none',
    users: 42,
    products: false
  });

  assert.deepEqual(state.cart, []);
  assert.deepEqual(state.wishlist, []);
  assert.deepEqual(state.orders, []);
  assert.deepEqual(state.users, [{id: 'admin'}]);
  assert.deepEqual(state.products, [{id: 1}]);
});

test('keeps valid stored collections and profile fields', () => {
  const cart = [{key: '1-128GB-Black', id: 1, qty: 2}];
  const state = normalizeStoreState(defaults, {
    cart,
    wishlist: [1],
    orders: [{number: 'RMS-1'}],
    users: [{id: 'customer'}],
    products: [{id: 2}],
    profile: {name: 'Customer'},
    session: {userId: 'customer'}
  });

  assert.equal(state.cart, cart);
  assert.deepEqual(state.profile, {name: 'Customer', city: 'Hargeisa'});
  assert.deepEqual(state.session, {userId: 'customer'});
});

test('rejects unsafe preference and numeric values', () => {
  const state = normalizeStoreState(defaults, {
    points: -10,
    theme: 'neon',
    language: 'Unknown',
    notifications: 'yes',
    biometric: 1,
    usePoints: 'true',
    promo: {code: 'RIDWAAN10'}
  });

  assert.equal(state.points, defaults.points);
  assert.equal(state.theme, defaults.theme);
  assert.equal(state.language, defaults.language);
  assert.equal(state.notifications, defaults.notifications);
  assert.equal(state.biometric, defaults.biometric);
  assert.equal(state.usePoints, defaults.usePoints);
  assert.equal(state.promo, defaults.promo);
});
