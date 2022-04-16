import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { CustomField } from "../../Custom/CustomField";
import { saveOptions } from "../../../services/OptionsService";

const OptionModal: React.FC<{
  product: any;
  triggerOpen: [isOpen: boolean, setIsOpen: (_: boolean) => void];
  simple?: boolean;
}> = ({ children, product, triggerOpen: [isOpen, setIsOpen], simple }) => {
  const [currentOptionName, setCurrentOptionName] = useState<string>("");
  const [noOfOptionValues, setNoOfOptionValues] = useState<number>(1);
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const [displayOptionInputs, setDisplayOptionInputs] =
    useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    saveOptions(product.id, optionValues, currentOptionName).then(() => {
      setOptionValues([]);
      setCurrentOptionName("");
      setDisplayOptionInputs(false);
      setNoOfOptionValues(1);
    });
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="1.2em" fontWeight="semibold">
              Add an option
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" marginTop="0.5rem">
              <CustomField
                placeholder="Enter Option Name"
                borderRadius="3"
                float="left"
                size="md"
                width="85%"
                value={currentOptionName}
                onChange={(e: any) => setCurrentOptionName(e.target.value)}
              />
              <Button
                variant="primarySolid"
                height="2.45rem"
                size="md"
                borderRadius="3"
                float="left"
                marginLeft="0.8em"
                onClick={() => {
                  setDisplayOptionInputs(true);
                }}
              >
                <FaCheck />
              </Button>
              {displayOptionInputs &&
                (function OptionValueInputs(no): any[] {
                  if (no <= 0) return [];
                  const input = (
                    <CustomField
                      key={no}
                      width="90%"
                      marginTop="1em"
                      value={optionValues[no - 1]}
                      onBlur={(e: any) => {
                        if (e.target.value !== "") {
                          setOptionValues([...optionValues, e.target.value]);
                          setNoOfOptionValues(no + 1);
                        }
                      }}
                      placeholder={`Option Value ${no}`}
                      borderRadius="3"
                    />
                  );
                  return [...OptionValueInputs(no - 1), input];
                })(noOfOptionValues)}
            </Box>
          </ModalBody>

          <ModalFooter position="relative" padding="3em">
            {optionValues.length > 0 && (
              <Button
                variant="primarySolid"
                position="absolute"
                left="1.8em"
                padding="1.3em 2em"
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </>
  );
};

export default OptionModal;
