import { renderProductTeaser } from '../product-teaser/product-teaser.js';

export default async function decorate(block) {
    const jsonUrl = block.querySelector('a')?.href
        || block.textContent.trim();

    const response = await fetch(`/query-index.json`);
    const json = await response.json();

    const isCategoryGrid = block.classList.contains('categories');
    const isProductGrid = block.classList.contains('products');
    const finalProducts=json.data.slice(0,10);
    const items = finalProducts.filter((item) => {
        if (isCategoryGrid) {
            return item.template === 'Category';
        }

        if (isProductGrid) {
            return item.template === 'Product';
        }

        return false;
    });


    const cards = items.map((item) =>item.template === 'Category' ? `
    
  <li class="promo-card">
    <a href="${item.path}" class="promo-card-link">
      <img class="promo-card-image" src="${item.image}" alt="${item.category}">

      <div class="promo-card-content">
        <h3>${item.title}</h3>

        ${isProductGrid ? `<p>${item.description}</p>` : ''}
        ${isProductGrid ? `<p>&dollar;${item.price}</p>` : ''}
        ${isProductGrid ? `<button class="promo-card-cta">Add to Cart</button>` : ''}
      </div>
    </a>
    </li>
  `:renderProductTeaser(item)).join('');

    block.innerHTML = `
    <ul class="promo-grid-list">
      ${cards}
    </ul>
  `;
}