const BASE_URL =  'https://pixabay.com/api/';
const API_KEY = '24711891-660ee969a9a9139e98081d9b6';

function fetchImages (searchQuery, page) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}


const API = { fetchImages };

export default API;