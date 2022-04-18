import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY = '26793490-dae10d4013ec617276bbdd3a4';
let currentPage=1;
let search;

const refForm = document.querySelector(".search-form");
const refGallery = document.querySelector(".gallery");
const refBtn = document.querySelector(".load-more");
refBtn.style.display = "none";
console.dir(refBtn);

async function getImage(firstSearch){
    // console.dir(event.currentTarget);
  console.log(firstSearch);
  // currentPage = 1;
  axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  const { data } = await axios.get(`&q=${firstSearch}`);
  if (data.hits.length === 0) throw new Error() ;
  if (data.totalHits > 40) {
    refBtn.style.display = "";
    // currentPage += 1;
  } else if (data.totalHits < 40) {
    refBtn.style.display = "none";
    currentPage = 1;
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
  };
  return data.hits;
};
refForm.addEventListener('submit', async (event) => {
  const search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault(); 
  try {
    const cards = await getImage(search);
    console.log(cards);
    renderCards(cards);
    return search;
  } catch {Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."')}
});

  function renderCards (cards) {
    refGallery.innerHTML='';
    const markup = cards.map(({ webformatURL, tags, likes, views, comments, downloads }) =>
      `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}Likes</b>
      </p>
      <p class="info-item">
        <b>${views}Views</b>
      </p>
      <p class="info-item">
        <b>${comments}Comments</b>
      </p>
      <p class="info-item">
        <b>${downloads}Downloads</b>
      </p>
    </div>
    </div>`).join();
  refGallery.insertAdjacentHTML('beforeend', markup)
};
    
refBtn.addEventListener('click', async (event) => {
  // const search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault(); 
  refBtn.style.display = "none";
  
  try {
    const cards = await getMoreImage(search);
    console.log(cards);
    renderCards(cards);
    
  } catch {Notiflix.Notify.failure('"Sorry, Please try again."')}
});

async function getMoreImage(nextSearch){
    // console.dir(event.currentTarget);
  console.log(nextSearch);
  currentPage +=1;
  axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  const { data } = await axios.get(`&q=${nextSearch}&page=${currentPage}`);
  if (data.hits.length === 0) throw new Error() ;
  if (data.totalHits > 40) {
    refBtn.style.display = ""; 
  } else if (data.totalHits < 40) {
    currentPage = 1;
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
    return data.hits
};

      


