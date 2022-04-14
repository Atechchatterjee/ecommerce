import axios from "axios";
import { ProductType } from "../types/shop";
import constants from "../util/Constants";

export const fetchOptions = async (product: ProductType): Promise<any> => (
  new Promise((resolve, reject) => {
    axios
      .post(`${constants.url}/shop/getoptions/`, {
        product_id: product.id,
      })
      .then(resolve)
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  })
)

 export const saveOptions = async (
   productId: number,
   optionValues: any,
   currentOptionName: any 
  ): Promise<any> => (
    new Promise((resolve, reject) => {
      axios
        .post(
          `${constants.url}/shop/saveoptions/`,
          {
            product_id: productId,
            optionValues,
            optionName: currentOptionName,
          },
          { withCredentials: true }
        )
        .then(resolve)
        .catch((err) => {
          console.error(err);
          reject(err);
        })
    })
  );