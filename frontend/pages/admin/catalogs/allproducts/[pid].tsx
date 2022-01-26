import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import constants from "../../../../util/Constants";
import ProductSpec from "../../../../components/Shop/Product/ProductSpec";

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

  useEffect(() => {
    if (!pid) return;
    (async () => {
      await fetch(`/admin/catalogs/allproducts/${pid}`);
    })().then(() => {
      getProductInfo(pid).then((product) => {
        setLoading(false);
        console.log(product);
        setProduct(product);
      });
    });
  }, [pid]);
  return <div>{!loading ? <ProductSpec product={product} /> : <></>}</div>;
};

export default ProductPage;
