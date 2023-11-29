import axios from 'axios';
const apiKey = '40964959-9b8e37b1c4ecb1b6328657c19';

export function fetchImages(searchQuery, page) {
  const params = {
    key: apiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page ? page : 1,
    min_width: 420,
    min_height: 320
  };

  return axios.get(`https://pixabay.com/api/`, { params: params })
    .then(response => {
        return response.data;
      });
}