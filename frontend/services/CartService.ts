import api from "../util/AxiosApi";


export const addProductToCart = async (quantity: number, productId: number) => {
  return new Promise((resolve) => {
    api
      .post(
        "/shop/add-to-cart/",
        {
          product_id: productId,
          quantity,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
  });
};

export const checkIfInCart = async (productId: number) => {
  return new Promise((resolve) => {
    api
      .post(
        "/shop/product-exists-in-cart/",
        {
          product_id: productId,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
  });
};
