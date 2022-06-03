import React, { useEffect, useState, useContext } from "react";
import {
  HStack,
  Spinner,
  Button,
  Container,
  Box,
  Image,
  Text,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { OptionsData } from "../../../types/shop";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { useDynamicColumns } from "../../../hooks/useDynamicColumns";
import { CustomField } from "../../Custom/CustomField";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { isAuthenticated } from "../../../util/Authenticated";
import { fetchOptions } from "../../../services/OptionsService";
import { checkIfInCart, addProductToCart } from "../../../services/CartService";
import ImageGallery from "../Product/ImageGallery";
import CustomContainer from "../../Custom/CustomContainer";
import ClientSpecificaitonTable from "./ClientSpecificationTable";
import { createImageUrl } from "../../../util/CreateImageUrl";

const ClientProductPage: React.FC<{ product?: any }> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchedOptions, setFetchedOptions] = useState<OptionsData>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentPrice, setCurrentPrice] = useState<any>();
  const [productExistsInCart, setProductExistsInCart] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [addToCardLoader, setAddToCartLoader] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  const [columns] = useDynamicColumns(2, [1200]);
  const [width] = useWindowDimensions();

  const getPriceInRange = (quantity: number) => {
    const price = product.price;
    let priceInRange = -1;
    for (const priceObj of price) {
      const [lowerRange, upperRange] = priceObj.range
        .split("-")
        .map((r: string) => parseInt(r.trim()));
      if (lowerRange <= quantity) {
        if (upperRange && upperRange >= quantity) return priceObj.price;
        priceInRange = priceObj.price;
      }
    }
    return priceInRange;
  };

  useEffect(() => {
    if (product) {
      fetchOptions(product).then((res) => setFetchedOptions(res.data.options));
      setLoading(false);
      setCurrentPrice(getPriceInRange(quantity));
    } else setLoading(true);
  }, [product]);

  useEffect(() => {
    setCurrentPrice(getPriceInRange(quantity));
  }, [quantity]);

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
              maxH="60vh"
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
                    src={createImageUrl(curImg.image, undefined)}
                    opacity={
                      curImg.image === product.image[selectedImage].image
                        ? 1
                        : 0
                    }
                    width="90%"
                    height="55vh"
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
            <Text
              fontWeight="semibold"
              fontSize={{ base: "1.5em", md: "2em", lg: "2.5em" }}
            >
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
                  {currentPrice === -1 ? <Spinner /> : currentPrice}
                </Text>
              </Flex>
              {product.unit && (
                <Text justifyItems="center" mt="0.9rem" fontWeight="medium">
                  per {product.unit.value}
                </Text>
              )}
            </Flex>
            <HStack width="100%" marginTop="2em">
              <Text
                width="40%"
                fontWeight="semibold"
                fontSize={{ base: "0.7em", md: "0.9em", lg: "1em" }}
              >
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
            <Flex marginTop="7vh" gridGap={5} flexWrap="inherit">
              <Button
                variant="primarySolid"
                width="100%"
                borderRadius="3"
                padding="1.4em 2em"
              >
                Buy Now
              </Button>
              <Button
                variant="primaryOutline"
                width="100%"
                onClick={handleAddToCart}
                disabled={productExistsInCart}
                isLoading={addToCardLoader}
              >
                <Text isTruncated>
                  {productExistsInCart ? "Added to Cart" : "Add to Cart"}
                </Text>
              </Button>
            </Flex>
          </Container>
          <ProductInfoContext.Provider
            value={{ productInfo: [product, () => {}] }}
          >
            <ClientSpecificaitonTable />
          </ProductInfoContext.Provider>
        </Grid>
      )}
    </Box>
  );
};

export default ClientProductPage;
