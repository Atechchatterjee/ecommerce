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
  TableProps,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props extends TableProps {
  rows: any[][];
  heading: any[];
  tableCaption?: string;
  rowCb?: Function;
  select?: boolean;
  selectedRowsState?: [selectedRows: any[], setSelectedRows: Function];
}

const CustomTable = ({
  rows,
  heading,
  tableCaption,
  rowCb,
  select,
  selectedRowsState,
  ...props
}: Props) => {
  const [selectTrigger, setSelectTrigger] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] =
    selectedRowsState || useState<any>({});

  const toggleSelectedRows = (indx: any) => {
    if (!selectedRows[indx]) setSelectedRows({ ...selectedRows, [indx]: true });
    else setSelectedRows({ ...selectedRows, [indx]: false });
  };

  const SelectRowCheckBox: React.FC<{ indx: any }> = ({ indx }) => {
    if (select)
      return (
        <Td
          textAlign="center"
          onClick={() => {
            toggleSelectedRows(indx);
          }}
        >
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

  const selectAllRows = () => {
    let copy: any = {};
    rows.forEach((row) => {
      if (!selectedRows[row[0]]) copy[row[0]] = true;
    });
    setSelectedRows(copy);
  };

  return (
    <Table variant="simple" size="md" width="full" {...props}>
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead>
        <Tr>
          {heading.map((headingElement, indx: number) => (
            <Th key={indx}>{headingElement}</Th>
          ))}
          {select ? (
            <Th width={1} key={heading.length + 1}>
              <Text
                cursor="pointer"
                onClick={() => {
                  selectAllRows();
                }}
              >
                Select
              </Text>
            </Th>
          ) : (
            <></>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((rowEl, i) => (
          <>
            <Tr
              key={i}
              _hover={{
                background: "#F7F7F7",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!selectTrigger) setSelectTrigger(false);
              }}
            >
              {rowEl.map((columnElement: any, indx: number) =>
                indx !== 0 ? (
                  <Td
                    key={indx}
                    onClick={() => {
                      if (rowCb && selectTrigger === false) rowCb(rowEl[0]);
                    }}
                  >
                    {/* {typeof columnElement === "string" ? (
                      <Text key={indx}>{columnElement}</Text>
                    ) : (
                      columnElement
                    )} */}
                    {columnElement}
                  </Td>
                ) : (
                  <></>
                )
              )}
              <SelectRowCheckBox indx={parseInt(rowEl[0])} key={i} />
            </Tr>
          </>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
