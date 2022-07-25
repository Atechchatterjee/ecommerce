import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomField } from "../Custom/CustomField";

const ApprovalModal = ({
  isOpen: open,
  onClose: closeCb,
  onApproval,
}: {
  isOpen: boolean;
  onClose?: Function;
  onApproval?: (shippingCharge: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [shippingCharge, setShippingCharge] = useState<string>("");

  const onClose = () => {
    setIsOpen(false);
    if (closeCb) closeCb();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Query Approval</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="row" gridGap="1rem" w="100%">
            <CustomField
              label="shipping charges"
              type="number"
              w="100%"
              leftIcon="₹"
              onChange={(e: any) => setShippingCharge(e.target.value)}
              autoFocus
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primarySolid"
            onClick={() => {
              onClose();
              if (onApproval) onApproval(shippingCharge);
            }}
          >
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApprovalModal;
