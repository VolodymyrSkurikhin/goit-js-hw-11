import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY ='26793490-dae10d4013ec617276bbdd3a4';
// let search;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
const refForm = document.querySelector(".search-form");
const refGallery = document.querySelector(".gallery");
async function getImage(event){
    event.preventDefault();
    console.dir(event.currentTarget);
    const search=event.currentTarget.elements.searchQuery.value;
    const { data:{hits} } = await axios.get(`&q=${search}`);
    if (hits.length === 0) { throw new Error() };
    return hits
    .then(renderCards)
    .catch(() => Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."'));
};
refForm.addEventListener('click',getImage);
  

  function renderCards (cards) {
    refGallery.innerHTML='';
    const markup = cards.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => 
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
    </div>`).join()
    refGallery.insertAdjacentElement('beforeend',markup)};

      


