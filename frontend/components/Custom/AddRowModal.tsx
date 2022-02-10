import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TableModalContext } from "../../context/TableModalContext";

const AddRowModal: React.FC<{
  cb?: (_: string[]) => void;
}> = ({ cb }) => {
  const [tableContentLocal, setTableContentLocal] = useState<string[]>([]);
  const { colNo, addRowModal, modifyTable } = useContext(TableModalContext);
  const [columnNo] = colNo;
  const [openAddRowModal, setOpenAddRowModal] = addRowModal;
  const [modifyAddRowModal] = modifyTable;

  const onClose = () => {
    setOpenAddRowModal(!openAddRowModal);
    if (cb) cb(tableContentLocal);
  };

  const DisplayRowInputElements = (column: number): any[] => {
    if (column <= 0) return [];
    return [
      ...DisplayRowInputElements(column - 1),
      <RowInputElement column={column} />,
    ];
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
        tableContentLocal[column - 1] = e.target.value;
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
        <ModalHeader>
          {modifyAddRowModal ? "Modify a Row" : "Add a Row"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>{DisplayRowInputElements(columnNo)}</HStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="blueSolid" size="md" onClick={onClose}>
            {modifyAddRowModal ? "Modify" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRowModal;
