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
  title: string;
  buttonName: string;
  rowPlaceholder?: string[];
  cb?: (_: string[]) => void;
}> = ({ title, cb, buttonName, rowPlaceholder }) => {
  const [tableContentLocal, setTableContentLocal] = useState<string[]>([]);
  const { colNo, addRowModal } = useContext(TableModalContext);
  const [columnNo] = colNo;
  const [openAddRowModal, setOpenAddRowModal] = addRowModal;

  const onClose = () => {
    setOpenAddRowModal(!openAddRowModal);
    if (cb && tableContentLocal.length !== 0) cb(tableContentLocal);
  };

  const DisplayRowInputElements = (column: number): any[] => {
    if (column <= 0) return [];
    return [
      ...DisplayRowInputElements(column - 1),
      <RowInputElement
        column={column}
        placeholder={
          !!rowPlaceholder ? rowPlaceholder[column - 1] : `Row ${column}`
        }
      />,
    ];
  };

  const RowInputElement: React.FC<{ column: number; placeholder: string }> = ({
    column,
    placeholder,
  }): JSX.Element => (
    <Input
      key={column}
      placeholder={placeholder}
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
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>{DisplayRowInputElements(columnNo)}</HStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="blueSolid" size="md" onClick={onClose}>
            {buttonName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRowModal;
