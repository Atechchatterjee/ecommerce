import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import ProductSpecification from "../../../../components/Shop/AdminProductPage/ProductSpecification";
import Navbar from "../../../../components/Admin/Navbar";
import WithAuth from "../../../../util/WithAuth";
import { UserContext } from "../../../../context/UserContext";
import { ProductInfoContext } from "../../../../context/ProductInfoContext";
import { ProductType } from "../../../../types/shop";
import { getProductInfo } from "../../../../util/ProductInfo";
import { Box } from "@chakra-ui/react";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<ProductType>({} as ProductType);
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
      <Box position="sticky">
        <ProductInfoContext.Provider
          value={{ productInfo: [product, setProduct] }}
        >
          <Navbar />
          <ProductSpecification />
        </ProductInfoContext.Provider>
      </Box>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default WithAuth(ProductPage, { admin: true });
