import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const addLoading = () => {
  const loadEl = document.createElement('div');
  loadEl.className = 'loading';
  loadEl.innerHTML = 'carregando...';
  const body = document.querySelector('body');
  body.appendChild(loadEl);
};

const removeLoading = () => {
  const loadEl = document.querySelector('.loading');
  loadEl.remove();
};

const errorRequisition = () => {
  const loadEl = document.createElement('div');
  const body = document.querySelector('body');
  body.appendChild(loadEl);
  loadEl.className = 'error';
  loadEl.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
};

const createListOfProducts = async () => {
  addLoading();
  try {
    const data = await fetchProductsList('computador');
    removeLoading();
    data.forEach((element) => {
      const { id, title, thumbnail, price } = element;
      const obj = { id, title, thumbnail, price };
      const product = createProductElement(obj);
      const productSection = document.querySelector('.products');
      productSection.appendChild(product);
      return product;
    });
  } catch {
    errorRequisition();
  }
};

createListOfProducts();

// Sugestão: Você pode criar uma função que adicione ao DOM o elemento com o texto carregando... e outra para retirá-lo, o que acha?

// O que será testado:

// Verifica se o texto de "carregando" está visível durante uma requisição à API.
// Verifica se o texto de "carregando" não está visível após a requisição à API ser concluída.
