export default function decorate(block) {
  const images = [
    ...block.querySelectorAll('picture'),
  ];

  if (!images.length) {
    return;
  }

  const mainImage = images[0].outerHTML;

  const thumbnails = images
    .map((picture, index) => `
      <button
        class="gallery-thumb"
        type="button"
        data-index="${index}"
      >
        ${picture.outerHTML}
      </button>
    `)
    .join('');

  block.innerHTML = `
    <div class="product-gallery">

      <div class="product-gallery-main">
        ${mainImage}
      </div>

      <div class="product-gallery-thumbnails">
        ${thumbnails}
      </div>

    </div>
  `;

  const mainContainer = block.querySelector(
    '.product-gallery-main',
  );

  const thumbButtons = block.querySelectorAll(
    '.gallery-thumb',
  );

  thumbButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mainContainer.innerHTML = button.innerHTML;

      thumbButtons.forEach((thumb) =>
        thumb.classList.remove('active'));

      button.classList.add('active');
    });
  });

  thumbButtons[0]?.classList.add('active');
}