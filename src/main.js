import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
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
      const btn = product.querySelector('.product__add');
      btn.addEventListener('click', async () => {
        saveCartID(id);
        const details = await fetchProduct(id);
        // const obj = { title: details.title, id: details.id, pictures: details.pictures, price: details.price };
        const objCarrinho = createCartProductElement(details);
        const carrinho = document.querySelector('.cart__products');
        carrinho.appendChild(objCarrinho);
      });
      const productSection = document.querySelector('.products');
      productSection.appendChild(product);
      return product;
    });
  } catch {
    errorRequisition();
  }
};

createListOfProducts();
