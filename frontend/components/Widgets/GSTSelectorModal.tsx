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
import { useContext, useEffect, useState } from "react";
import { GSTSelectorContext } from "../../context/GSTSelectorContext";
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
  const { selectedRows } = useContext(GSTSelectorContext);
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
        variant={selectedRows ? "secondarySolid" : "primarySolid"}
        size="lg"
        borderRadius="sm"
        onClick={() => setOpen(true)}
        {...props}
      >
        Select{selectedRows && "ed"} GST Rates
      </Button>
      <Modal isOpen={open} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader fontWeight="bold" fontSize="2xl" color="gray.700">
            Select GST Rates
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GSTSelector GSTData={gstData} mb="3rem" />
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
