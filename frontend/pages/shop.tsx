import type { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductType from "../components/Shop/Product";
import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import constants from "../util/Constants";
import axios from "axios";
import { useDynamicColumns } from "../hooks/useDynamicColumns";
import { motion } from "framer-motion";

interface ProductType {
  product_id: number;
  description: string;
  image: string;
  name: string;
  price: string;
  category: number;
}

const getAllProducts = async (): Promise<ProductType[]> => {
  const res = await axios.get(`${constants.url}/shop/getallproducts/`, {
    withCredentials: true,
  });
  return Promise.resolve(res.data.allProducts);
};

const Shop: NextPage = () => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns] = useDynamicColumns(4, [1700, 1300, 860]);

  useEffect(() => {
    getAllProducts().then((products) => {
      setAllProducts(products);
      setOriginalProducts(products);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 200);
  }, [allProducts]);

  return (
    <Box>
      <Header
        products={[allProducts, setAllProducts]}
        originalProducts={originalProducts}
      />
      <Box
        padding="5% 2% 3% 2%"
        overflow="hidden"
        onScroll={(e: any) => alert(e.target.scrollTop)}
      >
        <motion.div
          animate={{ x: 50, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <Grid
            h="inherit"
            gap={6}
            templateColumns={`repeat(${columns}, 1fr)`}
            templateRows={`repeat(${Math.ceil(
              allProducts.length / columns
            )}, 1fr)`}
          >
            {allProducts.map(
              ({ name, image, description, price, product_id }) => (
                <GridItem key={product_id}>
                  <ProductType
                    id={product_id}
                    name={name}
                    image={image}
                    description={description}
                    price={price}
                  />
                </GridItem>
              )
            )}
          </Grid>
        </motion.div>
      </Box>
      {loading ? <></> : <Footer />}
    </Box>
  );
};

export default WithAuth(Shop, { admin: false });
