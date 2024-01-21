import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

import octagonIcon from './img/bi_x-octagon-2.svg';

const gallery = document.querySelector('.gallery-wrapper');
const searchButtn = document.querySelector('.search-button');
const loadButton = document.querySelector('.load-more-button');
const loader = document.querySelector('.loader-position');
const loadingLabel = document.querySelector('.loading-label');

iziToast.settings({
  timeout: 5000,
  theme: 'light',
  message:
    'Sorry, there are no images matching your search query. Please, try again!',
  messageColor: 'rgba(250, 250, 250, 1)',
  maxWidth: '392px',
  messageSize: '322px',
  position: 'topRight',
  color: '#EF4040',
  progressBar: true,
  progressBarColor: '#B51B1B',

  icon: '',
  iconText: '',
  iconColor: '',
  iconUrl: octagonIcon,
  image: '',
  imageWidth: 50,

  zindex: null,
  layout: 1,
  balloon: false,
  close: true,
  closeOnEscape: false,
  closeOnClick: true,
  displayMode: 0,
  target: '',
  targetFirst: true,

  animateInside: false,
  progressBarEasing: 'linear',
  overlayClose: true,

  transitionIn: 'fadeInUp',
  transitionOut: 'fadeOut',
  transitionInMobile: 'fadeInUp',
  transitionOutMobile: 'fadeOutDown',
  buttons: {},
  inputs: {},
  onOpening: function () {},
  onOpened: function () {},
  onClosing: function () {},
  onClosed: function () {},
});

const baseURL = 'https://pixabay.com/api/';
const apiKey = '41858556-aa96e57fcb7c92b306b25a0e4';
const axiosInstance = axios.create({
  baseURL: baseURL,
});

let totalPages = 0;
let options = {
  key: apiKey,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

const lightbox = new SimpleLightbox('.gallery-item a', {
  close: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

searchButtn.addEventListener('click', event => {
  event.preventDefault();
  options.q = document.querySelector('#input-field').value.trim();
  reloadPage();
  performSearch();
});

window.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    options.q = document.querySelector('#input-field').value.trim();
    reloadPage();
    performSearch();
    scrollByGalleryHeight();
  }
});

loadButton.addEventListener('click', event => {
  event.preventDefault();
  options.page += 1;
  performSearch();
  scrollByGalleryHeight();
});

function reloadPage() {
  gallery.innerHTML = '';
  options.page = 1;
  loadingLabel.style.display = 'none';
}

function performSearch() {
  if (options.q === '') return iziToast.show();

  const queryStr = new URLSearchParams(options).toString();
  const apiUrl = `?${queryStr}`;

  fetchImages(apiUrl)
    .then(images => renderGallery(images))
    .catch(error => console.error(error));
}

async function fetchImages(apiUrl) {
  try {
    const response = await axiosInstance.get(apiUrl);
    if (
      !totalPages ||
      response.data.totalHits !== totalPages * options.per_page
    )
      totalPages = Math.ceil(response.data.totalHits / options.per_page);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(images) {
  loader.style.display = 'none';

  if (images.totalHits === 0) {
    gallery.innerHTML = '';
    loadButtonShow();
    return iziToast.show();
  }

  const newImages = images.hits.map(image => {
    return `<li class="gallery-item"> 
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          data-src="${image.webformatURL}"
          alt="${image.tags}">
      </a>
      <div class="image-info">
        <label class="label-text">Likes
          <p>${image.likes}</p>
        </label>
        <label class="label-text">Views
          <p>${image.views}</p>
        </label>
        <label class="label-text">Comments
          <p>${image.comments}</p>
        </label>
        <label class="label-text">Downloads
          <p>${image.downloads}</p>
        </label>
      </div>
    </li>`;
  });

  gallery.insertAdjacentHTML('beforeend', newImages.join(''));
  lazyLoadImages();
  lightbox.refresh();
  loadButtonShow();
}

function loadButtonShow() {
  loadButton.style.display = document.querySelector('.gallery-item')
    ? 'flex'
    : 'none';
  if (options.page >= totalPages && totalPages !== 0) {
    loadButton.style.display = 'none';
    loadingLabel.style.display = 'flex';
    return;
  }
}

window.addEventListener('scroll', lazyLoadImages);
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.gallery-image');

  lazyImages.forEach(image => {
    if (isInViewport(image)) {
      image.src = image.dataset.src;
    }
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function scrollByGalleryHeight() {
  const galleryItem = document.querySelector('.gallery-item');

  if (galleryItem) {
    const galleryItemHeight = galleryItem.offsetHeight;
    window.scrollBy(0, galleryItemHeight * 2);
  }
}
