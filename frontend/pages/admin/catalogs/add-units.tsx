import React, { useState } from "react";
import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import Navbar from "../../../components/Admin/Navbar";
import AddCategory from "../../../components/Admin/AddCategory";
import WithAuth from "../../../util/WithAuth";
import AddUnits from "../../../components/Admin/AddUnits";

const Category: NextPage = () => {
  return (
    <>
      <Navbar />
      <Center>
        <AddUnits />
      </Center>
    </>
  );
};

export default WithAuth(Category, { admin: true });
