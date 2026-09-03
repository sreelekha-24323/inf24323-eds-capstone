import { renderProductTeaser } from "../product-teaser/product-teaser.js";

export default async function decorate(block) {
  // Read category from block
  const category = block.textContent.trim().toLowerCase();
  console.log('Category:', category);

  // Fetch indexed products
  const response = await fetch('/query-index.json');

  if (!response.ok) {
    block.innerHTML = '<p>Unable to load products.</p>';
    return;
  }

  const json = await response.json();

  // Filter products belonging to current category
  const products = json.data.filter((item) =>
    item.template === 'Product' && item.category.toLowerCase() === category.toLowerCase()
    
  );

  console.log('Filtered products:', products);

  if (!products.length) {
    block.innerHTML = `
      <p>No products available for ${category}.</p>
    `;
    return;
  }

  const cards = products.map(renderProductTeaser).join('');

  block.innerHTML = `
    <div class="category-grid-list">
      ${cards}
    </div>
  `;
}