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

  const RowInputElement: React.FC<{ column: number }> = ({
    column,
  }): JSX.Element => (
    <Input
      key={column}
      placeholder={`Row ${column}`}
      width="23.8em"
      onChange={(e) => {
        let tableContentLocalCopy = tableContentLocal;
        tableContentLocal[column] = e.target.value;
        setTableContentLocal(tableContentLocalCopy);
      }}
    />
  );

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
            {(function DisplayRowInputElements(column: number): any[] {
              if (column <= 0) return [];
              return [
                ...DisplayRowInputElements(column - 1),
                <RowInputElement column={column} />,
              ];
            })(columnNo)}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="blueSolid"
            size="md"
            onClick={onClose}
            onClickCapture={() => {
              let arr = Object.keys(tableContentLocal).map(
                (key) => tableContentLocal[key]
              );
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
