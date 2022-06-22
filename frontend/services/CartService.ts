import { CartItem } from "../types/shop";
import api from "../util/AxiosApi";

export const addProductToCart = async (quantity: number, productId: number) => {
  const res = await api.post(
    "/shop/add-to-cart/",
    {
      product_id: productId,
      quantity: quantity,
    },
    { withCredentials: true }
  );
  return Promise.resolve(res);
};

export const deleteItemsFromCart = async (productIds: number[]) => {
  const res = await api.post(
    "/shop/delete-cart-items/",
    {
      product_ids: productIds,
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

export const getCartItems = async (): Promise<CartItem[][] | null> => {
  const res = await api.get("/shop/get-products-from-cart/", {
    withCredentials: true,
  });
  if (res) return Promise.resolve(res.data.cart_items);
  else return Promise.resolve(null);
};
