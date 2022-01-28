import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TableModalContext } from "../../context/TableModalContext";

const AddRowModal: React.FC<{ cb?: Function }> = ({ cb }) => {
  const [tableContentLocal, setTableContentLocal] = useState<any>({});
  const {
    openAddRowModal,
    setOpenAddRowModal,
    columnNames,
    columnNo,
    tableContentStr,
    setTableContentStr,
  } = useContext(TableModalContext);

  const onClose = () => {
    setOpenAddRowModal(!openAddRowModal);
    if (cb) cb(columnNames);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={openAddRowModal}
      onClose={() => setOpenAddRowModal(!openAddRowModal)}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Row</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack marginTop="1em">
            {(function EnterColumns(columns: number): any[] {
              if (columns <= 0) return [];
              const El = (
                <Input
                  key={columns}
                  placeholder={`Row ${columns}`}
                  width="23.8em"
                  onChange={(e) => {
                    let tableContentLocalCopy = tableContentLocal;
                    tableContentLocal[columns] = e.target.value;
                    setTableContentLocal(tableContentLocalCopy);
                  }}
                />
              );
              return [...EnterColumns(columns - 1), El];
            })(columnNo)}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="blueSolid"
            size="md"
            onClick={onClose}
            onClickCapture={() => {
              let arr: any[] = [];
              Object.keys(tableContentLocal).forEach((elKey) => {
                arr.push(tableContentLocal[elKey]);
              });
              if (setTableContentStr && tableContentStr)
                setTableContentStr([...tableContentStr, arr]);
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRowModal;
