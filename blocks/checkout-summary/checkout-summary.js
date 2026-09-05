import {
    getItems,
    getTotals,
} from '../../scripts/cart.js';

export default async function decorate(block) {

  const params = new URLSearchParams(window.location.search);
  const isConfirmed = params.get('status') === 'confirmed';

  if (isConfirmed) {
    const order = JSON.parse(sessionStorage.getItem('latestOrder')) || {};

    block.innerHTML = `
      <div class="order-confirmation">
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <p>
          <strong>Order ID:</strong>
          ${order?.id || 'N/A'}
        </p>
        <p>
          <strong>Order Total:</strong>
          ₹${order?.total.subtotal || '0'}
        </p>
        <div class="confirmation-actions">
          <a href="/eds-ecommerce/pages/category/all" class="continue-shopping-btn">
            Continue Shopping
          </a>
          <a href="/eds-ecommerce/pages/account" class="account-btn">
            My Account
          </a>
        </div>
      </div>
    `;

    return;
  }

  const items = getItems();
  const SHIPPING = 10;
  const { subtotal } = getTotals();
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
      <img src="${item.image}" alt="${item.title}">
      <div class="checkout-item-details">
        <h3>${item.name}</h3>
        <p>
          <strong>Price:</strong> ₹${item.price}
        </p>
        <p>
          Quantity:
          ${item.quantity}
        </p>
      </div>
    </div>
  `).join('');

  block.innerHTML = `
    <div class="checkout-summary-details">
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
          <span>₹${subtotal}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>₹${SHIPPING}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₹${total}</span>
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

  const placeOrderBtn = document.querySelector('.place-order-btn');

  placeOrderBtn?.addEventListener('click', () => {
    const order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: 'Confirmed',
      items: getItems(),
      total: getTotals(),
    };

    // save order history
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // save latest order for thank you page
    sessionStorage.setItem('latestOrder', JSON.stringify(order));
    localStorage.removeItem('eds-cart');
    window.renderMiniCart?.();
    window.location.href = '/eds-ecommerce/pages/checkout?status=confirmed';
  });
}