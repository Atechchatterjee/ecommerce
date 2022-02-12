import React, { useState } from "react";
import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import Navbar from "../../../components/Admin/Navbar";
import AddCategory from "../../../components/Admin/AddCategory";
import WithAuth from "../../../util/WithAuth";

const Category: NextPage = () => {
  return (
    <>
      <Navbar />
      <Center>
        <AddCategory marginTop="3em" />
      </Center>
    </>
  );
};

export default WithAuth(Category, { admin: true });
