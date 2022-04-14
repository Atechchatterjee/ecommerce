import React, { useContext, useEffect, useState } from "react";
import { fetchOptions } from "../../services/OptionsService";
import CustomContainer from "../Custom/CustomContainer";
import CustomTable from "../Custom/CustomTable";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { ContainerProps, Text } from "@chakra-ui/react";
import { scrollBarStyle } from "../../util/ScrollBarStyle";

const OptionsTable = ({ ...props }: ContainerProps) => {
  const [rows, setRows] = useState<any[][]>();
  const [longestRowLength, setLongestRowLength] = useState<number>(2);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const convertToRows = (options: any) => {
    const rows: any[] = [];
    options.forEach((option: any) => {
      if (longestRowLength < option.values.length) {
        setLongestRowLength(option.values.length);
      }
      rows.push([
        option.id,
        <Text fontWeight="semibold">{option.name}</Text>,
        ...option.values.map((val: any) => val.value),
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
      padding="2%"
      overflowX="scroll"
      sx={scrollBarStyle()}
      {...props}
    >
      <CustomTable
        rows={rows || []}
        heading={[
          "Name",
          "Values",
          ...new Array(longestRowLength - 1).fill(""),
        ]}
      />
    </CustomContainer>
  );
};

export default OptionsTable;
