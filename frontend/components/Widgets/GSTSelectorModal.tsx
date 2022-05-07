import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchGST } from "../../services/GSTService";
import GSTSelector from "./GSTSelector";

interface GSTSelectorModalProps extends ButtonProps {
  buttonText?: string;
  selectCb?: Function;
}

const GSTSelectorModal = ({
  selectCb,
  buttonText,
  ...props
}: GSTSelectorModalProps) => {
  const [gstData, setGstData] = useState<any>();
  const [selectedRow, setSelectedRow] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGST().then((res) => {
      setGstData(res.data);
    });
  }, []);

  const onClose = () => setOpen(!open);

  return (
    <>
      <Button
        variant={selectedRow ? "secondarySolid" : "primarySolid"}
        size="lg"
        borderRadius="sm"
        onClick={() => setOpen(true)}
        {...props}
      >
        Select{selectedRow && "ed"} GST Rates
      </Button>
      <Modal isOpen={open} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader fontWeight="bold" fontSize="2xl" color="gray.700">
            Select GST Rates
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GSTSelector
              GSTData={gstData}
              mb="3rem"
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="primarySolid" onClick={() => setOpen(false)}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GSTSelectorModal;
