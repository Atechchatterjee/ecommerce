import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface ConfirmationModalProps {
  open: boolean;
  setOpen: Function | Dispatch<SetStateAction<boolean>>;
  modalTitle?: string;
  modalBody?: any;
  buttonText?: string;
  children?: any;
  confirmCb?: Function;
}

const ConfirmationModal = ({
  buttonText,
  modalTitle,
  modalBody,
  open,
  setOpen,
  confirmCb,
  children,
}: ConfirmationModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal onClose={handleClose} isOpen={open}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle || "Confirm"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                if (confirmCb) confirmCb();
                handleClose();
              }}
            >
              {buttonText || "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </>
  );
};

export default ConfirmationModal;
