import { getOrders }
  from '../../scripts/account.js';

export default function decorate(block) {
  const orders = getOrders();

  if (!orders.length) {
    block.innerHTML = `
      <h1>My Orders</h1>
      <p>No orders found.</p>
    `;
    return;
  }

  block.innerHTML = `
    <h1>My Orders</h1>

    <table class="orders-table">

      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Items</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        ${orders.map((order) => `
          <tr>
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td>${order.items.length}</td>
            <td>₹${order.total.subtotal}</td>
          </tr>
        `).join('')}
      </tbody>

    </table>
  `;
}