import api from "../util/AxiosApi";

export const addProductToCart = async (quantity: number, productId: number) => {
  const res = await api.post(
    "/shop/add-to-cart/",
    {
      product_id: productId,
      quantity,
    },
    { withCredentials: true }
  );
  return Promise.resolve(res);
};

export const checkIfInCart = async (productId: number) => {
  const res = await api.post(
    "/shop/product-exists-in-cart/",
    {
      product_id: productId,
    },
    { withCredentials: true }
  );
  return Promise.resolve(res);
};
