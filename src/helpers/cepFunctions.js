export const getAddress = async (cep) => {
  const promiseAPI1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const promiseAPI2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const promises = [promiseAPI1, promiseAPI2];
  Promise.any(promises).then((response) => response.json())
    .then((data) => {
      const rua = data.address_name;
      const bairro = data.district;
      const cidade = data.city;
      const estado = data.state;
      const addressObj = `${rua} - ${bairro} - ${cidade} - ${estado}`;
      return addressObj;
    });
  // .catch(() => {
  //   const cepEl = document.querySelector('.cart__address');
  //   cepEl.innerHTML = 'CEP não encontrado';
  // });
};

export const searchCep = () => {
  const cepInserted = document.querySelector('.cep-input').innerHTML;
  const data = getAddress(cepInserted);
  console.log(data);
  const cepSpan = document.querySelector('cart__address');
  // cepSpan.innerHTML = data;
};
