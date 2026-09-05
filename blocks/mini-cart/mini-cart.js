
// export default function decorate(block) {
//   const renderCart = () => {
//     const { totalItems, subtotal } = getTotals();

//     block.innerHTML = `

//         <span class="mini-cart-icon">
//           🛒
//         </span>

//         <span class="mini-cart-count">
//           ${totalItems}
//         </span>

//       </a>
//     `;
//   };

//   renderCart();

//   window.addEventListener('storage', renderCart);
// }
// import { getItems,getTotals } from '../../scripts/cart.js';


// export default async function decorate(block) {
//   block.innerHTML = `
//     <div class="cart-wrapper">
//       <button class="cart-icon-btn" aria-label="Cart">
//         🛒
//         <span class="cart-count">0</span>
//       </button>

//       <div class="mini-cart-drawer">
//         <div class="mini-cart-header">
//           <h3>Shopping Cart</h3>
//         </div>

//         <div class="mini-cart-items"></div>

//         <div class="mini-cart-footer">
//           <div class="mini-cart-total">
//             <span>Total</span>
//             <span class="total-value">$0.00</span>
//           </div>

//           <a href="/cart" class="view-cart-btn">
//             View Cart
//           </a>
//         </div>
//       </div>
//     </div>
//   `;

//   const countElement = block.querySelector('.cart-count');
//   const itemsContainer = block.querySelector('.mini-cart-items');
//   const totalElement = block.querySelector('.total-value');

//   function renderCart() {
//     const count = getItems().length;
//     const { subtotal } = getTotals();
   

//     countElement.textContent = count;
//     totalElement.textContent = `$${subtotal.toFixed(2)}`;

//     if (!getItems().length) {
//       itemsContainer.innerHTML = `
//         <p class="empty-cart">
//           Your cart is empty
//         </p>
//       `;

//       totalElement.textContent = '0';
//       return;
//     }

//     let total = 0;

//     itemsContainer.innerHTML = cart.map((item) => {
//       const quantity = item.quantity || 1;
//       const price = Number(item.price || 0);

//       total += price * quantity;

//       return `
//         <div class="mini-cart-item">
//           ${item.image}

//           <div class="mini-cart-details">
//             <h4>${item.title}</h4>

//             <div class="mini-cart-price">
//               $${price.toFixed(2)}
//             </div>

//             <div class="mini-cart-qty">
//               Qty: ${quantity}
//             </div>
//           </div>
//         </div>
//       `;
//     }).join('');

//     totalElement.textContent = `$${total.toFixed(2)}`;
//   }

//   renderCart();

//   window.renderMiniCart = renderCart;

//   window.addEventListener('storage', renderCart);
// }

import { getItems, getTotals } from '../../scripts/cart.js';

export default async function decorate(block) {
  block.innerHTML = `
    <div class="mini-cart-wrapper">
      <button class="cart-icon-btn" aria-label="Cart">
        🛒
        <span class="cart-count">0</span>
      </button>

      <div class="mini-cart-overlay"></div>

      <aside class="mini-cart-drawer">
        <div class="mini-cart-header">
          <h3>Shopping Cart</h3>
          <button class="mini-cart-close">&times;</button>
        </div>

        <div class="mini-cart-items"></div>

        <div class="mini-cart-footer">
          <div class="mini-cart-total">
            <span>Total: </span>
            <span class="total-value"></span>
          </div>

          <a href="/eds-ecommerce/pages/cart" class="view-cart-btn">
            View Cart
          </a>
        </div>
      </aside>
    </div>
  `;

  const cartCount = block.querySelector('.cart-count');
  const itemsContainer = block.querySelector('.mini-cart-items');
  const totalElement = block.querySelector('.total-value');

  const drawer = block.querySelector('.mini-cart-drawer');
  const overlay = block.querySelector('.mini-cart-overlay');

  function renderCart() {

    const viewCartBtn = block.querySelector('.view-cart-btn');

    const items = getItems();

    const count = items.length;

    cartCount.textContent = count;

    if (!items.length) {
      itemsContainer.innerHTML = `
        <p class="empty-cart">Your cart is empty</p>
      `;

      totalElement.textContent = '0';
      viewCartBtn.style.display = 'none';
      return;
    }
    viewCartBtn.style.display = 'block';

    itemsContainer.innerHTML = items.map((item) => `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="mini-cart-details">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <span>Qty: ${item.quantity}</span>
        </div>
      </div>
    `).join('');

    const { subtotal } = getTotals();

    totalElement.textContent =  ` ₹${subtotal}`;
  }

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  block
    .querySelector('.cart-icon-btn')
    .addEventListener('click', openDrawer);

  block
    .querySelector('.mini-cart-close')
    .addEventListener('click', closeDrawer);

  overlay.addEventListener('click', closeDrawer);

  renderCart();

  window.renderMiniCart = renderCart;
}