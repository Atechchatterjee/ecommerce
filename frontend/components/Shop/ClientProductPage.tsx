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
  Grid,
  Flex,
} from "@chakra-ui/react";
import constants from "../../util/Constants";
import axios from "axios";
import { OptionsData } from "../../types/shop";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import ImageGallery from "./Product/ImageGallery";
import CustomContainer from "../Custom/CustomContainer";
import { useDynamicColumns } from "../../hooks/useDynamicColumns";
import { CustomField } from "../Custom/CustomField";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { SpecTableContext } from "../../context/SpecTableContext";
import SpecificationTable from "./ProductPage/SpecificationTable";
import OptionsModal from "./ProductPage/OptionsModal";
import { isAuthenticated } from "../../util/Authenticated";

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
          : { variant: "secondarySolid" })}
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
  const [columns] = useDynamicColumns(2, [1200]);
  const [width] = useWindowDimensions();
  const [addToCardLoader, setAddToCartLoader] = useState<boolean>(false);
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [isOpenOptionModal, setIsOpenOptionModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text fontWeight="semibold" key={specTableHeading.length + 1}>
          Specification
        </Text>,
        <Text fontWeight="semibold" key={specTableHeading.length + 2}>
          Details
        </Text>,
      ]);
  };

  useEffect(() => {
    if (product) {
      fetchOptions(product).then((optionData) => {
        console.log({ optionData });
        setFetchedOptions(optionData);
      });
      setLoading(false);
      createTableHeading();
      setTableExists(true);
    } else setLoading(true);
  }, [product]);

  useEffect(() => {
    console.log({ fetchedOptions });
  }, [fetchedOptions]);

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        checkIfInCart(product.id)
          .then(() => setProductExistsInCart(true))
          .catch(() => setProductExistsInCart(false));
        setAuthenticated(true);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const handleAddToCart = () => {
    if (!authenticated) window.location.assign("/login");
    else {
      setAddToCartLoader(true);
      addProductToCart(quantity, product.id);
      setTimeout(() => {
        setProductExistsInCart(true);
        setAddToCartLoader(false);
      }, 200);
    }
  };

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          padding="6rem 3rem"
          templateColumns={`repeat(${columns}, 1fr)`}
          templateRows={`repeat(1, 2fr)`}
          gap={20}
        >
          <Box marginBottom="3em" w="100%">
            <CustomContainer
              borderRadius="2xl"
              w="100%"
              h="100%"
              maxH="38em"
              padding="5%"
              position="relative"
              interactive
              transition="all ease-in-out 0.5s"
            >
              <Box position="relative" height="100vh">
                {product.image.map((curImg, indx) => (
                  <Image
                    position="absolute"
                    key={indx}
                    objectFit="contain"
                    src={`${constants.url?.substring(
                      0,
                      constants?.url.lastIndexOf("/")
                    )}${curImg.image}
                    `}
                    opacity={
                      curImg.image === product.image[selectedImage].image
                        ? 1
                        : 0
                    }
                    width="90%"
                    height="30em"
                    transition="all ease-in-out 0.5s"
                  />
                ))}
              </Box>
            </CustomContainer>
            <ImageGallery
              width="90%"
              selectCb={(indx) => {
                setSelectedImage(indx);
              }}
            />
          </Box>
          <Container
            className="product-description"
            padding={width > 1000 ? "0 10% 5% 0%" : "0 10% 5% 10%"}
          >
            <Text fontWeight="semibold" fontSize="250%">
              {product.name}
            </Text>
            <Text fontSize="100%" marginTop="2em" lineHeight="190%">
              {product.description}
            </Text>

            <Flex
              marginTop="2em"
              flexDirection="row"
              color="primary.900"
              gridGap={2}
              fontWeight="semibold"
              position="relative"
            >
              <Flex flexDirection="row" gridGap={2}>
                <Text fontSize="16" mt="0.9rem">
                  ₹
                </Text>
                <Text fontSize="2em" fontWeight="600">
                  {product.price}
                </Text>
              </Flex>
              {product.unit && (
                <Text justifyItems="center" mt="0.9rem" fontWeight="medium">
                  per {product.unit.value}
                </Text>
              )}
            </Flex>
            <HStack width="80%" marginTop="2em">
              <Text width="30%" fontWeight="semibold" isTruncated>
                Quantity :
              </Text>
              <CustomField
                type="number"
                variant="outline"
                borderRadius="sm"
                boxShadow="rgba(149, 157, 165, 0.2) 0px 0px 7px"
                borderColor="white"
                defaultValue={1}
                onChange={(e: any) => setQuantity(parseInt(e.target.value))}
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
            <OptionsModal
              product={product}
              triggerOpen={[isOpenOptionModal, setIsOpenOptionModal]}
              simple
            />
            <HStack marginTop="5%">
              <Button
                variant="primarySolid"
                width="10em"
                borderRadius="3"
                padding="1.4em 2em"
              >
                Buy Now
              </Button>
              <Button
                variant="primaryOutline"
                width="10em"
                left="1em"
                onClick={handleAddToCart}
                disabled={productExistsInCart}
                isLoading={addToCardLoader}
              >
                <Text isTruncated>
                  {productExistsInCart ? "Added to Cart" : "Add to Cart"}
                </Text>
              </Button>
            </HStack>
          </Container>
          <Box marginBottom="5%" width="80%" marginLeft="10%">
            <SpecTableContext.Provider
              value={{
                headings: [specTableHeading, setSpecTableHeading],
                tableExist: [tableExists, setTableExists],
                openRowModal: [openAddRowModal, setOpenAddRowModal],
                modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
              }}
            >
              <SpecificationTable readOnly />
            </SpecTableContext.Provider>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default ClientProductPage;
