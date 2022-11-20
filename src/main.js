import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
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

const setCartPrice = () => {
  const subtotal = document.querySelector('.total-price');
  const cartProducts = document
    .querySelectorAll('.cart__products .product__price__value');
  let counter = 0;
  cartProducts.forEach((product) => {
    counter += parseFloat(product.innerHTML);
  });
  subtotal.innerHTML = counter.toString();
};

const loadCartProducts = async () => {
  const savedCart = getSavedCartIDs();

  Promise.all(savedCart.map((item) => fetchProduct(item)))
    .then((details) => {
      details.forEach((detail) => {
        const obj = createCartProductElement(detail);
        const carrinho = document.querySelector('.cart__products');
        carrinho.appendChild(obj);
      });
      setCartPrice();
    });
};

window.onload = async () => {
  loadCartProducts();
};

const addToCart = (id) => async () => {
  saveCartID(id);
  const details = await fetchProduct(id);
  // const obj = { title: details.title, id: details.id, pictures: details.pictures, price: details.price }; // assim também funcionaria
  const objCarrinho = createCartProductElement(details);
  const carrinho = document.querySelector('.cart__products');
  // const product = carrinho.querySelector('.cart__product');
  // removeBtn.addEventListener('click', removeFromCart(id));
  carrinho.appendChild(objCarrinho);
  setCartPrice();
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
      const addBtn = product.querySelector('.product__add');
      addBtn.addEventListener('click', addToCart(id));
      const productSection = document.querySelector('.products');
      productSection.appendChild(product);
      return product;
    });
  } catch {
    errorRequisition();
  }
};

createListOfProducts();
