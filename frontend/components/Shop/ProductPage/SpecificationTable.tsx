import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import constants from "../../../util/Constants";
import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Input,
  Text,
} from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import { SpecTableContext } from "../../../context/SpecTableContext";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import CustomContainer from "../../Custom/CustomContainer";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import { CustomField } from "../../Custom/CustomField";
import {
  getTableContent,
  saveTableContent,
  doesTableExist,
  deleteRows,
} from "../../../services/SpecTableService";

const newRowReducer = (state: any, action: any) => {
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

const SpecificationTable: React.FC<{ product?: any; readOnly?: boolean }> = ({
  readOnly,
}) => {
  const [tableContentStruct, setTableContentStruct] = useState<any[][]>([]);
  const [lastIndxInTableStruct, setLastIndxInTableStruct] = useState<number>(0);
  const [modifiedRows, setModifiedRows] = useState<string[][]>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});
  const [reRender, setReRender] = useState<boolean>(false);
  const [canModify, setCanModify] = useState<boolean>(false);

  const specTableContext = useContext(SpecTableContext);
  const [heading, setHeading] = specTableContext.headings;
  const [tableExists, setTableExists] = specTableContext.tableExist;
  specTableContext.modifyRowModal;
  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [newRow, dispatchNewRow] = useReducer(newRowReducer, []);

  const hasSelectedRows = (): boolean => {
    let doesHaveSelectedRows = false;
    Object.keys(selectedRows).forEach((key) => {
      if (selectedRows[key] === true) {
        doesHaveSelectedRows = true;
      }
    });
    return doesHaveSelectedRows;
  };

  useEffect(() => {
    if (hasSelectedRows()) {
      setCanModify(true);
    } else setCanModify(false);
  }, [selectedRows]);

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

  const InputRow = ({ ...props }: FlexProps) => (
    <Flex flexDirection="row" gridGap={5} {...props}>
      <CustomField
        placeholder={canModify ? "Modify Specification" : "Add Specification"}
        onChange={(e: any) => {
          dispatchNewRow({ type: "spec", value: e.target.value });
        }}
      />
      <CustomField
        placeholder={canModify ? "Modify Details" : "Add Details"}
        onChange={(e: any) => {
          dispatchNewRow({ type: "details", value: e.target.value });
        }}
      />
    </Flex>
  );

  const updateTableContentStruct = (data: any) => {
    let lastIndx = 0;
    setTableContentStruct([
      ...data.content.map((el: any, indx: any) => {
        if (lastIndx <= indx) lastIndx = indx;
        if (lastIndxInTableStruct < el.id) setLastIndxInTableStruct(el.id);
        return [el.id, el.specification, el.details];
      }),
    ]);
  };

  const AddRowsBtn = ({ ...props }: ButtonProps) => {
    if (tableExists)
      return (
        <Button
          variant="primarySolid"
          padding="0.8em"
          onClick={handleAddRow}
          {...props}
        >
          Add
        </Button>
      );
    else return <></>;
  };

  const handleDelete = () => {
    deleteRows(selectedRows).then(() => {
      getTableContent(product).then((res) =>
        updateTableContentStruct(res.data)
      );
    });
  };

  const handleAddRow = () => {
    setReRender(true);
    saveTableContent(product, modifiedRows, newRow, lastIndxInTableStruct).then(
      () => {
        setReRender(true);
      }
    );
    setLastIndxInTableStruct(lastIndxInTableStruct + 1);
  };

  if (tableExists)
    return (
      <CustomContainer
        position="relative"
        interactive
        height="inherit"
        padding="2em 2em 1.5em 2em"
        borderRadius="lg"
        overflowX="scroll"
        sx={scrollBarStyle()}
      >
        <CustomTable
          bgSize="contain"
          rows={tableContentStruct}
          heading={heading}
          select={!readOnly}
          selectedRowsState={[selectedRows, setSelectedRows]}
          interactive
        />
        <InputRow mt="5%" padding="1%" />
        {!readOnly ? (
          <Flex flexDirection="row" mt="2em" gridGap={2} justifyContent="right">
            <AddRowsBtn />
            {tableContentStruct.length !== 0 ? (
              [
                <Button variant="primarySolid" onClick={handleDelete}>
                  Delete
                </Button>,
                <Button variant="primarySolid" disabled={!hasSelectedRows()}>
                  Modify
                </Button>,
              ]
            ) : (
              <></>
            )}
          </Flex>
        ) : (
          <></>
        )}
      </CustomContainer>
    );
  else return <Text>Table does not exist</Text>;
};

export default SpecificationTable;
