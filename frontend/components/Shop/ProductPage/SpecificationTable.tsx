import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import constants from "../../../util/Constants";
import {
  Box,
  Button,
  Container,
  extendTheme,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
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
  const [addedRows, setAddedRows] = useState<string[][]>([]);
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
    setTableContentStruct([...tableContentStruct, newRow]);
    setReRender(true);
    saveTableContent().then(() => {
      setReRender(true);
    });
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

  const doesTableExist = async (productId: number): Promise<void> => {
    console.log(`doestableexist product id = ${productId}`);
    return new Promise((resolve, reject) => {
      if (product)
        axios
          .post(
            `${constants.url}/shop/existstable/`,
            {
              product_id: productId,
            },
            { withCredentials: true }
          )
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
    });
  };

  const createTableHeading = () => {
    if (heading.length === 0)
      setHeading([
        ...heading,
        <Text key={heading.length + 1}>Specification</Text>,
        <Text key={heading.length + 2}>Details</Text>,
      ]);
  };

  const saveTableContent = async (): Promise<void> => {
    setLoadingSaveBtn(true);
    return new Promise((resolve) => {
      axios
        .post(
          `${constants.url}/shop/savetablecontent/`,
          {
            addedRows: [(lastIndxInTableStruct + 1).toString(), ...newRow],
            modifiedRows: modifiedRows,
            product_id: product.id,
          },
          { withCredentials: true }
        )
        .then(() => {
          setTimeout(() => {
            setLoadingSaveBtn(false);
          }, 1000);
          resolve();
        })
        .catch((err) => console.error(err));
    });
  };

  const getTableContent = async () => {
    axios
      .post(
        `${constants.url}/shop/gettablecontent/`,
        {
          product_id: product.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        let lastIndx = 0;
        setTableContentStruct([
          ...res.data.content.map((el: any, indx: any) => {
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
      });
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
        console.log(res);
        getTableContent();
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
              // setModifyAddRowModal(false);
              //  setOpenAddRowModal(true);
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
    doesTableExist(product.id)
      .then(() => {
        console.log("table does exist");
        setProduct(product);
        setTableExists(true);
        createTableHeading();
        getTableContent();
      })
      .catch(() => {
        console.log("table does not exist");
        setTableExists(false);
      });
  }, [product, tableExists]);

  useEffect(() => {
    createTableHeading();
    getTableContent();
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
            // rowCb={(indx: number) => {
            //   if (!readOnly) {
            //     setOpenAddRowModal(true);
            //     setModifyAddRowModal(true);
            //     setIndxToModify(indx);
            //   }
            // }}
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
                      onClick={() => saveTableContent()}
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
              console.log("table content", tableContent);
              if (modifyAddRowModal)
                modifyTableStruct(tableContent, indxToModify);
              // else addRowToTable(tableContent);
            }}
          />
        </TableModalContext.Provider>
        <pre>{JSON.stringify(newRow, null, 2)}</pre>
      </>
    );
  else return <Text>Table does not exist</Text>;
};

export default SpecificationTable;
