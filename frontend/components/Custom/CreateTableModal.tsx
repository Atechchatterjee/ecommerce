import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Input,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { TableModalContext } from "../../context/TableModalContext";

const CreateTableModal: React.FC<{ cb?: Function }> = ({ cb }) => {
  const {
    confirmColumn,
    setConfirmColumn,
    openCreateTableModal: triggerOpen,
    setOpenCreateTableModal: setTriggerOpen,
    columnNames,
    columnNo,
    setColumnNames,
    setColumnNo,
  } = useContext(TableModalContext);

  const onClose = () => {
    setTriggerOpen(!triggerOpen);
    if (cb) cb(columnNames);
  };

  const ColumnNameInput: React.FC<{ column: number }> = ({ column }) => {
    return (
      <HStack position="relative" key={column}>
        <Input
          placeholder={
            Object.keys(columnNames).length !== 0
              ? columnNames[column]
              : `Column Name ${column}`
          }
          width="21em"
          marginTop="1em"
          onChange={(e) => {
            let copyColumnNames = columnNames;
            copyColumnNames[column] = e.target.value;
            if (setColumnNames) setColumnNames(copyColumnNames);
          }}
        />
        <IconButton
          right="0.8em"
          top="1em"
          position="absolute"
          variant="blueSolid"
          aria-label="delete"
          size="md"
          icon={<DeleteIcon />}
          onClick={() => {
            let copyColumnNames: any = {};
            let i = parseInt(Object.keys(columnNames)[0]);
            Object.keys(columnNames).forEach((elKey: any, indx) => {
              console.log({ i });
              if (indx + 1 !== column) {
                copyColumnNames[i] = columnNames[elKey];
                i++;
              }
            });
            if (setColumnNames) setColumnNames(copyColumnNames);
            setColumnNo(columnNo - 1);
          }}
        />
      </HStack>
    );
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
                width="21em"
                placeholder={
                  Object.keys(columnNames).length !== 0
                    ? columnNo.toString()
                    : "Number of Columns"
                }
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
              {(function EnterColumns(column: number): any[] {
                if (column <= 0) return [];
                const El = <ColumnNameInput column={column} />;
                return [...EnterColumns(column - 1), El];
              })(columnNo)}
            </>
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="pinkSolid" mr={3} onClick={onClose}>
            create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTableModal;
