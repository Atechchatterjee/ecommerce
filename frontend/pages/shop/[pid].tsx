import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import constants from "../../util/Constants";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Layout/Header";
import ClientProductPage from "../../components/Shop/ClientProductPage";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { Product } from "../../types/shop";

const getProductInfo = async (productId: any): Promise<any> => {
  const res = await axios.post(`${constants.url}/shop/getproduct/`, {
    id: productId,
  });
  return Promise.resolve(res.data.product);
};

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    if (!pid) return;
    axios.get(`/admin/catalogs/allproducts/${pid}`).then(() => {
      getProductInfo(pid).then((product) => {
        setLoading(false);
        let modifiedProduct: any;
        Object.keys(product).forEach((key: any) => {
          if (key === "product_id") modifiedProduct["id"] = product[key];
          else modifiedProduct[key] = product[key];
        });
        console.log({ modifiedProduct });
        setProduct(product);
      });
    });
  }, [pid]);

  return !loading ? (
    !admin ? (
      <ProductInfoContext.Provider
        value={{ productInfo: [product, setProduct] }}
      >
        <Header />
        <ClientProductPage product={product} />
      </ProductInfoContext.Provider>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default ProductPage;
