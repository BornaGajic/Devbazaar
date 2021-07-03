import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:44356/';
axios.defaults.responseType = 'json';
axios.defaults.headers = {'Content-Type': 'application/json'}