import React, { useState } from "react";
import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import Navbar from "../../../components/Admin/Navbar";
import AddCategory from "../../../components/Admin/AddCategory";
import WithAuth from "../../../util/WithAuth";

interface Category {
  name: string;
  subCategory: Category | null;
}
const Category: NextPage = () => {
  const [allCategory, setAllCategory] = useState<Category[]>([]);

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
