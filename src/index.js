import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

let KEY ='26793490-dae10d4013ec617276bbdd3a4';
let search;
axios.defaults.baseURL = 'https://pixabay.com/api/?key=${KEY}&image_type="photo"&orientation="horizontal"&safesearch="true"';


