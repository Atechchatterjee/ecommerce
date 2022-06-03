import { ProductType } from "../types/shop";
import axios, { AxiosResponse } from "axios";
import constants from "../util/Constants";

export const doesTableExist = async (product: ProductType): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (product)
      axios
        .post(
          `${constants.url}/shop/existstable/`,
          {
            product_id: product.id,
          },
          { withCredentials: true }
        )
        .then(() => resolve())
        .catch(() => reject());
  });
};

export const saveTableContent = async (
  product: ProductType,
  newRow: any[],
  lastIndxInTableStruct: number
): Promise<void> =>
  new Promise((resolve) => {
    axios
      .post(
        `${constants.url}/shop/savetablecontent/`,
        {
          addedRows: [(lastIndxInTableStruct + 1).toString(), ...newRow],
          product_id: product.id,
        },
        { withCredentials: true }
      )
      .then(() => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })
      .catch((err) => console.error(err));
  });

export const getTableContent = async (
  product: ProductType
): Promise<AxiosResponse<any>> =>
  new Promise((resolve, reject) => {
    axios
      .post(
        `${constants.url}/shop/gettablecontent/`,
        {
          product_id: product.id,
        },
        { withCredentials: true }
      )
      .then((res) => resolve(res))
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteRows = (selectedRows: any) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        `${constants.url}/shop/deletetablecontent/`,
        {
          deleteIndices: selectedRows,
        },
        { withCredentials: true }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const modifyTableContent = async (
  productId: number,
  rowId: number,
  modifiedRow: any[]
) => {
  new Promise((resolve, reject) => {
    axios
      .post(
        `${constants.url}/shop/modify-table-content/`,
        {
          productId,
          rowId,
          specification: modifiedRow[0],
          details: modifiedRow[1],
        },
        { withCredentials: true }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
