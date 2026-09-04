import {
    //   getItems,
    getTotals,
    removeItem,
    updateQty,
    getItems,
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
      <div class="cart-list">

        <div class="cart-items">

          ${items.map((item) => `
            <div class="cart-item">

              <img class="cart-item-image" src="${item.image}" alt="${item.name}">

              <div class="cart-item-details">

                <h3>
                  ${item.name}
                </h3>

                <p>
                 <strong>Price:</strong> ₹${item.price}
                </p>

                <div class="cart-item-qty">
                <div class="qty-controls">
                  <button
                    class="qty-decrease"
                    data-sku="${item.sku}"
                  >
                    -
                  </button>

                  <div class="qty-value">
                    ${item.quantity}
                  </div>

                  <button
                    class="qty-increase"
                    data-sku="${item.sku}"
                  >
                    +
                  </button>
                  </div>

                </div>

                <p>
                  Line Total:
                  ₹${item.price * item.quantity}
                </p>

               

              </div>
               <button
                  class="remove-item"
                  data-sku="${item.sku}"
                >
                  Remove
                </button>

            </div>
          `).join('')}

        </div>

        <div class="cart-right-container">
        <div class="cart-summary">

          <h3>Order Summary</h3>

          <div class="price-summary">
            <p>Subtotal</p>
            <p>₹${subtotal}</p>
          </div>
          
          <div class="price-summary">
            <p>Shipping</p>
            <p>₹99</p>
          </div>

          <div class="price-summary">
            <p>Estimated Total</p>
            <p>₹${subtotal + 99}</p>
          </div>

         
          <a href="/category/all" class="continue-shopping">
            Continue Shopping
          </a>

          <a href="/checkout" class="checkout-btn">
            Proceed To Checkout
          </a>

        </div>
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