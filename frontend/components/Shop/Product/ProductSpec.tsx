import React, { useState } from "react";
import { Button, Center, Container, Text } from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import Product from "./index";
import { TableModalContext } from "../../../context/TableModalContext";
import CreateTableModal from "../../Custom/CreateTableModal";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import AddRowModal from "../../Custom/AddRowModal";

interface Props {
  product: any;
}

const createTableContent = (rowsAsString: string[][]) => {
  const rows: ReactJSXElement[][] = [];
  rowsAsString.forEach((row) => {
    let eachRow: any[] = [];
    row.forEach((strEl) => {
      eachRow.push(<Text>{strEl}</Text>);
    });
    rows.push(eachRow);
  });
  return rows;
};

const ProductSpec: React.FC<Props> = ({ product }) => {
  const [tableContentStr, setTableContentStr] = useState<string[][]>([]);
  const [heading, setHeading] = useState<ReactJSXElement[]>([]);
  const [openCreateTableModal, setOpenCreateTableModal] =
    useState<boolean>(false);
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [columnNo, setColumnNo] = useState<number>(0);
  const [confirmColumn, setConfirmColumn] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<any>({});
  const MODIFYTABLECOND = heading.length !== 0;

  const modifyTableOnClick = () => {
    setOpenCreateTableModal(true);
    setConfirmColumn(true);
  };

  const createTableOnClick = () => {
    setOpenCreateTableModal(true);
  };

  return (
    <>
      <Container position="absolute" left="5em">
        {!!product ? (
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
        <Button
          marginTop="1.5em"
          marginLeft="4em"
          width="30em"
          variant="blueSolid"
          onClick={MODIFYTABLECOND ? modifyTableOnClick : createTableOnClick}
        >
          {MODIFYTABLECOND ? "Modify Table" : "Create Table"}
        </Button>
        {MODIFYTABLECOND ? (
          <Button
            marginTop="1.5em"
            marginLeft="4em"
            width="30em"
            variant="pinkSolid"
            onClick={() => setOpenAddRowModal(true)}
          >
            Add Rows
          </Button>
        ) : (
          <></>
        )}
      </Container>
      <Container marginLeft="2em" width="100%">
        <CustomTable
          rows={createTableContent(tableContentStr)}
          heading={heading}
        />
      </Container>
      <TableModalContext.Provider
        value={{
          setOpenCreateTableModal,
          openCreateTableModal,
          columnNames,
          columnNo,
          setColumnNames,
          setColumnNo,
          confirmColumn,
          setConfirmColumn,
          openAddRowModal,
          setOpenAddRowModal,
          tableContentStr,
          setTableContentStr,
        }}
      >
        <CreateTableModal
          cb={(columnNames: any) => {
            const headingNames: any = [];
            Object.keys(columnNames).forEach((key) => {
              headingNames.push(<Text>{columnNames[key]}</Text>);
            });
            setHeading(headingNames);
          }}
        />
        <AddRowModal />
      </TableModalContext.Provider>
    </>
  );
};

export default ProductSpec;
