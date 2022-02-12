import React, { useState } from "react";
import { Button, Container, HStack, Text } from "@chakra-ui/react";
import Product from "./index";
import axios from "axios";
import constants from "../../../util/Constants";
import SpecificationTable from "./SpecificationTable";
import { SpecTableContext } from "../../../context/SpecTableContext";

const ProductSpec: React.FC<{ product: any }> = ({ product }) => {
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [openAddOptionModal, setOpenOptionModal] = useState<boolean>(false);

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text>Specification</Text>,
        <Text>Details</Text>,
      ]);
  };

  const createTable = async () => {
    await axios
      .post(
        `${constants.url}/shop/createtable/`,
        {
          product_id: product.product_id,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setTableExists(true);
      })
      .catch((err) => console.error(err));
  };

  const AddRowsBtn: React.FC = () => {
    if (tableExists)
      return (
        <Button
          marginTop="1.5em"
          marginLeft="10.5%"
          width="30em"
          variant="blueGradient"
          onClick={() => {
            setModifyAddRowModal(false);
            setOpenAddRowModal(true);
          }}
        >
          Add Rows
        </Button>
      );
    else return <></>;
  };

  const CreateSpecificationTableBtn: React.FC = () => {
    if (!tableExists)
      return (
        <Button
          marginTop="1.5em"
          marginLeft="4em"
          width="30em"
          variant="blueSolid"
          onClick={() => {
            createTableHeading();
            createTable();
          }}
        >
          Create Specification Table
        </Button>
      );
    else return <></>;
  };

  return (
    <SpecTableContext.Provider
      value={{
        headings: [specTableHeading, setSpecTableHeading],
        tableExist: [tableExists, setTableExists],
        openRowModal: [openAddRowModal, setOpenAddRowModal],
        modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
      }}
    >
      <Container margin="0" marginTop="2em" float="left">
        {product ? (
          <Product
            id={product.product_id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ) : (
          <></>
        )}
        <CreateSpecificationTableBtn />
        <AddRowsBtn />
        <Button
          width="30em"
          marginLeft="10.5%"
          marginTop="1.5em"
          variant="blueSolid"
          onClick={() => setOpenOptionModal(true)}
        >
          Create Options Table
        </Button>
      </Container>
      <Container float="left" marginTop="2em">
        <SpecificationTable product={product} />
      </Container>
    </SpecTableContext.Provider>
  );
};

export default ProductSpec;
