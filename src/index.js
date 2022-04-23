import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY = '26793490-dae10d4013ec617276bbdd3a4';
let currentPage = 1;
const perPage = 40;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
let search='';

const refForm = document.querySelector(".search-form");
const refGallery = document.querySelector(".gallery");
const refBtn = document.querySelector(".load-more");

refBtn.style.display = "none";
console.dir(refBtn);

async function getImage(firstGet,currentPage){
    // console.dir(event.currentTarget);
  console.log(firstGet);
  // currentPage = 1;
  
  try {
    const { data } = await axios.get(`&q=${firstGet}&per_page=${perPage}&page=${currentPage}`);
    if (data.hits.length === 0) throw new Error();
    // if (data.totalHits > 40) {
    //   refBtn.style.display = "";
    //   // currentPage += 1;
    // } else if (data.totalHits < 40) {
    //   refBtn.style.display = "none";
    //   currentPage = 1;
    //   Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    // };
    return data;
  }catch{Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."')};
};
refForm.addEventListener('submit', async (event) => {
  // initial cleanup
  currentPage = 1;
  refGallery.innerHTML = '';
  
  search = event.currentTarget.elements.searchQuery.value;
  event.preventDefault(); 
  try {
    const cards = await getImage(search,currentPage);
    renderCards(cards.hits);
    let totalPages = cards.totalHits;
    console.log(totalPages);
    if (totalPages <= perPage) {
      // refBtn.style.display = "none";
      // currentPage = 1;
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
      return;
    } else if (totalPages > perPage) {
      totalPages -= perPage;
       refBtn.style.display = "";
        refBtn.addEventListener('click', async (event) => {
          event.preventDefault();
          try {
            currentPage += 1;
            const newCards = await getImage(search,currentPage);
            console.log(newCards);
            
            if (totalPages <= perPage) {
              renderCards(newCards.hits);
              Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
              refBtn.style.display = "none";
              currentPage = 1;
              return;
            }
            renderCards(newCards.hits);
            totalPages -= perPage;
            
          } catch { Notiflix.Notify.failure('"Sorry, Please try again."') }
        })
    }
  } catch { Notiflix.Notify.failure('"Sorry"') };
    }
);
  function renderCards (images) {
    const markup = images.map(({ webformatURL, tags, likes, views, comments, downloads }) =>
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

      


