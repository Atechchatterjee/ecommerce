import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Td,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

interface Props {
  rows: any[][];
  heading: any[];
  tableCaption?: string;
  rowCb?: Function;
  select?: boolean;
  deleteCb?: Function;
}

const CustomTable: React.FC<Props> = ({
  rows,
  heading,
  tableCaption,
  rowCb,
  select,
  deleteCb,
}) => {
  const [selectTrigger, setSelectTrigger] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any>({});

  useEffect(() => {
    console.log({ selectedRows });
  }, [selectedRows, setSelectedRows]);

  const toggleSelectedRows = (indx: any) => {
    if (!selectedRows[indx]) setSelectedRows({ ...selectedRows, [indx]: true });
    else setSelectedRows({ ...selectedRows, [indx]: false });
  };

  const SelectRow: React.FC<{ indx: any }> = ({ indx }) => {
    if (select)
      return (
        <Td textAlign="center">
          <Checkbox
            size="lg"
            colorScheme="pink"
            isChecked={selectedRows[indx]}
            onChange={() => {
              toggleSelectedRows(indx);
            }}
          />
        </Td>
      );
    else return <></>;
  };

  return (
    <Table variant="simple" size="md" width="full">
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead>
        <Tr>
          {heading.map((headingElement, indx: number) => (
            <Th key={indx}>{headingElement}</Th>
          ))}
          {select ? (
            <Th width={1}>
              <Text>Select</Text>
            </Th>
          ) : (
            <></>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((rowEl) => (
          <>
            <Tr
              _hover={{
                background: "#F7F7F7",
                cursor: "pointer",
              }}
              onClick={() => {
                toggleSelectedRows(rowEl[0]);
                if (!selectTrigger) setSelectTrigger(false);
              }}
            >
              {rowEl.map((columnElement: any, indx: number) =>
                indx !== 0 ? (
                  <Td
                    key={indx}
                    onClick={() => {
                      // if (rowCb && selectTrigger === false) rowCb(rowEl[0]);
                    }}
                  >
                    <Text>{columnElement}</Text>
                  </Td>
                ) : (
                  <></>
                )
              )}
              <SelectRow indx={rowEl[0]} />
            </Tr>
          </>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
