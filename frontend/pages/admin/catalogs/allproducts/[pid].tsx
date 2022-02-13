import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import constants from "../../../../util/Constants";
import ProductSpec from "../../../../components/Shop/ProductPage/ProductSpec";
import Navbar from "../../../../components/Admin/Navbar";
import WithAuth from "../../../../util/WithAuth";
import { UserContext } from "../../../../context/UserContext";

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
        console.log(product);
        setProduct(product);
      });
    });
  }, [pid]);

  return !loading ? (
    admin === true ? (
      <>
        <Navbar />
        <ProductSpec product={product} />
      </>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default WithAuth(ProductPage, { admin: true });
