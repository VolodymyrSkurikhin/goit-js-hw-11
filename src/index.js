import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY ='26793490-dae10d4013ec617276bbdd3a4';
// let search;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
const refForm = document.querySelector(".search-form");
const refGallery = document.querySelector(".gallery");
async function getImage(search){
    // console.dir(event.currentTarget);
  console.log(search);
    const { data:{hits} } = await axios.get(`&q=${search}`);
    if (hits.length === 0) { throw new Error() };
    return hits
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
    refGallery.insertAdjacentHTML('beforeend',markup)};

      


