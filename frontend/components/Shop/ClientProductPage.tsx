import React, { useEffect, useState } from "react";
import {
  HStack,
  Button,
  Input,
  Container,
  Box,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import constants from "../../util/Constants";
import axios from "axios";
import { OptionsData } from "../../types/shop";

const OptionButtons: React.FC<{
  optionValues: { id: number; value: string }[];
  selectedOption: number;
  selected?: (indx: number) => void;
}> = ({ optionValues, selectedOption, selected }) => (
  <>
    {optionValues.map((optionValue, indx) => (
      <Button
        {...(optionValue.id !== selectedOption
          ? { colorScheme: "whiteAlpha", textColor: "black" }
          : { variant: "pinkSolid" })}
        fontFamily="Sora"
        borderRadius="full"
        width="9em"
        boxShadow="0.01em 0.1em 0.1em 0.1em #e1e1e1"
        left={`${indx + 2}em`}
        onClick={() => {
          if (selected) selected(optionValue.id);
        }}
      >
        {optionValue.value}
      </Button>
    ))}
  </>
);

const fetchOptions = async (product: any): Promise<OptionsData> =>
  new Promise((resolve) => {
    axios
      .post(`${constants.url}/shop/getoptions/`, {
        product_id: product.product_id,
      })
      .then((res) => {
        resolve(res.data.options);
      })
      .catch((err) => {
        console.error(err);
      });
  });

const ClientProductPage: React.FC<{ product: any }> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [colorOptionIndx, setColorOptionIndx] = useState<{
    [optionId: number]: number;
  }>({});
  const [fetchedOptions, setFetchedOptions] = useState<OptionsData>([]);

  useEffect(() => {
    if (product) {
      fetchOptions(product).then((optionData) => setFetchedOptions(optionData));
      setLoading(false);
    } else setLoading(true);
  }, [product]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box margin="4em 5em">
          <Container
            boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
            float="left"
            borderRadius="2xl"
            height="initial"
            width="50em"
            padding="2em"
          >
            <Image
              objectFit="scale-down"
              src={`${constants.url?.substring(
                0,
                constants?.url.lastIndexOf("/")
              )}${product.image}`}
              width="50em"
              height="40em"
            />
          </Container>
          <Container float="left" marginLeft="10em">
            <Text fontWeight="semibold" fontSize="2.7em">
              {product.name}
            </Text>
            <Text
              fontWeight="regular"
              fontSize="1em"
              marginTop="2em"
              lineHeight="1.7em"
            >
              {product.description}
            </Text>

            <HStack
              marginTop="2em"
              color="secondaryBlue.200"
              fontWeight="semibold"
              position="relative"
            >
              <Text fontSize="1.2em" marginTop="0.7em">
                ₹
              </Text>
              <Text fontSize="2em" fontWeight="600">
                {product.price}
              </Text>
            </HStack>
            <HStack width="27em" marginTop="2em">
              <Text width="7em" fontWeight="semibold">
                Quantity :
              </Text>
              <Input
                type="number"
                borderRadius="sm"
                boxShadow="0.05em 0.05em 0.05em 0.05em #e1e1e1"
                defaultValue={1}
              />
            </HStack>
            <Box marginTop="3em" width="inherit">
              {fetchedOptions.map((option) => (
                <HStack marginTop="1.5em">
                  <Text fontWeight="semibold" fontSize="1.1em">
                    {option.name} :
                  </Text>
                  <OptionButtons
                    optionValues={option.values}
                    selectedOption={
                      colorOptionIndx[option.id] || option.values[0].id
                    }
                    selected={(indx: number) => {
                      setColorOptionIndx({
                        ...colorOptionIndx,
                        [option.id]: indx,
                      });
                    }}
                  />
                </HStack>
              ))}
            </Box>
            <HStack marginTop="7em">
              <Button
                variant="blueSolid"
                width="10em"
                borderRadius="3"
                padding="1.4em 2em"
              >
                Buy Now
              </Button>
              <Button variant="blueOutline" width="10em" left="1em">
                Add To Cart
              </Button>
            </HStack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ClientProductPage;
