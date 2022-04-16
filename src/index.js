import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY ='26793490-dae10d4013ec617276bbdd3a4';
// let search;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
const refForm = document.querySelector(".search-form");
async function getImage(search) {
  const { data:{hits} } = await axios.get(`&q=${search}`);
  if (hits.length === 0) { throw new Error() };
  return hits;
};
getImage('kdkdjdg')
  .then(result => console.log(result.length))
  .catch(() => Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."'));

