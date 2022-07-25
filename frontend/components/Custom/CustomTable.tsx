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
  doubleClick?: boolean;
  rowCb?: Function;
  select?: boolean;
  selectedRowsState?: [selectedRows: any[], setSelectedRows: Function];
  excludeSelectForRows?: number[];
  interactive?: boolean;
  tableVariant?: "simple" | "primary" | "secondary";
  disableClick?: boolean;
}

const CustomTable = ({
  rows,
  heading,
  tableCaption,
  doubleClick,
  rowCb,
  select,
  selectedRowsState = [[], () => {}],
  excludeSelectForRows,
  interactive,
  disableClick,
  tableVariant = "primary",
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

  const bgColor = () => {
    switch (tableVariant) {
      case "simple": {
        return "";
      }
      case "primary": {
        return "primary.100";
      }
      case "secondary": {
        return "secondary.200";
      }
      default: {
        return "primary.100";
      }
    }
  };

  const handleClicking = (fun: Function) => {
    if (disableClick) {
      return {};
    } else {
      if (doubleClick) return { onDoubleClick: fun };
      else return { onClick: fun };
    }
  };

  return (
    <Table variant="simple" size="md" width="full" overflow="scroll" {...props}>
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : <></>}
      <Thead bgColor={bgColor()} height="3.5em">
        <Tr>
          {heading.map((headingElement, indx: number) => (
            <Th
              textColor={tableVariant === "simple" ? "" : "white"}
              key={indx}
              fontSize={{ base: "0.6em", md: "0.6em", lg: "0.7em" }}
            >
              {headingElement}
            </Th>
          ))}
          {select ? (
            <Th width={1} key={heading.length + 1}>
              <Text
                textColor={tableVariant === "simple" ? "" : "white"}
                fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
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
            _hover={{
              bg: interactive && "gray.200",
              cursor: interactive || (doubleClick && "pointer"),
            }}
            {...(handleClicking(() => {
              if (!selectTrigger) setSelectTrigger(false);
            }) as any)}
          >
            {rowEl.map((columnElement: any, indx: number) =>
              indx !== 0 ? (
                <Td
                  key={indx}
                  {...(handleClicking(() => {
                    if (rowCb && selectTrigger === false) rowCb(rowEl[0]);
                  }) as any)}
                  {...(!doubleClick
                    ? {
                        ...{
                          onClick: () => {
                            if (rowCb && selectTrigger === false)
                              rowCb(rowEl[0]);
                          },
                        },
                      }
                    : {
                        ...{
                          onDoubleClick: () => {
                            if (rowCb && selectTrigger === false)
                              rowCb(rowEl[0]);
                          },
                        },
                      })}
                  fontSize={{ base: "0.75em", md: "0.8em", lg: "0.9em" }}
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
