import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import constants from "../../util/Constants";
import CustomTable from "../Custom/CustomTable";
import { MdDelete } from "react-icons/md";
import { CustomField } from "../Custom/CustomField";
import { IoIosArrowBack } from "react-icons/io";
import { createImageUrl } from "../../util/CreateImageUrl";

const getCartItems = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    axios
      .get(`${constants.url}/shop/get-products-from-cart/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.cart_items);
        resolve(res.data.cart_items);
      })
      .catch((err) => console.error(err));
  });
};

const deleteItemsFromCart = async (productIds: number[]) =>
  new Promise((resolve) => {
    axios
      .post(
        `${constants.url}/shop/delete-cart-items/`,
        {
          product_ids: productIds,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
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

interface CartProps {
  proceed?: () => void;
}

const Cart: React.FC<CartProps> = ({ proceed }) => {
  const [cartItems, setCartItems] = useState<any[][]>([]);
  const heading = ["Image", "product name", "price", "quantity", "total price"];
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [reRender, setReRender] = useState<boolean>(false);

  const finalPriceColumn = (finalPriceCalc: number) =>
    new Array(heading.length + 1).fill("").map((_, indx) =>
      indx < heading.length ? (
        indx < heading.length - 1 ? (
          ""
        ) : (
          <Text fontWeight="semibold" isTruncated>
            final price :
          </Text>
        )
      ) : (
        <Text fontWeight="semibold" textColor="primary.900">
          {finalPriceCalc}
        </Text>
      )
    );

  const fillCartItems = (items: any[], finalPriceCalc: number) => {
    setCartItems([
      ...items.map((item, indx) => {
        finalPriceCalc += parseInt(item.total_price);
        return [
          <Text key={`${indx}0`}>{item.product_id}</Text>,
          <Image
            key={`${indx}0`}
            src={createImageUrl(item.images[0].image, undefined)}
            backgroundColor="white"
            padding="2%"
            borderRadius="lg"
            opacity="0.8"
            w="20"
            h="20"
            objectFit="contain"
          />,
          <Text key={`${indx}1`} isTruncated>
            {item.name}
          </Text>,
          <Text key={`${indx}2`}>{item.price}</Text>,
          <CustomField
            value={quantities[item.product_id]}
            key={`${indx}3`}
            size="md"
            width="5em"
            type="number"
            placeholder={item.quantity}
            borderColor="gray.400"
            _hover={{ borderColor: "gray.300" }}
            onChange={(e: any) => {
              setQuantities({
                ...quantities,
                [item.product_id]: parseInt(e.target.value),
              });
            }}
            onBlur={(e: any) => {
              if (e.target.value === "") return;
              addProductToCart(parseInt(e.target.value), item.product_id);
              setReRender(true);
              setQuantities({});
            }}
          />,
          <Text key={`${indx}4`} color="primarySolid.200" fontWeight="semibold">
            {item.total_price}
          </Text>,
        ];
      }),
      finalPriceColumn(finalPriceCalc),
    ]);
  };

  useEffect(() => {
    getCartItems().then((items) => {
      let finalPriceCalc = 0;
      fillCartItems(items, finalPriceCalc);
      setReRender(false);
    });
  }, [reRender]);

  const handleDelete = () => {
    deleteItemsFromCart(
      Object.keys(selectedItems).map((key) =>
        selectedItems[key] ? parseInt(key) : -1
      )
    ).then(() => {
      setReRender(true);
    });
  };

  return (
    <Grid
      padding="1% 2% 0 2%"
      templateRows="repeat(20, 1fr)"
      templateColumns="repeat(20, 1fr)"
      gap="9"
    >
      <GridItem rowSpan={20} colSpan={20}>
        <CustomTable
          width="95%"
          rows={cartItems}
          heading={heading}
          interactive
          select
          selectedRowsState={[selectedItems, setSelectedItems]}
          excludeSelectForRows={[cartItems.length - 1]}
          variant="unstyled"
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={16} textAlign="left">
        <Box>
          <Button
            variant="primaryOutline"
            borderRadius="full"
            backgroundColor={`rgba(255,255,255, 0.1)`}
            onClick={() => window.location.assign("/shop")}
          >
            <Flex flexDirection="row" gridGap={1.5}>
              <IoIosArrowBack size={20} />
              <Text flex="1">Back</Text>
            </Flex>
          </Button>
        </Box>
      </GridItem>

      <GridItem rowSpan={1} colSpan={4} textAlign="right">
        <Flex flexDirection="row" gridGap="2" width="full">
          <Button
            flex="0.2"
            variant="secondarySolid"
            borderRadius="md"
            onClick={handleDelete}
          >
            <MdDelete size="20" />
          </Button>
          <Button
            flex="1"
            marginLeft="1em"
            variant="primarySolid"
            onClick={() => proceed && proceed()}
          >
            Proceed
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Cart;
