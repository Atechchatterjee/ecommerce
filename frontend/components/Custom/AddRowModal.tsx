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
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TableModalContext } from "../../context/TableModalContext";
import { CustomField } from "./CustomField";

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
        key={column}
        column={column}
        placeholder={
          !!rowPlaceholder ? rowPlaceholder[column - 1] : `Row ${column}`
        }
      />,
    ];
  };

  const RowInputElement: React.FC<{
    key: number;
    column: number;
    placeholder: string;
  }> = ({ key, column, placeholder }): JSX.Element => (
    <CustomField
      flex="2"
      key={key}
      placeholder={placeholder}
      width="100%"
      position="relative"
      onChange={(e: any) => {
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
          <Flex flexDirection="row" gridGap={3} width="100%">
            {DisplayRowInputElements(columnNo)}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="primarySolid" size="md" onClick={onClose}>
            {buttonName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRowModal;
