import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import { getImage, perPage } from './gettingImages';
import { renderCards, cleanupCards } from './renderSL';

let currentPage;
let search;

function isLastPage(totalEntries, page) {
  return page * perPage >= totalEntries;
}

const refForm = document.querySelector('.search-form');
const refBtn = document.querySelector('.load-more');

refBtn.style.display = 'none';
console.dir(refBtn);

refForm.addEventListener('submit', async event => {
  // initial cleanup
  refBtn.style.display = 'none';
  currentPage = 1;
  cleanupCards();

  search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault();
  try {
    const cards = await getImage(search, currentPage);
    if (cards.hits.length === 0) {
      Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
    renderCards(cards.hits);
    if (isLastPage(cards.totalHits, currentPage)) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      return;
    } else {
      refBtn.style.display = '';
    }
  } catch {
    Notiflix.Notify.failure('"Sorry"');
  }
});

refBtn.addEventListener('click', async event => {
  event.preventDefault();
  try {
    currentPage += 1;
    const cards = await getImage(search, currentPage);
    console.log(cards);

    if (isLastPage(cards.totalHits, currentPage)) {
      renderCards(cards.hits);
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      refBtn.style.display = 'none';
      return;
    }
    renderCards(cards.hits);
  } catch {
    Notiflix.Notify.failure('"Sorry, Please try again."');
  }
});
