import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

export function cleanupCards() {
  refGallery.innerHTML = '';
}

const refGallery = document.querySelector('.gallery');
export function renderCards(images) {
  const markup = images
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads, previewURL }) =>
        `<div class="photo-card">
            <a class="gallery__item" href="${webformatURL}">
              <img  class="gallery__image"
                src="${previewURL}"
                alt="${tags},
                ${likes} Likes
                ${views} Views
                ${comments} Comments
                ${downloads} Downloads"/>
               </a> 
          <div class="info">
            <p class="info-item">
              <b>${likes}<br>Likes</b>
            </p>
            <p class="info-item">
              <b>${views}<br>Views</b>
            </p>
            <p class="info-item">
              <b>${comments}<br>Comments</b>
            </p>
            <p class="info-item">
              <b>${downloads}<br>Downloads</b>
            </p>
          </div>
        </div>`,
    )
    .join('');
  refGallery.insertAdjacentHTML('beforeend', markup);

  galleryS.refresh();
}
let galleryS = new SimpleLightbox('.gallery a', {
  overlay: true,
  nav: true,
  navText: ['←', '→'],
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  close: true,
  closeText: '×',
  docClose: true,
});
