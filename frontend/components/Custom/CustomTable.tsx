import {
  Box,
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
  excludeSelectForRows?: number[];
  interactive?: boolean;
  tableVariant?: "simple" | "custom";
}

const CustomTable = ({
  rows,
  heading,
  tableCaption,
  rowCb,
  select,
  selectedRowsState = [[], () => {}],
  excludeSelectForRows,
  interactive,
  tableVariant = "custom",
  ...props
}: Props) => {
  const [selectTrigger, setSelectTrigger] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = selectedRowsState;

  const toggleSelectedRows = (indx: any) => {
    if (!selectedRows[indx]) setSelectedRows({ ...selectedRows, [indx]: true });
    else setSelectedRows({ ...selectedRows, [indx]: false });
  };

  const SelectRowCheckBox: React.FC<{ indx: any }> = ({ indx }) => {
    if (select)
      return (
        <Td
          key={indx}
          textAlign="center"
          onClick={() => {
            toggleSelectedRows(indx);
          }}
        >
          <Checkbox
            size="lg"
            colorScheme="pink"
            isChecked={selectedRows[indx]}
            borderColor="gray.400"
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

  const rowHoverStyle = {
    background: "#F7F7F7",
    cursor: "pointer",
  };

  return (
    <Table variant="simple" size="md" width="full" {...props}>
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead
        bgColor={tableVariant === "simple" ? "" : "primary.100"}
        height="3.5em"
      >
        <Tr>
          {heading.map((headingElement, indx: number) => (
            <Th textColor={tableVariant === "simple" ? "" : "white"} key={indx}>
              {headingElement}
            </Th>
          ))}
          {select ? (
            <Th width={1} key={heading.length + 1}>
              <Text
                textColor={tableVariant === "simple" ? "" : "white"}
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
          <Tr
            key={i}
            {...(interactive ? { _hover: { rowHoverStyle } } : {})}
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
                  {columnElement}
                </Td>
              ) : (
                <Box key={indx} display="none" />
              )
            )}
            {excludeSelectForRows ? (
              excludeSelectForRows.includes(i) ? (
                <Td key={i}></Td>
              ) : (
                <>
                  <SelectRowCheckBox
                    indx={parseInt(
                      rowEl[0].props ? rowEl[0].props.children : rowEl[0]
                    )}
                  />
                </>
              )
            ) : (
              <SelectRowCheckBox indx={parseInt(rowEl[0])} />
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
