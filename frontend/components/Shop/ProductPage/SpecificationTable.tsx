import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import constants from "../../../util/Constants";
import { Box, Button, Container, Text, Tooltip } from "@chakra-ui/react";
import { FaSave, FaTrash } from "react-icons/fa";
import CustomTable from "../../Custom/CustomTable";
import { TableModalContext } from "../../../context/TableModalContext";
import AddRowModal from "../../Custom/AddRowModal";
import { SpecTableContext } from "../../../context/SpecTableContext";
import { GoPlus } from "react-icons/go";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { RiEjectLine } from "react-icons/ri";

const SpecificationTable: React.FC<{ product?: any }> = () => {
  const [tableContentStruct, setTableContentStruct] = useState<string[][]>([]);
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

  const [heading, setHeading] = specTableContext.headings;
  const [tableExists, setTableExists] = specTableContext.tableExist;
  const [openAddRowModal, setOpenAddRowModal] = specTableContext.openRowModal;
  const [modifyAddRowModal, setModifyAddRowModal] =
    specTableContext.modifyRowModal;
  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const addRowToTable = (tableContentLocal: string[]) => {
    (tableContentLocal = [
      (lastIndxInTableStruct + 1).toString(),
      ...tableContentLocal,
    ]),
      setAddedRows([...addedRows, tableContentLocal]);
    setLastIndxInTableStruct(lastIndxInTableStruct + 1);
    setTableContentStruct([...tableContentStruct, tableContentLocal]);
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
        <Text>Specification</Text>,
        <Text>Details</Text>,
      ]);
  };

  const saveTableContent = async () => {
    setLoadingSaveBtn(true);
    axios
      .post(
        `${constants.url}/shop/savetablecontent/`,
        {
          addedRows: addedRows,
          modifiedRows: modifiedRows,
          product_id: product.id,
        },
        { withCredentials: true }
      )
      .then(() => {
        setTimeout(() => {
          setLoadingSaveBtn(false);
        }, 1000);
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
        setTableContentStruct(
          res.data.content.map((el: any) => {
            if (lastIndxInTableStruct < el.id) setLastIndxInTableStruct(el.id);
            return [el.id, el.specification, el.details];
          })
        );
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
            variant="pinkSolid"
            padding="0.8em"
            onClick={() => {
              setModifyAddRowModal(false);
              setOpenAddRowModal(true);
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

  return (
    <>
      <Container
        position="relative"
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
        height="inherit"
        padding="2em 2em 5em 2em"
        borderRadius="lg"
      >
        <CustomTable
          rows={tableContentStruct}
          heading={heading}
          rowCb={(indx: number) => {
            setOpenAddRowModal(true);
            setModifyAddRowModal(true);
            setIndxToModify(indx);
          }}
          select
          selectedRowsState={[selectedRows, setSelectedRows]}
        />

        <AddRowsBtn />
        {tableContentStruct.length !== 0 ? (
          <Box>
            <Tooltip label="Save">
              <Button
                variant="blueSolid"
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
                variant="pinkSolid"
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
            <pre>{JSON.stringify({ tableExists })}</pre>
          </Box>
        ) : (
          <></>
        )}
      </Container>
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
            else addRowToTable(tableContent);
          }}
        />
      </TableModalContext.Provider>
    </>
  );
};

export default SpecificationTable;
