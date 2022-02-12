import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Center, Container } from "@chakra-ui/react";
import AllProducts from "../../../components/Admin/AllProducts";
import Navbar from "../../../components/Admin/Navbar";
import WithAuth from "../../../util/WithAuth";

const Product: NextPage = () => {
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

export default WithAuth(Product, { admin: true });
