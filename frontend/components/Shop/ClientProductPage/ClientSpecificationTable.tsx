import { Box, Text } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { SpecTableContext } from "../../../context/SpecTableContext";
import SpecificationTable from "../AdminProductPage/SpecificationTable";

const ClientSpecificaitonTable = () => {
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );

  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text fontWeight="semibold" key={specTableHeading.length + 1}>
          Specification
        </Text>,
        <Text fontWeight="semibold" key={specTableHeading.length + 2}>
          Details
        </Text>,
      ]);
  };
  useEffect(() => {
    createTableHeading();
    setTableExists(true);
  }, [product]);

  return (
    <Box marginBottom="5%" width="80%" marginLeft="10%">
      <SpecTableContext.Provider
        value={{
          headings: [specTableHeading, setSpecTableHeading],
          tableExist: [tableExists, setTableExists],
          openRowModal: [openAddRowModal, setOpenAddRowModal],
          modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
        }}
      >
        <SpecificationTable readOnly />
      </SpecTableContext.Provider>
    </Box>
  );
};

export default ClientSpecificaitonTable;
