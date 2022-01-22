import type { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Product from "../components/Shop/Product";
import React, { useState, useEffect } from "react";
import { Grid, GridItem, Center } from "@chakra-ui/react";
import constants from "../util/Constants";
import axios from "axios";

interface Product {
  product_id: number;
  description: string;
  image: string;
  name: string;
  price: string;
  category: number;
}

const Shop: NextPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [columns, setColumns] = useState<string>("3");

  useEffect(() => {
    axios
      .get(`${constants.url}/shop/getallproducts/`, { withCredentials: true })
      .then((res) => {
        const allProducts = res.data.allProducts;
        setAllProducts(allProducts);
        console.log(allProducts);
      });
  }, []);
  return (
    <>
      <Header />
      <Center marginTop="3em" width="100%">
        <Grid
          h="inherit"
          width="8xl"
          gap={12}
          templateColumns={`repeat(${columns}, 1fr)`}
          templateRows={`repeat(${Math.ceil(
            allProducts.length / parseInt(columns)
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
      </Center>
      <Footer />
    </>
  );
};

export default WithAuth(Shop, { admin: false });
