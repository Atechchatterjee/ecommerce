import React, { useState } from "react";
import { Button, Center, Container, Text } from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import Product from "./index";
import { TableModalContext } from "../../../context/TableModalContext";
import CustomTableModal from "../../Custom/CustomTableModal";

interface Props {
  product: any;
}

const createTableContent = (rowsAsString: string[][]): any[][] => {
  const rows: any[][] = [];
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
  const [tableContent, _] = useState<string[][]>([]);
  const [heading, setHeading] = useState<any[]>([]);
  const [triggerModal, setTriggerModal] = useState<boolean>(false);
  const [columnNo, setColumnNo] = useState<number>(0);
  const [confirmColumn, setConfirmColumn] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<any>({});
  const MODIFYTABLECOND = heading.length !== 0;

  const modifyTableOnClick = () => {
    setTriggerModal(true);
    setConfirmColumn(true);
  };

  const createTableOnClick = () => {
    setTriggerModal(true);
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
          >
            Add Rows
          </Button>
        ) : (
          <></>
        )}
      </Container>
      <Container marginLeft="2em" width="100%">
        <CustomTable
          rows={createTableContent(tableContent)}
          heading={heading}
        />
      </Container>
      <TableModalContext.Provider
        value={{
          setTriggerOpen: setTriggerModal,
          triggerOpen: triggerModal,
          columnNames,
          columnNo,
          setColumnNames,
          setColumnNo,
          confirmColumn,
          setConfirmColumn,
        }}
      >
        <CustomTableModal
          cb={(columnNames: any) => {
            const headingNames: any = [];
            Object.keys(columnNames).forEach((key) => {
              headingNames.push(<Text>{columnNames[key]}</Text>);
            });
            setHeading(headingNames);
          }}
        />
      </TableModalContext.Provider>
    </>
  );
};

export default ProductSpec;
