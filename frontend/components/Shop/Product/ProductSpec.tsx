import React, { useEffect, useState } from "react";
import { Button, Container, Text } from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import Product from "./index";
import { TableModalContext } from "../../../context/TableModalContext";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import AddRowModal from "../../Custom/AddRowModal";
import axios from "axios";
import constants from "../../../util/Constants";
import { FaSave, FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  product: any;
}

const createTableContent = (tableContent: string[][]): any =>
  tableContent.map((row) =>
    Object.keys(row).map((elementIndx: any) => {
      if (elementIndx !== "0") return <Text>{row[elementIndx]}</Text>;
      else return row[elementIndx];
    })
  );

const ProductSpec: React.FC<Props> = ({ product }) => {
  const [tableContentStruct, setTableContentStruct] = useState<string[][]>([]);
  const [heading, setHeading] = useState<ReactJSXElement[]>([]);
  const [openCreateTableModal, setOpenCreateTableModal] =
    useState<boolean>(false);
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [columnNo, setColumnNo] = useState<number>(2);
  const [confirmColumn, setConfirmColumn] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<any>({});
  const [tableExists, setTableExists] = useState<boolean>(heading.length !== 0);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [indxToModify, setIndxToModify] = useState<number>(0);
  const [lastIndxInTableStruct, setLastIndxInTableStruct] = useState<number>(0);
  const [modifiedRows, setModifiedRows] = useState<string[][]>([]);
  const [addedRows, setAddedRows] = useState<string[][]>([]);

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

  const doesTableExist = async (): Promise<void> => {
    axios
      .post(
        `${constants.url}/shop/existstable/`,
        {
          product_id: product.product_id,
        },
        { withCredentials: true }
      )
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  };

  const createTable = async () => {
    await axios.post(
      `${constants.url}/shop/createtable/`,
      {
        product_id: product.product_id,
      },
      {
        withCredentials: true,
      }
    );
    alert("table created");
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
    axios
      .post(
        `${constants.url}/shop/savetablecontent/`,
        {
          addedRows: addedRows,
          modifiedRows: modifiedRows,
          product_id: product.product_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("table content saved");
      })
      .catch(() => {
        alert("table content cannot be saved");
      });
  };

  const getTableContent = async (): Promise<any[]> =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${constants.url}/shop/gettablecontent/`,
          {
            product_id: product.product_id,
          },
          { withCredentials: true }
        )
        .then((res) => resolve(res.data.content))
        .catch((err) => reject(err));
    });

  useEffect(() => {
    doesTableExist()
      .then(() => {
        createTableHeading();
        setTableExists(true);
        getTableContent().then((content) => {
          setTableContentStruct(
            content.map((el) => {
              if (lastIndxInTableStruct < el.id)
                setLastIndxInTableStruct(el.id);
              return [el.id, el.specification, el.details];
            })
          );
        });
      })
      .catch(() => {
        setTableExists(false);
      });
  }, [product]);

  return (
    <>
      <Container position="absolute" left="5em">
        {product ? (
          <Product
            id={product.product_id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ) : (
          <></>
        )}
        {!tableExists ? (
          <Button
            marginTop="1.5em"
            marginLeft="4em"
            width="30em"
            variant="blueSolid"
            onClick={() => {
              createTableHeading();
              createTable();
            }}
          >
            Create Table
          </Button>
        ) : (
          <></>
        )}
        {tableExists ? (
          <Button
            marginTop="1.5em"
            marginLeft="4em"
            width="30em"
            variant="blueGradient"
            onClick={() => {
              setModifyAddRowModal(false);
              setOpenAddRowModal(true);
            }}
          >
            Add Rows
          </Button>
        ) : (
          <></>
        )}
      </Container>
      <Container
        marginLeft="2em"
        width="50em"
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
          deleteCb={(rowId: any) => {}}
        />
        {tableContentStruct.length !== 0 ? (
          <>
            <Button
              variant="blueGradient"
              marginTop="1em"
              position="absolute"
              right="1em"
              onClick={() => saveTableContent()}
            >
              <FaSave />
            </Button>
            <Button
              variant="blueGradient"
              // colorScheme="red"
              marginTop="1em"
              position="absolute"
              right="4.5em"
            >
              <FaEdit />
            </Button>
            <Button
              // variant=""
              colorScheme="red"
              marginTop="1em"
              position="absolute"
              right="8em"
            >
              <FaTrash />
            </Button>
          </>
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

export default ProductSpec;
