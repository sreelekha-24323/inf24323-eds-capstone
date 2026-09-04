import { getProfile }
  from '../../scripts/account.js';

export default function decorate(block) {
  const profile = getProfile();

  block.innerHTML = `
    <div class="account-overview">

      <h1>My Account</h1>

      <div class="profile-card">
        <h2>${profile.name}</h2>
        <p>${profile.email}</p>
      </div>

      <div class="account-links">
        /account/orders
          View Orders
        </a>

        /
          Continue Shopping
        </a>
      </div>

    </div>
  `;
}