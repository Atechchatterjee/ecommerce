import React, { useEffect, useState, useContext } from "react";
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
import { ProductInfoContext } from "../../context/ProductInfoContext";
import ImageGallery from "./Product/ImageGallery";
import CustomContainer from "../Custom/CustomContainer";

const OptionButtons: React.FC<{
  optionValues: { id: number; value: string }[];
  selectedOption: number;
  selected?: (indx: number) => void;
}> = ({ optionValues, selectedOption, selected }) => (
  <Box>
    {optionValues.map((optionValue, indx) => (
      <Button
        key={indx}
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
  </Box>
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

const addProductToCart = async (quantity: number, productId: number) => {
  return new Promise((resolve) => {
    axios
      .post(
        `${constants.url}/shop/add-to-cart/`,
        {
          product_id: productId,
          quantity,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
  });
};

const checkIfInCart = async (productId: number) => {
  return new Promise((resolve) => {
    axios
      .post(
        `${constants.url}/shop/product-exists-in-cart/`,
        {
          product_id: productId,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
  });
};

const ClientProductPage: React.FC<{ product?: any }> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [colorOptionIndx, setColorOptionIndx] = useState<{
    [optionId: number]: number;
  }>({});
  const [fetchedOptions, setFetchedOptions] = useState<OptionsData>([]);
  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;
  const [quantity, setQuantity] = useState<number>(1);
  const [productExistsInCart, setProductExistsInCart] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    if (product) {
      fetchOptions(product).then((optionData) => {
        console.log({ optionData });
        setFetchedOptions(optionData);
      });
      setLoading(false);
    } else setLoading(true);
  }, [product]);

  useEffect(() => {
    console.log({ fetchedOptions });
  }, [fetchedOptions]);

  useEffect(() => {
    checkIfInCart(product.id)
      .then(() => setProductExistsInCart(true))
      .catch(() => setProductExistsInCart(false));
  }, []);

  const handleAddToCart = () => {
    addProductToCart(quantity, product.id);
    setTimeout(() => setProductExistsInCart(true), 200);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box margin="4em 5em">
          <Box float="left" marginBottom="3em" className="product-images">
            <CustomContainer
              borderRadius="2xl"
              height="initial"
              width="50em"
              padding="2em"
              interactive
            >
              <Image
                objectFit="scale-down"
                src={`${constants.url?.substring(
                  0,
                  constants?.url.lastIndexOf("/")
                )}${product.image[selectedImage].image}`}
                width="50em"
                height="40em"
              />
            </CustomContainer>
            <ImageGallery
              width="50em"
              selectCb={(indx) => {
                setSelectedImage(indx);
              }}
            />
          </Box>
          <Container
            float="left"
            marginLeft="10em"
            className="product-description"
          >
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
              color="secondaryBlue.900"
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
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </HStack>
            <Box marginTop="3em" width="inherit" className="options-area">
              {fetchedOptions.map((option, indx) => (
                <HStack marginTop="1.5em" key={indx}>
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
              <Button
                variant="blueOutline"
                width="10em"
                left="1em"
                onClick={handleAddToCart}
                disabled={productExistsInCart}
              >
                {productExistsInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
            </HStack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ClientProductPage;
