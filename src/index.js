import Notiflix from 'notiflix';
import { fetchImages } from './js/api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('#gallery');
const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
let page = 1;

const loadGallery = () => {
  loader.style.display = 'block';
  const searchQuery = form.searchQuery.value;

  fetchImages(searchQuery, page)
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length === 0) {
        throw new Error('Sorry, there are no images matching your search query. Please try again.');
      } else {
        displayImages(data.hits);
      }

      if (page === Math.floor(data.totalHits / 40)) {
        loadMoreButton.style.display = 'none';
        throw new Error(`We're sorry, but you've reached the end of search results.`);
      }
    })
    .then(() => {
      loadMoreButton.style.display = 'inline-flex';
      new SimpleLightbox('#gallery .photo-card', {sourceAttr: 'data-image', overlayOpacity: 0.9});
    })
    .catch(error => {
        Notiflix.Notify.failure(error.message);
      });

    page += 1;
}

  form.addEventListener('submit',  (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    loadGallery();
  });

loadMoreButton.addEventListener('click', () => {
  loadGallery();
});

function displayImages(images) {
  images.forEach(image => {
      const card = createPhotoCard(image);
      gallery.insertAdjacentHTML('beforeend', card);
  });
}

function createPhotoCard(image) {
  return `<div class="photo-card" data-image="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${image.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${image.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${image.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${image.downloads}</span>
      </p>
    </div>
  </div>`;
}

