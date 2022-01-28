import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Td,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";

interface Props {
  rows: ReactJSXElement[][];
  heading: ReactJSXElement[];
  tableCaption?: string;
}

const CustomTable: React.FC<Props> = ({ rows, heading, tableCaption }) => {
  return (
    <Table variant="simple" size="md" width="full">
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead>
        <Tr>
          {heading.map((El, indx: number) => (
            <Th key={indx}>{El}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((rowEl) => (
          <Tr>
            {rowEl.map((ColumnEl: any, indx: number) => (
              <Td key={indx}>{ColumnEl}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
