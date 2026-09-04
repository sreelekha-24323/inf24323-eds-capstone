import {
  getItems,
  getTotal,
} from '../../scripts/cart.js';

export default async function decorate(block) {
  const items = getItems();

  const SHIPPING = 10;
  const subtotal = getTotal();
  const total = subtotal + SHIPPING;

  if (!items.length) {
    block.innerHTML = `
      <div class="checkout-empty">
        <h2>Checkout Summary</h2>
        <p>Your cart is empty.</p>
      </div>
    `;

    return;
  }

  const itemsMarkup = items.map((item) => `
    <div class="checkout-item">
      ${item.image}

      <div class="checkout-item-details">
        <h3>${item.title}</h3>

        <p>
          Quantity:
          ${item.quantity}
        </p>

        <p>
          $${item.price}
        </p>
      </div>
    </div>
  `).join('');

  block.innerHTML = `
    <div class="checkout-summary">

      <h2>Checkout Summary</h2>

      <section class="checkout-items-section">
        <h3>Order Items</h3>

        <div class="checkout-items">
          ${itemsMarkup}
        </div>
      </section>

      <section class="order-summary">

        <h3>Order Summary</h3>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>

        <div class="summary-row">
          <span>Shipping</span>
          <span>$${SHIPPING.toFixed(2)}</span>
        </div>

        <div class="summary-row total">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>

      </section>

      <section class="next-steps">
        <h3>Next Steps</h3>

        <p>
          Please review your order details before
          proceeding.
        </p>

        <button class="place-order-btn">
          Place Order
        </button>
      </section>

    </div>
  `;
}