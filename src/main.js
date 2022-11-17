import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const createListOfProducts = async () => {
  const data = await fetchProductsList('computador');
  data.forEach((element) => {
    const { id, title, thumbnail, price } = element;
    const obj = { id, title, thumbnail, price };
    const product = createProductElement(obj);
    const productSection = document.querySelector('.products');
    productSection.appendChild(product);
    return product;
  });
};

createListOfProducts();
