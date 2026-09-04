import { getTotals } from '../../scripts/cart.js';

export default function decorate(block) {
  const renderCart = () => {
    const { totalItems, subtotal } = getTotals();

    block.innerHTML = `

        <span class="mini-cart-icon">
          🛒
        </span>

        <span class="mini-cart-count">
          ${totalItems}
        </span>

        <span class="mini-cart-total">
          ₹${subtotal}
        </span>

      </a>
    `;
  };

  renderCart();

  window.addEventListener('storage', renderCart);
}