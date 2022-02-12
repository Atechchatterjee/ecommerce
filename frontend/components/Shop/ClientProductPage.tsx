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

const OptionButtons: React.FC<{
  optionValues: string[];
  selectedOption: number;
  selected?: (indx: number) => void;
}> = ({ optionValues, selectedOption, selected }) => (
  <>
    {optionValues.map((optionValue, indx) => (
      <Button
        {...(indx !== selectedOption
          ? { colorScheme: "whiteAlpha", textColor: "black" }
          : { variant: "pinkSolid" })}
        fontFamily="Sora"
        borderRadius="full"
        width="9em"
        boxShadow="0.01em 0.1em 0.1em 0.1em #e1e1e1"
        left={`${indx + 2}`}
        onClick={() => {
          if (selected) selected(indx);
        }}
      >
        {optionValue}
      </Button>
    ))}
  </>
);

const ClientProductPage: React.FC<{ product: any }> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [colorOption, setColorOption] = useState<string[]>([
    "Black",
    "Blue",
    "Red",
  ]);
  const [colorOptionIndx, setColorOptionIndx] = useState<number>(0);

  useEffect(() => {
    if (product) setLoading(false);
    else setLoading(true);
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
            <HStack marginTop="2em" width="full">
              <Text fontWeight="semibold">Colors :</Text>
              <OptionButtons
                optionValues={colorOption}
                selectedOption={colorOptionIndx}
                selected={(indx: number) => {
                  setColorOptionIndx(indx);
                }}
              />
            </HStack>
            <HStack marginTop="7em">
              <Button variant="blueOutline" width="10em">
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
