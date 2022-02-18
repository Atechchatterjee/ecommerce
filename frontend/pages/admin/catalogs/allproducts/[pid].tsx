import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import constants from "../../../../util/Constants";
import ProductSpec from "../../../../components/Shop/ProductPage/ProductSpec";
import Navbar from "../../../../components/Admin/Navbar";
import WithAuth from "../../../../util/WithAuth";
import { UserContext } from "../../../../context/UserContext";
import { ProductInfoContext } from "../../../../context/ProductInfoContext";
import { Product } from "../../../../types/shop";

const getProductInfo = async (productId: any): Promise<any> => {
  const res = await axios.post(`${constants.url}/shop/getproduct/`, {
    id: productId,
  });
  return Promise.resolve(res.data.product);
};

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    if (!pid) return;
    axios.get(`/admin/catalogs/allproducts/${pid}`).then(() => {
      getProductInfo(pid).then((product) => {
        let modifiedProduct: any = {};
        Object.keys(product).forEach((key: any) => {
          if (key === "product_id") modifiedProduct["id"] = product[key];
          else modifiedProduct[key] = product[key];
        });
        // product = { ...product, id: product.product_id };
        // delete product["product_id"];
        setLoading(false);
        console.log({ modifiedProduct });
        console.log({ product });
        setProduct(modifiedProduct);
      });
    });
  }, [pid]);

  return !loading ? (
    admin === true ? (
      <ProductInfoContext.Provider
        value={{ productInfo: [product, setProduct] }}
      >
        <Navbar />
        <ProductSpec />
      </ProductInfoContext.Provider>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default WithAuth(ProductPage, { admin: true });
