import { renderProductTeaser }
  from '../product-teaser/product-teaser.js';

export default async function decorate(block) {
  const response = await fetch('/query-index.json');
  const json = await response.json();

  const currentPath = window.location.pathname;

  const currentProduct = json.data.find(
    (item) => item.path === currentPath
  );

  if (!currentProduct) return;

  const relatedProducts = json.data
    .filter((item) =>
      item.template.toLowerCase() === 'product'
      && item.category === currentProduct.category
      && item.path !== currentPath)
    .slice(0, 4);

  block.innerHTML = `
    <div class="related-products-list">

      <h2>Related Products</h2>

      <div class="related-products-grid">

        ${relatedProducts
          .map(renderProductTeaser)
          .join('')}

      </div>

    </div>
  `;
}