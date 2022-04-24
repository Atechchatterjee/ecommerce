import React, { useContext, useEffect, useState } from "react";
import { fetchOptions } from "../../services/OptionsService";
import CustomContainer from "../Custom/CustomContainer";
import CustomTable from "../Custom/CustomTable";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { Box, Button, ContainerProps, Tag, Text } from "@chakra-ui/react";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import OptionModal from "../Shop/ProductPage/OptionsModal";
import { FiPlus } from "react-icons/fi";

const OptionsTable = ({ ...props }: ContainerProps) => {
  const [rows, setRows] = useState<any[][]>();
  const [longestRowLength, setLongestRowLength] = useState<number>(2);
  const [isOpenOptionModal, setIsOpenOptionModal] = useState<boolean>(false);

  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  const convertToRows = (options: any) => {
    const rows: any[] = [];
    options.forEach((option: any) => {
      if (longestRowLength < option.values.length) {
        setLongestRowLength(option.values.length);
      }
      rows.push([
        option.id,
        <Text fontWeight="semibold" key="1">
          {option.name}
        </Text>,
        ...option.values.map((val: any, indx: number) => (
          <Tag color="gray.700" key={indx}>
            {val.value}
          </Tag>
        )),
      ]);
    });
    setRows(rows);
  };

  useEffect(() => {
    fetchOptions(product).then((res) => {
      console.log({ options: res.data.options });
      convertToRows(res.data.options);
    });
  }, []);

  return (
    <CustomContainer
      interactive
      padding="0"
      overflowX="scroll"
      sx={scrollBarStyle()}
      display="flex"
      flexDirection="column"
      gridGap={5}
      {...props}
    >
      <CustomTable
        flex="1"
        rows={rows || []}
        heading={[
          "Name",
          "Values",
          ...new Array(longestRowLength - 1).fill(""),
        ]}
      />
      <Box flex="1" textAlign="right" width="100%" paddingRight="2%">
        <OptionModal
          product={product}
          triggerOpen={[isOpenOptionModal, setIsOpenOptionModal]}
        >
          <Button
            width="8%"
            mb="0.5em"
            padding="0.8em"
            variant="primarySolid"
            onClick={() => setIsOpenOptionModal(true)}
          >
            <FiPlus size="30" />
          </Button>
        </OptionModal>
      </Box>
    </CustomContainer>
  );
};

export default OptionsTable;