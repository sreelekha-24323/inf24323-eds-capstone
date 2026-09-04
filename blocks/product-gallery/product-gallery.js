// export default function decorate(block) {
//   const images = [
//     ...block.querySelectorAll('picture'),
//   ];

//   if (!images.length) {
//     return;
//   }

//   const mainImage = images[0].outerHTML;


//   const thumbnails = images
//     .map((picture, index) => `
//       <button
//         class="gallery-thumb"
//         type="button"
//         data-index="${index}"
//       >
//         ${picture.outerHTML}
//       </button>
//     `)
//     .join('');

//   block.innerHTML = `
//     <div class="product-gallery">

//       <div class="product-gallery-main">
//         ${mainImage}
//       </div>

//       <div class="product-gallery-thumbnails">
//         ${thumbnails}
//       </div>

//     </div>
//   `;

//   const mainContainer = block.querySelector(
//     '.product-gallery-main',
//   );

//   const thumbButtons = block.querySelectorAll(
//     '.gallery-thumb',
//   );

//   thumbButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       mainContainer.innerHTML = button.innerHTML;

//       thumbButtons.forEach((thumb) =>
//         thumb.classList.remove('active'));

//       button.classList.add('active');
//     });
//   });

//   thumbButtons[0]?.classList.add('active');
// }


export default function decorate(block) {
    const pictures = [...block.querySelectorAll('picture')];

    if (!pictures.length) return;

    // const mainImage = pictures[0].outerHTML;
    // const mainImage=document.querySelector('#pdp-main-image')?.outerHTML;

    const thumbnails = pictures.map((picture, index) => `
    <button
      class="gallery-thumb ${index === 0 ? 'active' : ''}"
      type="button"
    >
      ${picture.outerHTML}
    </button>
  `).join('');

    block.innerHTML = `
    <div class="product-gallery-wrapper">


      <div class="product-gallery-thumbnails">
        ${thumbnails}
      </div>

    </div>
  `;

    const mainContainer = block.querySelector(
        '.product-gallery-main',
    );

    const thumbs = block.querySelectorAll(
        '.gallery-thumb',
    );

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            // mainContainer.innerHTML = thumb.innerHTML;

            const mainImageContainer = document.querySelector('#pdp-main-image');
            //   if (mainImageContainer && thumb) {
            //     mainImageContainer.innerHTML = `${thumb.outerHTML}`;
            // }

            const thumbImg = thumb.querySelector('img');
            const mainImg = document.querySelector('.product-details-image');
            console.log('Thumbnail Image:', thumbImg);
            console.log('Main Image Container:', mainImg);
          

            
            mainImg.src = thumbImg.src;
            
            mainImg.alt = thumbImg.alt;
            thumbs.forEach((item) =>
                item.classList.remove('active'));

            thumb.classList.add('active');
        });
    });
}