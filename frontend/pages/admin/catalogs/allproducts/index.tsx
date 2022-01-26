import React, { useState } from "react";
import { NextPage } from "next";
import { Center, Container } from "@chakra-ui/react";
import AllProducts from "../../../../components/Admin/AllProducts";
import Navbar from "../../../../components/Admin/Navbar";

interface Products {
  name: string;
  description: string;
  price: string;
  category: string;
}

interface Category {
  name: string;
  subCategory: string;
}

const Product: NextPage = () => {
  const [allProducts, setAllProducts] = useState<Products[]>([]);

  return (
    <>
      <Navbar />
      <Center>
        <AllProducts />
      </Center>
      <Container height="5em" width="full"></Container>
    </>
  );
};

export default Product;
