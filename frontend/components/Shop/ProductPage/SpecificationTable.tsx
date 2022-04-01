import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import constants from "../../../util/Constants";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { FaSave, FaTrash } from "react-icons/fa";
import CustomTable from "../../Custom/CustomTable";
import { TableModalContext } from "../../../context/TableModalContext";
import AddRowModal from "../../Custom/AddRowModal";
import { SpecTableContext } from "../../../context/SpecTableContext";
import { GoPlus } from "react-icons/go";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import CustomContainer from "../../Custom/CustomContainer";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import { CustomField } from "../../Custom/CustomField";
import {
  getTableContent,
  saveTableContent,
  doesTableExist,
} from "../../../services/SpecTableService";

const SpecificationTable: React.FC<{ product?: any; readOnly?: boolean }> = ({
  readOnly,
}) => {
  const [tableContentStruct, setTableContentStruct] = useState<any[][]>([]);
  const [openCreateTableModal, setOpenCreateTableModal] =
    useState<boolean>(false);
  const [columnNo, setColumnNo] = useState<number>(2);
  const [confirmColumn, setConfirmColumn] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<any>({});
  const [indxToModify, setIndxToModify] = useState<number>(0);
  const [lastIndxInTableStruct, setLastIndxInTableStruct] = useState<number>(0);
  const [modifiedRows, setModifiedRows] = useState<string[][]>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});
  const [loadingSaveBtn, setLoadingSaveBtn] = useState<boolean>(false);
  const specTableContext = useContext(SpecTableContext);
  const [reRender, setReRender] = useState<boolean>(false);

  const [heading, setHeading] = specTableContext.headings;
  const [tableExists, setTableExists] = specTableContext.tableExist;
  const [openAddRowModal, setOpenAddRowModal] = specTableContext.openRowModal;
  const [modifyAddRowModal, setModifyAddRowModal] =
    specTableContext.modifyRowModal;
  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const addNewRow = (state: any, action: any) => {
    switch (action.type) {
      case "spec":
        return [action.value, state[1]];
      case "details":
        return [state[0], action.value];
      case "addIndx":
        return [action.id, state[0], state[1]];
      default:
        return state;
    }
  };

  const [newRow, dispatchNewRow] = useReducer(addNewRow, []);

  const addRowToTable = () => {
    setReRender(true);
    setLoadingSaveBtn(true);
    saveTableContent(product, modifiedRows, newRow, lastIndxInTableStruct).then(
      () => {
        setReRender(true);
        setLoadingSaveBtn(false);
      }
    );
    setLastIndxInTableStruct(lastIndxInTableStruct + 1);
  };

  const modifyTableStruct = (tableContentLocal: string[], rowId: number) => {
    setModifiedRows([
      ...modifiedRows,
      [rowId.toString(), ...tableContentLocal],
    ]);
    setTableContentStruct(
      tableContentStruct.map((el) =>
        el[0] == rowId.toString()
          ? [rowId.toString(), ...tableContentLocal]
          : el
      )
    );
  };

  const createTableHeading = () => {
    if (heading.length === 0)
      setHeading([
        ...heading,
        <Text key={heading.length + 1}>Specification</Text>,
        <Text key={heading.length + 2}>Details</Text>,
      ]);
  };

  const updateTableContentStruct = (data: any) => {
    let lastIndx = 0;
    setTableContentStruct([
      ...data.content.map((el: any, indx: any) => {
        if (lastIndx <= indx) lastIndx = indx;
        if (lastIndxInTableStruct < el.id) setLastIndxInTableStruct(el.id);
        return [el.id, el.specification, el.details];
      }),
      [
        "",
        <CustomField
          key={lastIndx + 1}
          placeholder="Specification"
          onChange={(e: any) => {
            dispatchNewRow({ type: "spec", value: e.target.value });
          }}
        />,
        <CustomField
          key={lastIndx + 2}
          placeholder="Details"
          onChange={(e: any) => {
            dispatchNewRow({ type: "details", value: e.target.value });
          }}
        />,
      ],
    ]);
  };

  const deleteRows = () => {
    axios
      .post(
        `${constants.url}/shop/deletetablecontent/`,
        {
          deleteIndices: selectedRows,
        },
        { withCredentials: true }
      )
      .then((res) => {
        getTableContent(product).then((res) =>
          updateTableContentStruct(res.data)
        );
      })
      .catch((err) => {
        alert("could not delete rows");
        console.error(err);
      });
  };

  const AddRowsBtn: React.FC = () => {
    if (tableExists)
      return (
        <Tooltip label="Add Row">
          <Button
            marginTop="1em"
            position="absolute"
            right="1em"
            variant="primarySolid"
            padding="0.8em"
            onClick={() => {
              addRowToTable();
            }}
          >
            <GoPlus size="20" />
          </Button>
        </Tooltip>
      );
    else return <></>;
  };

  useEffect(() => {
    doesTableExist(product)
      .then(() => {
        setProduct(product);
        setTableExists(true);
        createTableHeading();
        getTableContent(product).then((res) =>
          updateTableContentStruct(res.data)
        );
      })
      .catch(() => {
        setTableExists(false);
      });
  }, [product, tableExists]);

  useEffect(() => {
    createTableHeading();
    getTableContent(product).then((res) => updateTableContentStruct(res.data));
    setReRender(false);
  }, [reRender]);

  if (tableExists)
    return (
      <>
        <CustomContainer
          position="relative"
          interactive
          height="inherit"
          padding="2em 2em 5em 2em"
          borderRadius="lg"
          overflowX="scroll"
          sx={scrollBarStyle()}
        >
          <CustomTable
            bgSize="contain"
            rows={tableContentStruct}
            heading={heading}
            {...(!readOnly
              ? {
                  select: true,
                  selectedRowsState: [selectedRows, setSelectedRows],
                }
              : {
                  select: false,
                  selectedRowsState: [selectedRows, setSelectedRows],
                })}
            interactive
          />

          {!readOnly ? (
            <>
              <AddRowsBtn />
              {tableContentStruct.length !== 0 ? (
                <Box>
                  <Tooltip label="Save">
                    <Button
                      variant="primarySolid"
                      marginTop="1em"
                      position="absolute"
                      right="5em"
                      onClick={() => {
                        setLoadingSaveBtn(true);
                        saveTableContent(
                          product,
                          modifiedRows,
                          newRow,
                          lastIndxInTableStruct
                        ).then(() => {
                          setLoadingSaveBtn(false);
                        });
                      }}
                      isLoading={loadingSaveBtn}
                    >
                      <FaSave />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Delete">
                    <Button
                      variant="primarySolid"
                      marginTop="1em"
                      position="absolute"
                      right="9em"
                      onClick={() => {
                        deleteRows();
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Tooltip>
                </Box>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </CustomContainer>
        <TableModalContext.Provider
          value={{
            createTableModal: [openCreateTableModal, setOpenCreateTableModal],
            colNames: [columnNames, setColumnNames],
            colNo: [columnNo, setColumnNo],
            confirmCol: [confirmColumn, setConfirmColumn],
            addRowModal: [openAddRowModal, setOpenAddRowModal],
            tableContent: [tableContentStruct, setTableContentStruct],
            modifyTable: [modifyAddRowModal, setModifyAddRowModal],
          }}
        >
          <AddRowModal
            title={modifyAddRowModal ? "Modify Row" : "Add Row"}
            buttonName={modifyAddRowModal ? "Modify" : "Add"}
            rowPlaceholder={["Specification", "Details"]}
            cb={(tableContent) => {
              if (modifyAddRowModal)
                modifyTableStruct(tableContent, indxToModify);
            }}
          />
        </TableModalContext.Provider>
      </>
    );
  else return <Text>Table does not exist</Text>;
};

export default SpecificationTable;
