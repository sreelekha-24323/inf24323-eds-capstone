export function renderProductTeaser(product) {
  return `
    <div class="product-teaser-card">
      ${product.path}
        <div class="product-teaser-image">
          ${product.image}
        </div>

        <div class="product-teaser-content">
          <h3>${product.title}</h3>
          <p class="price">${product.price}</p>
          <p>${product.description}</p>
        </div>
      </a>
    </div>
  `;
}