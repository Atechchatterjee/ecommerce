import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Layout/Header";
import ClientProductPage from "../../components/Shop/ClientProductPage";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { getProductInfo } from "../../util/ProductInfo";
import Footer from "../../components/Layout/Footer";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    if (!pid) return;
    axios.get(`/admin/catalogs/all-products/${pid}`).then(() => {
      getProductInfo(pid).then((product) => {
        console.log({ product });
        setProduct(product);
        setLoading(false);
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
        <Footer />
      </ProductInfoContext.Provider>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default ProductPage;
