import React from "react";
import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import AddProduct from "../../../components/Admin/AddProduct";
import Navbar from "../../../components/Admin/Navbar";
import WithAuth from "../../../util/WithAuth";

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
  return (
    <>
      <Navbar />
      <Center>
        <AddProduct marginTop="3em" />
      </Center>
    </>
  );
};

export default WithAuth(Product, { admin: true });
