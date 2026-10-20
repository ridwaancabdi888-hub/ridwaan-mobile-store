(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RidwaanProductCard = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    })[character]);
  }

  function renderProductCard(product, options = {}) {
    const id = Number(product.id);
    if (!Number.isInteger(id)) throw new TypeError('Product cards require an integer id');

    const wished = Boolean(options.wished);
    const money = options.money || (value => String(value));
    const icon = options.icon || (() => '');
    const name = escapeHtml(product.name);
    const titleId = `product-title-${id}`;
    const wishlistAction = wished ? 'Remove' : 'Add';

    return `<article class="product-card"><div class="product-media"><span class="discount-badge">-${escapeHtml(product.discount)}%</span><button type="button" class="wish-btn ${wished ? 'active' : ''}" onclick="toggleWishlist(${id})" aria-label="${wishlistAction} ${name} ${wished ? 'from' : 'to'} wishlist">${icon('heart')}</button><button type="button" class="product-image-button" onclick="showProduct(${id})" aria-labelledby="${titleId}"><img src="${escapeHtml(product.image)}" alt="" loading="lazy" onerror="imageFallback(this)"></button></div><div class="product-info"><span class="brand">${escapeHtml(product.brand)}</span><h3 class="product-name" id="${titleId}"><button type="button" class="product-name-button" onclick="showProduct(${id})">${name}</button></h3><span class="rating">${icon('star')} ${escapeHtml(product.rating)} <span>(${escapeHtml(product.reviews)})</span></span><div class="price-row"><strong class="price">${escapeHtml(money(product.price))}</strong><del class="old-price">${escapeHtml(money(product.oldPrice))}</del><button type="button" class="add-btn" onclick="quickAdd(${id})" aria-label="Add ${name} to cart">${icon('plus')}</button></div></div></article>`;
  }

  return {escapeHtml, renderProductCard};
});
