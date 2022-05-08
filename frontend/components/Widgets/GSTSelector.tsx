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
import { useContext } from "react";
import { GSTSelectorContext } from "../../context/GSTSelectorContext";

interface GSTSelectorProps extends TableProps {
  GSTData: any;
  selectCb?: Function;
}

const GSTSelector = ({ selectCb, GSTData, ...props }: GSTSelectorProps) => {
  const { selectedRows, setSelectedRows } = useContext(GSTSelectorContext);

  const handleSelection = (data: any) => {
    setSelectedRows(data);
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
              <Checkbox size="lg" isChecked={data.id === selectedRows?.id} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GSTSelector;
