export default function decorate(block) {
  const rows = [...block.children];

  const specs = rows.map((row) => {
    const cols = [...row.children];

    return {
      label: cols[0]?.textContent.trim() || '',
      value: cols[1]?.textContent.trim() || '',
    };
  });

  block.innerHTML = `
    <div class="product-specs-list">

      <h2 class="product-specs-heading">
        Specifications
      </h2>

      <table class="product-specs-table">
        <tbody>
          ${specs.map((spec) => `
            <tr>
              <th>${spec.label}</th>
              <td>${spec.value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

    </div>
  `;
}