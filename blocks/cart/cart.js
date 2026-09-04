import {
  getItems,
  getTotals,
  removeItem,
  updateQty,
} from '../../scripts/cart.js';

export default function decorate(block) {
  function render() {
    const items = getItems();

    const { subtotal } = getTotals();

    if (!items.length) {
      block.innerHTML = `
        <p>Your cart is empty.</p>
      `;
      return;
    }

    block.innerHTML = `
      <div class="cart-wrapper">

        <div class="cart-items">

          ${items.map((item) => `
            <div class="cart-item">

              <div class="cart-item-image">
                ${item.image}
              </div>

              <div class="cart-item-details">

                <h3>
                  ${item.name}
                </h3>

                <p>
                  ₹${item.price}
                </p>

                <div class="cart-item-qty">

                  <button
                    class="qty-decrease"
                    data-sku="${item.sku}"
                  >
                    -
                  </button>

                  <span>
                    ${item.quantity}
                  </span>

                  <button
                    class="qty-increase"
                    data-sku="${item.sku}"
                  >
                    +
                  </button>

                </div>

                <p>
                  Line Total:
                  ₹${item.price * item.quantity}
                </p>

                <button
                  class="remove-item"
                  data-sku="${item.sku}"
                >
                  Remove
                </button>

              </div>

            </div>
          `).join('')}

        </div>

        <div class="cart-summary">

          <h3>Order Summary</h3>

          <p>
            Subtotal:
            ₹${subtotal}
          </p>

          <p>
            Estimated Shipping:
            ₹99
          </p>

          <p>
            Estimated Total:
            ₹${subtotal + 99}
          </p>

          <a href="/category/all" class="continue-shopping">
            Continue Shopping
          </a>

          <a href="/checkout" class="checkout-btn">
            Proceed To Checkout
          </a>

        </div>

      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    block.querySelectorAll('.remove-item')
      .forEach((button) => {
        button.addEventListener('click', () => {
          removeItem(button.dataset.sku);
          render();
        });
      });

    block.querySelectorAll('.qty-increase')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const sku = button.dataset.sku;

          const item = getItems().find(
            (i) => i.sku === sku,
          );

          updateQty(
            sku,
            item.quantity + 1,
          );

          render();
        });
      });

    block.querySelectorAll('.qty-decrease')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const sku = button.dataset.sku;

          const item = getItems().find(
            (i) => i.sku === sku,
          );

          updateQty(
            sku,
            item.quantity - 1,
          );

          render();
        });
      });
  }

  render();
}