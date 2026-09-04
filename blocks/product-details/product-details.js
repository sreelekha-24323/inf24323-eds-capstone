
import { addItem } from '../../scripts/cart.js';

export default async function decorate(block) {
  const sku = block.textContent.trim();

  const response = await fetch('/query-index.json');

  if (!response.ok) {
    block.innerHTML = '<p>Unable to load product details.</p>';
    return;
  }

  const json = await response.json();

  const product = json.data.filter(item=>item.template==='Product').find(
    (item) => item.sku === sku,
  );

  if (!product) {
    block.innerHTML = '<p>Product not found.</p>';
    return;
  }

  block.innerHTML = `
    <div class="product-details-card">

      <img id="pdp-main-image" class="product-details-image" src="${product.image}" alt="${product.title}"/>
      

      <div class="product-details-content">

        <h1 class="product-title">
          ${product.title}
        </h1>

        <div class="product-price">
          ₹${product.price}
        </div>

        <p class="product-description">
          ${product.description || ''}
        </p>

        <div class="product-stock">
          In Stock
        </div>

        

        <button class="add-to-cart-btn">
          Add To Cart
        </button>

      </div>

    </div>
  `;

  document
  .querySelector('.add-to-cart-btn')
  .addEventListener('click', () => {

    addItem({...product,name:product.title});
    window.renderMiniCart?.();

  });
}