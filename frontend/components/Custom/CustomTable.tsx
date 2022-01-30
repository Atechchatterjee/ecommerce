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
  rowCb?: Function;
}

const CustomTable: React.FC<Props> = ({
  rows,
  heading,
  tableCaption,
  rowCb,
}) => {
  return (
    <Table variant="simple" size="md" width="full">
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead>
        <Tr>
          {heading.map((headingElement, indx: number) => (
            <Th key={indx}>{headingElement}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((rowEl, indx) => (
          <Tr
            _hover={{
              background: "#F7F7F7",
              cursor: "pointer",
            }}
            onClick={() => {
              if (rowCb) rowCb(indx);
            }}
          >
            {rowEl.map((columnElement: any, indx: number) => (
              <Td key={indx}>{columnElement}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
