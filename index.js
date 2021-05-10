// "use strict";
import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  imageLightbox: document.querySelector(".lightbox__image"),
  closeLightboxButton: document.querySelector(".lightbox__button"),
  overlayLightbox: document.querySelector(".lightbox__overlay"),
};

const listImages = galleryItems
  .map(
    (image, ind) => `
    <li class="gallery__item">
<a
  class="gallery__link"
  href="${image.original}"
>
  <img
    class="gallery__image"
    src="${image.preview}"
    data-source="${image.original}"
    data-ind="${ind}"
    alt="${image.description}"
  />
</a>
</li>
`
  )
  .join("");
refs.gallery.insertAdjacentHTML("beforeend", listImages);

let indexImg = 0;

refs.gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") return;
  openLightbox(event);
  indexImg = +event.target.dataset.ind;
});

refs.closeLightboxButton.addEventListener("click", closeLightbox);

refs.overlayLightbox.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeLightbox(event);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    indexImg += 1;
    if (indexImg === galleryItems.length) {
      indexImg = 0;
    }
    updateImg(
      galleryItems[indexImg].original,
      galleryItems[indexImg].description
    );
  }
  if (event.code === "ArrowLeft") {
    indexImg -= 1;
    if (indexImg === -1) {
      indexImg = galleryItems.length - 1;
    }
    updateImg(
      galleryItems[indexImg].original,
      galleryItems[indexImg].description
    );
  }
});

function closeLightbox(event) {
  refs.lightbox.classList.remove("is-open");
  updateImg(event.target.dataset.source, event.target.alt);
}

function updateImg(src = "", alt = "") {
  refs.imageLightbox.src = src;
  refs.imageLightbox.alt = alt;
}

function openLightbox(event) {
  refs.lightbox.classList.add("is-open");
  updateImg(event.target.dataset.source, event.target.alt);
}

// // "use strict";
// import images from "./gallery-items.js";

// const refs = {
//   gallery: document.querySelector(".js-gallery"),
//   image: document.createElement("img"),
//   lightbox: document.querySelector(".lightbox"),
//   btn: document.querySelector('[data-action="close-lightbox"]'),
//   modal: document.querySelector(".lightbox__content"),
//   lightbox__image: document.querySelector(".lightbox__image"),
// };

// const createGalleryItem = ({ preview, original, description }) =>
//   `<li class="gallery__item">
// <a
//   class="gallery__link"
//   href=${original}
// >
//   <img
//     class="gallery__image"
//     src=${preview}
//     data-source=${original}
//     alt=${description}
//   />
// </a>
// </li>`;
// const galleryMarkup = images.reduce(
//   (acc, item) => acc + createGalleryItem(item),
//   ""
// );
// refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
// refs.image.classList.add("gallery__image");

// refs.gallery.addEventListener("click", onGalleryClick);
// refs.btn.addEventListener("click", onClickHandlerClose);
// refs.modal.addEventListener("click", closeLightbox);

// function onGalleryClick(e) {
//   e.preventDefault();
//   if (e.target.nodeName !== "IMG") {
//     return;
//   }
//   if (e.target.nodeName === "IMG") {
//     refs.lightbox.classList.add("is-open");
//     refs.lightbox__image.src = e.target.getAttribute("data-source");
//     refs.lightbox__image.alt = e.target.alt;
//   }
//   window.addEventListener("keyup", clickKey);
// }

// function onClickHandlerClose(e) {
//   e.preventDefault();
//   refs.lightbox.classList.remove("is-open");
//   refs.lightbox__image.src = "";
//   refs.lightbox__image.alt = "";
//   window.removeEventListener("keyup", clickKey);
// }

// function closeLightbox(event) {
//   if (event.target === event.currentTarget) {
//     onClickHandlerClose();
//   }
// }

// function clickKey(event) {
//   if (event.code === "Escape") {
//     onClickHandlerClose();
//   }
// }
