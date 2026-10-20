const test = require('node:test');
const assert = require('node:assert/strict');
const {renderProductCard} = require('../product-card.js');

const product = {
  id: 7,
  name: 'Pixel <Pro>',
  brand: 'Google & Co',
  image: 'images/pixel.jpg',
  discount: 12,
  rating: 4.8,
  reviews: 25,
  price: 799,
  oldPrice: 899
};

function render(options = {}) {
  return renderProductCard(product, {
    money: value => `$${value}`,
    icon: name => `<svg data-icon="${name}"></svg>`,
    ...options
  });
}

function maximumButtonDepth(markup) {
  let depth = 0;
  let maximum = 0;
  for (const [token] of markup.matchAll(/<\/?button\b[^>]*>/g)) {
    if (token.startsWith('</')) depth -= 1;
    else {
      depth += 1;
      maximum = Math.max(maximum, depth);
    }
  }
  return maximum;
}

test('uses native buttons without nesting interactive controls', () => {
  const markup = render();

  assert.doesNotMatch(markup, /role="button"|tabindex="0"|onkeydown=/);
  assert.match(markup, /class="product-media">[\s\S]*class="product-image-button"/);
  assert.match(markup, /class="product-name-button"/);
  assert.equal((markup.match(/<button\b/g) || []).length, 4);
  assert.equal(maximumButtonDepth(markup), 1);
});

test('associates the image control with the visible product title', () => {
  const markup = render();

  assert.match(markup, /aria-labelledby="product-title-7"/);
  assert.match(markup, /<h3 class="product-name" id="product-title-7">/);
  assert.match(markup, /<img[^>]+alt=""/);
});

test('escapes product content and exposes specific action labels', () => {
  const markup = render({wished: true});

  assert.doesNotMatch(markup, /Pixel <Pro>|Google & Co/);
  assert.match(markup, /Pixel &lt;Pro&gt;/);
  assert.match(markup, /Google &amp; Co/);
  assert.match(markup, /aria-label="Remove Pixel &lt;Pro&gt; from wishlist"/);
  assert.match(markup, /aria-label="Add Pixel &lt;Pro&gt; to cart"/);
});

test('rejects ids that are unsafe for inline event handlers', () => {
  assert.throws(
    () => renderProductCard({...product, id: '7;alert(1)'}, {}),
    /integer id/
  );
});
