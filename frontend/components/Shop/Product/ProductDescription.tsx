import {
  Container,
  Box,
  Tag,
  Text,
  ContainerProps,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { ProductInfoContext } from "../../../context/ProductInfoContext";

const NormalMode = ({ ...props }: ContainerProps) => {
  const { admin } = useContext(UserContext);

  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;

  return (
    <Container width="full" height="initial" padding="1em" {...props}>
      <Flex flexDirection="column">
        <Text
          fontFamily="Sora"
          overflow="hidden"
          flexWrap="nowrap"
          fontWeight="semibold"
          color="primary.900"
          fontSize="1.4em"
          cursor="pointer"
          _hover={{ color: "secondary.200" }}
          onClick={() => {
            if (admin && window.location.href.includes("/admin"))
              window.location.assign(
                `/admin/catalogs/all-products/${product.id}`
              );
            else window.location.assign(`/shop/${product.id}`);
          }}
          transition="all ease-in-out 0.2s"
        >
          {product.name}
        </Text>
        <br />
        <Box height="9em">
          <Text color="#2c2c2c" height="inherit" noOfLines={5} lineHeight="7">
            {product.description}
          </Text>
        </Box>
        <Tag
          size="md"
          bgColor="secondary.200"
          textColor="white"
          position="absolute"
          right="1em"
          bottom="1em"
        >
          <Text fontWeight="bold">₹{product.price[0]?.price}</Text>
        </Tag>
      </Flex>
    </Container>
  );
};

const ProductDescription = ({ ...props }: ContainerProps) => {
  const { productInfo } = useContext(ProductInfoContext);
  const [product] = productInfo;
  return <NormalMode {...props} />;
};

export default ProductDescription;
