import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Operand,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import constants from "../../../util/Constants";
import axios from "axios";

const DisplayFetchedOptions: React.FC<{ fetchedOptions: any[] }> = ({
  fetchedOptions,
}) => (
  <Container marginTop="2em">
    {fetchedOptions.map((option: any) => (
      <HStack marginTop="1em">
        <Text marginRight="1em" fontWeight="semibold">
          {option.name} :
        </Text>
        {option.values.map((value: any) => (
          <Tag
            marginRight="2em"
            size="lg"
            bgColor="#F7F7F7"
            fontColor="black"
            borderRadius="full"
            padding="0.7em 2em"
            boxShadow="0.1em 0.1em 0.1em 0.1em #F0F0F0"
          >
            <Text fontSize="sm">{value.value}</Text>
          </Tag>
        ))}
      </HStack>
    ))}
  </Container>
);

const OptionsTable: React.FC<{
  product: any;
  triggerOpen: [isOpen: boolean, setIsOpen: (_: boolean) => void];
}> = ({ product, triggerOpen: [isOpen, setIsOpen] }) => {
  const [currentOptionName, setCurrentOptionName] = useState<string>("");
  const [noOfOptionValues, setNoOfOptionValues] = useState<number>(1);
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const [displayOptionInputs, setDisplayOptionInputs] =
    useState<boolean>(false);
  const [fetchedOptions, setFetchedOptions] = useState<any[]>();

  const fetchOptions = () => {
    axios
      .post(`${constants.url}/shop/getoptions/`, {
        product_id: product.product_id,
      })
      .then((res) => {
        console.log({ option_data: res.data.options });
        setFetchedOptions(res.data.options);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (product) fetchOptions();
  }, [product]);

  const saveOptions = () => {
    axios
      .post(
        `${constants.url}/shop/saveoptions/`,
        {
          product_id: product.product_id,
          optionValues,
          optionName: currentOptionName,
        },
        { withCredentials: true }
      )
      .then(() => {
        setOptionValues([]);
        setCurrentOptionName("");
        setDisplayOptionInputs(false);
        setNoOfOptionValues(1);
        fetchOptions();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="1.5em" fontWeight="medium">
              Add an option
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative">
              <Input
                placeholder="Option"
                marginTop="1.5em"
                borderRadius="3"
                float="left"
                width="90%"
                value={currentOptionName}
                onChange={(e) => setCurrentOptionName(e.target.value)}
              />
              <Button
                variant="blueSolid"
                size="sm"
                borderRadius="3"
                padding="1.38em 1em"
                float="left"
                marginTop="1.75em"
                marginLeft="0.5em"
                onClick={() => {
                  setDisplayOptionInputs(true);
                }}
              >
                <FaCheck />
              </Button>
              {displayOptionInputs ? (
                (function OptionValueInputs(no): any[] {
                  if (no <= 0) return [];
                  const input = (
                    <Input
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
                })(noOfOptionValues)
              ) : (
                <></>
              )}
            </Box>
          </ModalBody>

          <ModalFooter position="relative" padding="3em">
            {optionValues.length > 0 ? (
              <Button
                variant="blueSolid"
                position="absolute"
                left="1.8em"
                padding="1.3em 2em"
                onClick={() => {
                  saveOptions();
                  onClose();
                }}
              >
                Save
              </Button>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {fetchedOptions ? (
        <Container
          position="relative"
          boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
          height="inherit"
          padding="2em 2em 6em 2em"
          borderRadius="lg"
          marginBottom="2em"
        >
          <Text fontSize="1.5em" fontWeight="semibold">
            Options
          </Text>
          <DisplayFetchedOptions fetchedOptions={fetchedOptions} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default OptionsTable;
