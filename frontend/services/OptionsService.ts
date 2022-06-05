import { ProductType } from "../types/shop";
import api from "../util/AxiosApi";

export const fetchOptions = async (product: ProductType): Promise<any> => {
  const res = await api.post(`/shop/get-options/`, { product_id: product.id });
  if (res) return Promise.resolve(res);
  else return Promise.reject();
};

export const saveOptions = async (
  productId: number,
  optionValues: any,
  currentOptionName: any
): Promise<any> =>
  new Promise(async (resolve, reject) => {
    const res = await api.post("/shop/save-options/", {
      product_id: productId,
      optionValues,
      optionName: currentOptionName,
    });
    if (res) resolve(res);
    else reject();
  });
