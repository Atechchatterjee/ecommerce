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
import { getProductInfo } from "../../../../util/ProductInfo";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    if (!pid) {
      setLoading(true);
    } else {
      axios.get(`/admin/catalogs/all-products/${pid}`).then(() => {
        getProductInfo(pid).then((product) => {
          setProduct(product);
          setLoading(false);
        });
      });
    }
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
