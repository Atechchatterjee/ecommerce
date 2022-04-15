import React, {
  useRef,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Spinner, Button, Flex, Text } from "@chakra-ui/react";
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
  modifyTableContent,
} from "../../../services/SpecTableService";
import { FaTrash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const newRowReducer = (state: any, action: any) => {
  switch (action.type) {
    case "spec":
      return [action.value, state[1]];
    case "details":
      return [state[0], action.value];
    case "add":
      return action.value;
    case "addIndx":
      return [action.id, state[0], state[1]];
    case "clear":
      return [];
    default:
      return state;
  }
};

const loadingReducer = (state: any, action: any) => {
  switch (action.type) {
    case "loading-save-btn":
      return { ...state, saveBtn: action.value };
    case "loading-delete-btn":
      return { ...state, deleteBtn: action.value };
    default:
      return state;
  }
};

const createHashTableforSpecData = (specData: any[]): any => {
  const hashTable: any = {};
  specData.forEach((row) => {
    hashTable[parseInt(row[0])] = row.slice(1);
  });
  return hashTable;
};

const SpecificationTable: React.FC<{ product?: any; readOnly?: boolean }> = ({
  readOnly,
}) => {
  const [tableContentStruct, setTableContentStruct] = useState<any[][]>([]);
  const [hashTableForTableContent, setHashTableForTableContent] = useState<any>(
    {}
  );
  const [lastIndxInTableStruct, setLastIndxInTableStruct] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any>({});
  const [reRender, setReRender] = useState<boolean>(false);
  const [oneRowSelected, setOneRowSelected] = useState<boolean>(false);

  const specTableContext = useContext(SpecTableContext);
  const [heading, setHeading] = specTableContext.headings;
  const [tableExists, setTableExists] = specTableContext.tableExist;
  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [newRow, dispatchNewRow] = useReducer(newRowReducer, []);
  const [loading, dispatchLoading] = useReducer(loadingReducer, {
    saveBtn: false,
    deleteBtn: false,
  });

  const inputRowRef = useRef<any>(null);

  const hasSelectedRows = (n?: number): boolean => {
    let doesHaveSelectedRows = false,
      numberOfRowsSelected = 0;
    Object.keys(selectedRows).forEach((key) => {
      if (selectedRows[key] === true) {
        doesHaveSelectedRows = true;
        numberOfRowsSelected++;
      }
    });
    return n ? numberOfRowsSelected === n : doesHaveSelectedRows;
  };

  useEffect(() => {
    if (hasSelectedRows(1)) {
      setOneRowSelected(true);
    } else {
      setOneRowSelected(false);
    }
  }, [selectedRows]);

  useEffect(() => {
    const selectedRowIndx = getSelectedRowIndx();
    const selectedRow: any = hashTableForTableContent[selectedRowIndx] || [
      "",
      "",
    ];
    dispatchNewRow({ type: "add", value: selectedRow });
  }, [oneRowSelected]);

  useEffect(() => {
    doesTableExist(product)
      .then(() => {
        setProduct(product);
        setTableExists(true);
        createTableHeading();
        getTableContent(product).then((res) => {
          updateTableContentStruct(res.data);
        });
      })
      .catch(() => {
        setTableExists(false);
      });
  }, [product, tableExists]);

  useEffect(() => {
    createTableHeading();
    getTableContent(product).then((res) => {
      updateTableContentStruct(res.data);
    });
    setReRender(false);
    dispatchNewRow({ type: "clear" });
    setSelectedRows({});
  }, [reRender]);

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
    const newTableContentStruct = [
      ...data.content.map((el: any, indx: any) => {
        if (lastIndx <= indx) lastIndx = indx;
        if (lastIndxInTableStruct < el.id) setLastIndxInTableStruct(el.id);
        return [el.id, el.specification, el.details];
      }),
    ];
    setTableContentStruct(newTableContentStruct);
    if (newTableContentStruct) {
      setHashTableForTableContent(
        createHashTableforSpecData(newTableContentStruct)
      );
    }
  };

  const setInputValue = (value: [specification: string, detail: string]) => {
    dispatchNewRow({ type: "clear" });
    if (inputRowRef.current) {
      const rowInputElements: any[] = [...inputRowRef.current.children];
      rowInputElements.forEach((input: any, indx) => {
        input.lastChild.value = value[indx];
      });
    }
  };

  const getSelectedRowIndx = (): number => {
    let selectedKey = -1;
    if (!hasSelectedRows(1)) return -1;
    Object.keys(selectedRows).forEach((key) => {
      if (selectedRows[key] === true) {
        selectedKey = parseInt(key);
      }
    });
    return selectedKey;
  };

  const handleModifyRow = () => {
    const rowIdToModify = getSelectedRowIndx();
    dispatchLoading({ type: "loading-save-btn", value: true });
    modifyTableContent(product.id, rowIdToModify, newRow).then(() => {
      dispatchNewRow({ type: "clear" });
      setInputValue(["", ""]);
      setReRender(true);
      dispatchLoading({ type: "loading-save-btn", value: false });
    });
  };

  const handleAddRow = () => {
    if (newRow[0] === "" || newRow[1] === "") return;
    dispatchLoading({
      type: "loading-save-btn",
      value: newRow[0] === "" || newRow[1] === "",
    });
    saveTableContent(product, newRow, lastIndxInTableStruct).then(() => {
      setInputValue(["", ""]);
      dispatchNewRow({ type: "clear" });
      setReRender(true);
      dispatchLoading({ type: "loading-save-btn", value: false });
    });
    setLastIndxInTableStruct(lastIndxInTableStruct + 1);
  };

  const handleDelete = () => {
    dispatchLoading({ type: "loading-delete-btn", value: true });
    deleteRows(selectedRows).then(() => {
      getTableContent(product).then((res) => {
        updateTableContentStruct(res.data);
        setReRender(true);
        dispatchLoading({ type: "loading-delete-btn", value: false });
      });
    });
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
        {!readOnly && [
          <Flex
            flexDirection="row"
            gridGap={5}
            mt="5%"
            padding="1%"
            width="100%"
            ref={inputRowRef}
            key="1"
          >
            <CustomField
              placeholder={
                oneRowSelected ? "Modify Specification" : "Add Specification"
              }
              value={newRow[0]}
              onChange={(e: any) => {
                dispatchNewRow({ type: "spec", value: e.target.value });
              }}
            />
            <CustomField
              placeholder={oneRowSelected ? "Modify Details" : "Add Details"}
              value={newRow[1]}
              onChange={(e: any) => {
                dispatchNewRow({ type: "details", value: e.target.value });
              }}
            />
          </Flex>,
          <Flex
            flexDirection="row"
            mt="2em"
            gridGap={4}
            justifyContent="right"
            key="2"
          >
            <Button
              variant="primarySolid"
              padding="0.8em"
              onClick={() =>
                oneRowSelected ? handleModifyRow() : handleAddRow()
              }
            >
              {loading.saveBtn ? (
                <Spinner size="sm" />
              ) : (
                <TiTick size="1.5rem" />
              )}
            </Button>
            {tableContentStruct.length !== 0 && (
              <Button variant="primarySolid" onClick={handleDelete} key={1}>
                {loading.deleteBtn ? <Spinner size="sm" /> : <FaTrash />}
              </Button>
            )}
          </Flex>,
        ]}
      </CustomContainer>
    );
  else return <Text>Table does not exist</Text>;
};

export default SpecificationTable;
