import api from "../../util/AxiosApi";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { getProductInfo } from "../../services/ProductService";
import { Spinner } from "@chakra-ui/react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ClientProductPage from "../../components/Shop/ClientProductPage";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!pid) return;
    api.get(`/admin/catalogs/all-products/${pid}`).then(async () => {
      const product = await getProductInfo(pid);
      setProduct(product);
      setLoading(false);
    });
  }, [pid]);

  return !loading ? (
    <ProductInfoContext.Provider value={{ productInfo: [product, setProduct] }}>
      <Header />
      <ClientProductPage product={product} />
      <Footer />
    </ProductInfoContext.Provider>
  ) : (
    <Spinner />
  );
};

export default ProductPage;
