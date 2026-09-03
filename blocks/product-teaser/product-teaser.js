export function renderProductTeaser(product) {
  return `
    <div class="product-teaser-card">
        <img src="${product.image}" alt="${product.title}" class="product-teaser-image">
        </img>

        <div class="product-teaser-content">
          <h3>${product.title}</h3>
          <p class="price">${product.price}</p>
          <p>${product.description}</p>
        </div>
      </a>
    </div>
  `;
}