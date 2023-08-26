import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, showSelectedBreed, getInfoAboutCat } from './cat-api';

import 'slim-select/dist/slimselect.css';

const selectEl = document.getElementById('single');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

selectEl.addEventListener('change', selectedBreed);

let storedBreeds = [];

getBreeds();

function getBreeds() {
  loader.classList.remove('hidden');
  errorEl.classList.add('hidden');
  fetchBreeds()
    .then(dataBreeds => {
      selectEl.innerHTML = createBreeds(dataBreeds);
      storedBreeds = dataBreeds;
      new SlimSelect({
        select: selectEl,
      });
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
      errorEl.classList.remove('hidden');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

function createBreeds(arr) {
  return arr
    .map(({ name, id }) => ` <option value="${id}">${name}</option>`)
    .join('');
}

function createCatInfo(elCat) {
  return `
  <img src="${elCat.image.url}" alt="${elCat.name}" width="300" height="300">
  <div class="info-cat">
  <h1>${elCat.name}</h1>
    <p>${elCat.description}</p>
    <p><span class="temper-span">Temperament: </span>${elCat.temperament}</p></div>`;
}

function selectedBreed() {
  divCatInfo.innerHTML = '';
  const selectedValue = selectEl.value;
  loader.classList.remove('hidden');
  errorEl.classList.add('hidden');

  const ourCat = storedBreeds.find(cat => cat.id === selectedValue);
  if (ourCat !== undefined) {
    try {
      divCatInfo.innerHTML = createCatInfo(ourCat);
    } catch (error) {
      Notiflix.Notify.failure(error);
      errorEl.classList.remove('hidden');
    }
  }

  loader.classList.add('hidden');

  // showSelectedBreed(selectedValue)
  //   .then((cat) => {
  //     console.dir(cat[0]);
  //     return cat[0].id;
  //   })
  //   .then((catId) => {
  //     console.log(catId);
  //        console.dir(storedBreeds);
  //     const ourCat = storedBreeds.find((cat) => cat.image.id === catId);

  //     divCatInfo.innerHTML = createCatInfo(ourCat);
  //       console.dir(ourCat);

  //   }
  //   )

  //  .catch((err) => console.log(err));
}
