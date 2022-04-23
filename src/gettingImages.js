import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '26793490-dae10d4013ec617276bbdd3a4';
const perPage = 40;
axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

export async function getImage(firstGet, currentPage) {
  console.log(firstGet);
  const { data } = await axios.get(`&q=${firstGet}&per_page=${perPage}&page=${currentPage}`);

  console.log(data.hits);
  return data;
}
