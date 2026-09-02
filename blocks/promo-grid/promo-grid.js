export default async function decorate(block) {
  const jsonUrl = block.querySelector('a')?.href
    || block.textContent.trim();

  const response = await fetch(jsonUrl);
  const json = await response.json();

  const cards = json.data.map((category) => `
    <a href="${category.path}">
      <div class="promo-card-image">
        ${category.image}
      </div>

      <div class="promo-card-content">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </div>
    </a>
  `).join('');

  block.innerHTML = `
    <div class="promo-grid-container">
      ${cards}
    </div>
  `;
}