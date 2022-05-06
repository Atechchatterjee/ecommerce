import {
  Checkbox,
  Table,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface GSTSelectorProps extends TableProps {
  GSTData: any;
  selectCb?: Function;
}

const GSTSelector = ({ selectCb, GSTData, ...props }: GSTSelectorProps) => {
  const [selectedRow, setSelectedRow] = useState<any>();

  const handleSelection = (data: any) => {
    setSelectedRow(data.id);
    selectCb && selectCb(data);
  };

  if (!GSTData) return <></>;
  return (
    <Table {...props}>
      <Thead>
        <Th textAlign="center">CGST (%)</Th>
        <Th textAlign="center">SGST (%)</Th>
        <Th textAlign="center">IGST (%)</Th>
        <Th textAlign="center">Select</Th>
      </Thead>
      <Tbody>
        {GSTData.map((data: any) => (
          <Tr onClick={() => handleSelection(data)}>
            <Td textAlign="center">{data.cgst} %</Td>
            <Td textAlign="center">{data.sgst} %</Td>
            <Td textAlign="center">{data.igst} %</Td>
            <Td textAlign="center">
              <Checkbox size="lg" isChecked={data.id === selectedRow} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GSTSelector;
