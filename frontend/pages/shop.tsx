import type { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Product from "../components/Shop/Product";
import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import constants from "../util/Constants";
import axios from "axios";
import { useDynamicColumns } from "../hooks/UseDynamicColumns";

interface Product {
  product_id: number;
  description: string;
  image: string;
  name: string;
  price: string;
  category: number;
}

const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${constants.url}/shop/getallproducts/`, {
    withCredentials: true,
  });
  return Promise.resolve(res.data.allProducts);
};

const Shop: NextPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [columns] = useDynamicColumns(4);

  useEffect(() => {
    getAllProducts().then((products) => setAllProducts(products));
  }, []);

  return (
    <Box height="100vh" position="relative">
      <Header />
      <Box padding="5em 10em 5em 5em" overflow="hidden">
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
                <Product
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
      </Box>
      <Footer />
    </Box>
  );
};

export default WithAuth(Shop, { admin: false });
