import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY = '26793490-dae10d4013ec617276bbdd3a4';
let currentPage = 1;
// let search;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
const refForm = document.querySelector(".search-form");
const refGallery = document.querySelector(".gallery");
const refBtn = document.querySelector(".load-more");
refBtn.style.display = "none";
console.dir(refBtn);

async function getImage(search){
    // console.dir(event.currentTarget);
  console.log(search);
  const { data } = await axios.get(`&q=${search}`);
  if (data.hits.length === 0) throw new Error() ;
  if (data.totalHits > 40) {
    refBtn.style.display = ""; currentPage += 1;
  };
    return data.hits
};
refForm.addEventListener('click', async (event) => {
  const search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault(); 
  try {
    const cards = await getImage(search);
    console.log(cards);
    renderCards(cards);
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
  const search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault(); 
  refBtn.style.display = "none";
  // currentPage += 1;
  try {
    const cards = await getMoreImage(search);
    console.log(cards);
    renderCards(cards);
    if ()
  } catch {Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."')}
});

async function getMoreImage(search){
    // console.dir(event.currentTarget);
  console.log(search);
  const { data } = await axios.get(`&q=${search}`);
  if (data.hits.length === 0) throw new Error() ;
  if (data.totalHits > 40) {
    refBtn.style.display = ""; currentPage += 1;
  };
    return data.hits
};

      


