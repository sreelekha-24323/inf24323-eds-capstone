// import "./product-teaser.css";

import { loadCSS } from '../../scripts/aem.js';
let stylesLoaded;
 
function ensureStyles() {
  if (!stylesLoaded) stylesLoaded = loadCSS(`${window.hlx.codeBasePath}/blocks/product-teaser/product-teaser.css`);
  return stylesLoaded;
}

ensureStyles();

export function renderProductTeaser(product) {
  return `
    <div class="product-teaser-card">
        <img src="${product.image}" alt="${product.title}" class="product-teaser-image">
        </img>

        <div class="product-teaser-content">
          <h3 class="product-teaser-title">${product.title}</h3>
          <p class="product-teaser-price">MRP: ₹${product.price}</p>
          <p class="product-teaser-description">${product.description}</p>
          <a href="${product.path}" class="product-teaser-button">View Product</a>
        </div>
      </a>
    </div>
  `;
}