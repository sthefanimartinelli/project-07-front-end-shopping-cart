export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  } else {
    try {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  }
};

export const fetchProductsList = async (param) => {
  if (!param) {
    throw new Error('Termo de busca não informado');
  } else {
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return error.message;
    }
  }
};
