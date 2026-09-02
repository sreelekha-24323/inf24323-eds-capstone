export default async function decorate(block) {
    const jsonUrl = block.querySelector('a')?.href
        || block.textContent.trim();

    const response = await fetch(`eds-ecommerce/data${jsonUrl}`);
    const json = await response.json();

    const type=jsonUrl.includes('categories') ? 'categories' : 'products';

    const cards = json.data.map((item) => `
  <li class="promo-card">
      <img class="promo-card-image" src="${item.image}" alt="${item.category}">

      <div class="promo-card-content">
        <h3>${item.category || item.brand}</h3>

        ${type==="products" ? `<p>${item.title}</p>` : ''}
        ${type==="products" ? `<p>&dollar;${item.price}</p>` : ''}
        ${type==="products" ? `<button class="promo-card-cta">Add to Cart</button>` : ''}
      </div>
    </li>
  `).join('');

    block.innerHTML = `
    <ul class="promo-grid-list">
      ${cards}
    </ul>
  `;
}