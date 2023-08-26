import axios from 'axios';

const url = `https://api.thecatapi.com/v1/`;
const url_breeds = `breeds`;
const api_key =
  'live_6ForYhT3l0hYtlVzmg2QgnlWfCYYmgek7L1LzO7ZlIMqtZO82Dk848tMCrHiRzsY';

axios.defaults.headers.common['x-api-key'] = api_key;

function fetchBreeds() {
  return fetch(`${url}${url_breeds}`, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    return response.json();
  });
}

function showSelectedBreed(breedId) {
  console.log(`${url}images/search?breed_ids=${breedId}`);
  return fetch(`${url}images/search?breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => data);
}

function getInfoAboutCat(breedId) {
  // ${catData.breeds[0].id}
  return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => data);
}

export { fetchBreeds, showSelectedBreed, getInfoAboutCat };
