import React, { useEffect, useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import CustomTable from "../../Custom/CustomTable";
import Product from "./index";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  product: any;
}

interface ModalProps {
  triggerOpen: boolean;
  setTriggerOpen: (_: boolean) => void;
  cb?: (_: any) => void;
  columnNames?: any[];
  columnNo?: number;
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

const CreateTableModal: React.FC<ModalProps> = ({
  triggerOpen,
  setTriggerOpen,
  cb,
  columnNames: colNames,
  columnNo: colNo,
}) => {
  const [columnNo, setColumnNo] = useState<number>(colNo || 0);
  const [confirmColumn, setConfirmColumn] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<any>(colNames || {});
  const onClose = () => {
    setColumnNo(0);
    setConfirmColumn(false);
    setColumnNames({});
    setTriggerOpen(!triggerOpen);
    if (cb) cb(columnNames);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={triggerOpen}
      onClose={() => setTriggerOpen(!triggerOpen)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Table</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <NumberInput>
              <NumberInputField
                placeholder="Number of Columns"
                width="21em"
                value={colNo}
                onChange={(e) => {
                  setConfirmColumn(false);
                  setColumnNo(parseInt(e.target.value));
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              aria-label="enter"
              icon={<CheckIcon />}
              onClick={() => {
                setConfirmColumn(true);
              }}
            />
          </HStack>
          {confirmColumn ? (
            <>
              <Text marginTop="1.5em" marginLeft="0.3em" color="gray.600">
                Enter your column names
              </Text>
              {(function EnterColumns(columns: number): any[] {
                if (columns <= 0) return [];
                const El = (
                  <Input
                    key={columns}
                    placeholder={`Column Name ${columns}`}
                    width="23.8em"
                    marginTop="1em"
                    onBlur={(e) => {
                      let copyColumnNames = columnNames;
                      copyColumnNames[columns] = e.target.value;
                      setColumnNames(copyColumnNames);
                    }}
                  />
                );
                return [...EnterColumns(columns - 1), El];
              })(columnNo)}
            </>
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProductSpec: React.FC<Props> = ({ product }) => {
  const [tableContent, _] = useState<string[][]>([]);
  const [heading, setHeading] = useState<any[]>([]);
  const [triggerModal, setTriggerModal] = useState<boolean>(false);
  const [modifyTable, setModifyTable] = useState<boolean>(false);

  return (
    <>
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
      <CustomTable rows={createTableContent(tableContent)} heading={heading} />
      {tableContent.length === 0 && heading.length === 0 ? (
        <Button onClick={() => setTriggerModal(true)}>Create Table</Button>
      ) : (
        <Button
          onClick={() => {
            setModifyTable(true);
            setTriggerModal(true);
          }}
        >
          Modify Table
        </Button>
      )}
      <CreateTableModal
        triggerOpen={triggerModal}
        setTriggerOpen={setTriggerModal}
        cb={(columnNames) => {
          const headingNames: any = [];
          Object.keys(columnNames).forEach((key) => {
            headingNames.push(<Text>{columnNames[key]}</Text>);
          });
          setHeading(headingNames);
        }}
        columnNames={modifyTable ? heading : undefined}
        columnNo={modifyTable ? heading.length : undefined}
      />
    </>
  );
};

export default ProductSpec;
