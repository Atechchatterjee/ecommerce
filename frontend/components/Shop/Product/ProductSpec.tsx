import React, { useEffect, useState } from "react";
import { Button, Container, Text } from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import Product from "./index";
import { TableModalContext } from "../../../context/TableModalContext";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import AddRowModal from "../../Custom/AddRowModal";
import axios from "axios";
import constants from "../../../util/Constants";

interface Props {
  product: any;
}

const createTableContent = (rowsAsString: string[][]): JSX.Element[][] =>
  rowsAsString.map((row) => row.map((element) => <Text>{element}</Text>));

const ProductSpec: React.FC<Props> = ({ product }) => {
  const [tableContentStr, setTableContentStr] = useState<string[][]>([]);
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

  const addRowToTable = (tableContentLocal: any[]) => {
    let newTableContentLocal = Object.keys(tableContentLocal).map(
      (key: any) => tableContentLocal[key]
    );
    setTableContentStr([...tableContentStr, newTableContentLocal]);
  };

  const modifyRowToTable = (tableContentLocal: any[]) => {
    let newTableContentRow = Object.keys(tableContentLocal).map(
      (key: any) => tableContentLocal[key]
    );
    setTableContentStr(
      tableContentStr.map((row, indx) =>
        indxToModify !== indx ? row : newTableContentRow
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
    setHeading([...heading, <Text>Specification</Text>, <Text>Details</Text>]);
  };

  const addTableContent = async () => {
    axios
      .post(
        `${constants.url}/shop/addtablecontent/`,
        {
          content: tableContentStr,
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

  const getTableContent = async (): Promise<any[]> => {
    try {
      const res = await axios.post(
        `${constants.url}/shop/gettablecontent/`,
        {
          product_id: product.product_id,
        },
        { withCredentials: true }
      );
      return Promise.resolve(res.data.content);
    } catch (err) {
      return Promise.reject([]);
    }
  };

  useEffect(() => {
    doesTableExist()
      .then(() => {
        createTableHeading();
        setTableExists(true);
        getTableContent().then((content) => {
          console.log({ content });
          setTableContentStr(
            content.map((el) => {
              return [el.specification, el.details];
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
            variant="pinkSolid"
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
      <Container marginLeft="2em" width="100%" position="relative">
        <CustomTable
          rows={createTableContent(tableContentStr)}
          heading={heading}
          rowCb={(indx: number) => {
            setOpenAddRowModal(true);
            setModifyAddRowModal(true);
            setIndxToModify(indx);
          }}
        />
        <Button
          variant="blueSolid"
          marginTop="1em"
          position="absolute"
          right="1em"
          onClick={() => addTableContent()}
        >
          Save
        </Button>
      </Container>
      <TableModalContext.Provider
        value={{
          createTableModal: [openCreateTableModal, setOpenCreateTableModal],
          colNames: [columnNames, setColumnNames],
          colNo: [columnNo, setColumnNo],
          confirmCol: [confirmColumn, setConfirmColumn],
          addRowModal: [openAddRowModal, setOpenAddRowModal],
          tableContent: [tableContentStr, setTableContentStr],
          modifyTable: [modifyAddRowModal, setModifyAddRowModal],
        }}
      >
        <AddRowModal
          cb={(tableContent: any) => {
            if (modifyAddRowModal) modifyRowToTable(tableContent);
            else addRowToTable(tableContent);
          }}
        />
      </TableModalContext.Provider>
    </>
  );
};

export default ProductSpec;
