import { CheckIcon } from "@chakra-ui/icons";
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

const CustomTableModal: React.FC<{ cb?: Function }> = ({ cb }) => {
  const {
    confirmColumn,
    setConfirmColumn,
    triggerOpen,
    setTriggerOpen,
    columnNames,
    columnNo,
    setColumnNames,
    setColumnNo,
  } = useContext(TableModalContext);

  const onClose = () => {
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
                value={columnNo}
                onChange={(e) => {
                  if (setConfirmColumn) setConfirmColumn(false);
                  if (setColumnNo) setColumnNo(parseInt(e.target.value));
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
                if (setConfirmColumn) setConfirmColumn(true);
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
                    placeholder={
                      Object.keys(columnNames).length !== 0
                        ? columnNames[columns]
                        : `Column Name ${columns}`
                    }
                    width="23.8em"
                    marginTop="1em"
                    onChange={(e) => {
                      let copyColumnNames = columnNames;
                      copyColumnNames[columns] = e.target.value;
                      if (setColumnNames) setColumnNames(copyColumnNames);
                    }}
                  />
                );
                return [...EnterColumns(columns - 1), El];
              })(columnNo || 0)}
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

export default CustomTableModal;
