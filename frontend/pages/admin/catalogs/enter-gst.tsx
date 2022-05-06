import React, { useState } from "react";
import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import Navbar from "../../../components/Admin/Navbar";
import WithAuth from "../../../util/WithAuth";
import EnterGST from "../../../components/Widgets/EnterGST";

const Category: NextPage = () => {
  return (
    <>
      <Navbar />
      <Center mt="5rem">
        <EnterGST />
      </Center>
    </>
  );
};

export default WithAuth(Category, { admin: true });
