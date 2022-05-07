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
import React from "react";

interface GSTSelectorProps extends TableProps {
  GSTData: any;
  selectCb?: Function;
  selectedRow: any;
  setSelectedRow: Function;
}

const GSTSelector = ({
  selectedRow,
  setSelectedRow,
  selectCb,
  GSTData,
  ...props
}: GSTSelectorProps) => {
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
        {GSTData.map((data: any, indx: number) => (
          <Tr onClick={() => handleSelection(data)} key={indx}>
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
