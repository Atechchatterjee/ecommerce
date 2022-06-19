import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useDynamicColumns } from "../hooks/useDynamicColumns";
import { motion } from "framer-motion";
import { ProductInfoContext } from "../context/ProductInfoContext";
import { getAllProducts } from "../services/ProductService";
import Product from "../components/Shop/Product";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import usePagination from "../hooks/usePagination";
import PaginationBar from "../components/Widgets/PaginationBar";

const Shop: NextPage = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [originalProducts, setOriginalProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns] = useDynamicColumns(4, [1700, 1300, 860]);
  const [pageLimit] = useState<number>(8);

  useEffect(() => {
    getAllProducts().then((products) => {
      setAllProducts(products);
      setOriginalProducts(products);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, [allProducts]);

  const {
    startIndx,
    endIndx,
    moveNext,
    movePrev,
    moveToPage,
    numberOfPages,
    currentSelectedPage,
    numberOfElementDisplayed,
  } = usePagination({ pageLimit, maxEl: allProducts?.length || 0 });

  return (
    <Box>
      <Header
        products={[allProducts, setAllProducts]}
        originalProducts={originalProducts}
      />
      <Box
        padding="2rem 5% 3% 3%"
        overflow="hidden"
        onScroll={(e: any) => alert(e.target.scrollTop)}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <Grid
            h="inherit"
            gap={6}
            templateColumns={`repeat(${columns}, 1fr)`}
            templateRows={`repeat(${Math.ceil(
              numberOfElementDisplayed / columns
            )}, 1fr)`}
          >
            {allProducts
              .filter((_: any, i: number) => i >= startIndx && i < endIndx)
              .map((product) => (
                <GridItem key={product.product_id}>
                  <ProductInfoContext.Provider
                    value={{
                      productInfo: [
                        { ...product, id: product.product_id },
                        () => {},
                      ],
                    }}
                  >
                    <Product />
                  </ProductInfoContext.Provider>
                </GridItem>
              ))}
          </Grid>
          <PaginationBar
            {...{
              moveNext,
              movePrev,
              moveToPage,
              currentSelectedPage,
              numberOfPages,
            }}
          />
        </motion.div>
      </Box>
      {loading ? <></> : <Footer />}
    </Box>
  );
};

export default Shop;
