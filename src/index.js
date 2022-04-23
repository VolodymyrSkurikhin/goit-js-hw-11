import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import { getImage, perPage } from './gettingImages';
import { renderCards, cleanupCards } from './rendering';
// import {perPage} from './gettingImages';

// let KEY = '26793490-dae10d4013ec617276bbdd3a4';
let currentPage;
// const perPage = 40;
// axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
let search;
let totalPages;

function isLastPage(totalEntries, page) {
  return page * perPage >= totalEntries;
}

const refForm = document.querySelector('.search-form');
const refBtn = document.querySelector('.load-more');

refBtn.style.display = 'none';
console.dir(refBtn);

// async function getImage(firstGet,currentPage){
//   console.log(firstGet);
//   try {
//     const { data } = await axios.get(`&q=${firstGet}&per_page=${perPage}&page=${currentPage}`);
//     if (data.hits.length === 0) throw new Error();
//     return data;
//   }catch{Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."')};
// };

refForm.addEventListener('submit', async event => {
  // initial cleanup
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
    renderCards(cards.hits);
    // totalPages = cards.totalHits;
    // console.log(totalPages, perPage);

    if (isLastPage(cards.totalHits, currentPage)) {
      // refBtn.style.display = "none";
      // currentPage = 1;
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      return;
    } else {
      // totalPages -= perPage;
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
      // currentPage = 1;
      return;
    }
    renderCards(cards.hits);
    // totalPages -= perPage;
  } catch {
    Notiflix.Notify.failure('"Sorry, Please try again."');
  }
});
