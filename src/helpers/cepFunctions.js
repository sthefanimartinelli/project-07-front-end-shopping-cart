export const getAddress = async (cep) => {
  const promiseAPI1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const promiseAPI2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const promises = [promiseAPI1, promiseAPI2];
  const addr = await Promise.any(promises)
    .then((response) => response.json())
    .then((data) => {
      const rua = data.address;
      const bairro = data.district;
      const cidade = data.city;
      const estado = data.state;
      if (rua && bairro && cidade && estado) {
        const addressObj = `${rua} - ${bairro} - ${cidade} - ${estado}`;
        return addressObj;
      }
      return 'CEP não encontrado';
    }).catch((e) => {
      console.log(e);
      return 'CEP não encontrado';
    });
  return addr;
};

export const searchCep = async () => {
  const cepInserted = document.querySelector('.cep-input').value;
  const data = await getAddress(cepInserted);
  const cepSpan = document.querySelector('.cart__address');
  cepSpan.innerText = data;
};
