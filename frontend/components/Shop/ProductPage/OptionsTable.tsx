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
  Text,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import constants from "../../../util/Constants";
import axios from "axios";
import { OptionsData } from "../../../types/shop";
import CustomContainer from "../../Custom/CustomContainer";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import { CustomField } from "../../Custom/CustomField";

const DisplayFetchedOptions: React.FC<{ fetchedOptions: any[] }> = ({
  fetchedOptions,
}) => (
  <Container marginTop="2em" marginLeft="-1em" width="50em">
    {fetchedOptions.map((option: any, indx) => (
      <CustomContainer
        key={indx}
        padding="1.8em"
        marginTop="1em"
        borderRadius="lg"
        overflowX="scroll"
        interactive
        sx={scrollBarStyle()}
        cursor="pointer"
      >
        <HStack>
          <Text marginRight="1em" fontWeight="semibold">
            {option.name} :
          </Text>
          {option.values.map((value: any, indx: any) => (
            <Button
              key={indx}
              variant="secondarySolid"
              marginLeft="2em"
              borderRadius="full"
              padding="0.7em 2em"
            >
              <Text fontSize="sm" fontWeight="semibold">
                {value.value}
              </Text>
            </Button>
          ))}
        </HStack>
      </CustomContainer>
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
  const [fetchedOptions, setFetchedOptions] = useState<OptionsData>();

  const fetchOptions = () => {
    axios
      .post(`${constants.url}/shop/getoptions/`, {
        product_id: product.id,
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
          product_id: product.id,
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
              <CustomField
                placeholder="Option"
                marginTop="1.5em"
                borderRadius="3"
                float="left"
                width="90%"
                value={currentOptionName}
                onChange={(e: any) => setCurrentOptionName(e.target.value)}
              />
              <Button
                variant="primarySolid"
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
                })(noOfOptionValues)
              ) : (
                <></>
              )}
            </Box>
          </ModalBody>

          <ModalFooter position="relative" padding="3em">
            {optionValues.length > 0 ? (
              <Button
                variant="primarySolid"
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
          height="inherit"
          padding="0em 0em 2em 0em"
          borderRadius="lg"
          marginBottom="2em"
        >
          {/* {optionValues.length > 0 ? (
            <Text fontSize="1.5em" fontWeight="semibold">
              Options
            </Text>
          ) : (
            <></>
          )} */}
          <DisplayFetchedOptions fetchedOptions={fetchedOptions} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default OptionsTable;
