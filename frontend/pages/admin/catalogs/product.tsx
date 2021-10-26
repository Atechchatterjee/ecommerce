import React from "react";
import { NextPage } from "next";
import { Container, Flex } from "@chakra-ui/react";
import AddProduct from "../../../components/Admin/AddProduct";
import Navbar from "../../../components/Admin/Navbar";
import constants from "../../../util/Constants";
import axios from "axios";

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

// getting all the different available categories including sub-categories
const getAllCategory = async (): Promise<Category> => {
  try {
    const res = await axios.get(`${constants.url}/shop/getAllCategory/`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAllProducts = async (): Promise<Products> => {
  try {
    const res = await axios.get(`${constants.url}/shop/getAllProducts/`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const Product: NextPage = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <AddProduct marginTop="3em" />
      </Flex>
    </>
  );
};

export default Product;
