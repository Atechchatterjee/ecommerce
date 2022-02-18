import axios from "axios";
import constants from "./Constants";
import {Product} from "../types/shop";

export const getProductInfo = async (productId: any): Promise<Product> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${constants.url}/shop/getproduct/`, {
          id: productId
        })
        .then((res) => {
          let modifiedProduct = {
            ...res.data.product,
            id: res.data.product.product_id,
          };
          delete modifiedProduct["product_id"];
          resolve(modifiedProduct);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };