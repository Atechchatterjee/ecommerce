import { useState, useEffect } from "react";
import { NextPage } from "next";
import WithAuth from "../util/WithAuth";
import { Input, Box, Button, Container, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import constants from "../util/Constants";
import CustomTable from "../components/Custom/CustomTable";
import { scrollBarStyle } from "../util/ScrollBarStyle";
import { MdDelete } from "react-icons/md";
import { CustomField } from "../components/Custom/CustomField";

const createImageUrl = (url: string, image: File | undefined): string =>
  image
    ? URL.createObjectURL(image)
    : `${constants.url?.substring(0, constants?.url.lastIndexOf("/"))}${url}`;

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

const Cart: NextPage = () => {
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

  return (
    <Box
      bgGradient="linear(to-b, primary.900, secondary.200)"
      width="100%"
      height="100vh"
      position="relative"
    >
      <Text
        fontSize="2.1em"
        fontWeight="semibold"
        color="white"
        textAlign="center"
        paddingTop="0.5em"
        fontFamily="Sora"
      >
        Cart Items
      </Text>
      <Container
        borderRadius="lg"
        textAlign="center"
        width="100%"
        maxWidth="75%"
        bgColor="white"
        height="85%"
        minHeight="50%"
        marginTop="1.5em"
        overflowX="scroll"
        sx={scrollBarStyle()}
        position="relative"
      >
        <CustomTable
          top="2em"
          width="95%"
          rows={cartItems}
          heading={heading}
          marginTop="1em"
          interactive
          select
          selectedRowsState={[selectedItems, setSelectedItems]}
          excludeSelectForRows={[cartItems.length - 1]}
        />
        <Box position="absolute" right="1em" bottom="1em">
          <Button
            variant="secondarySolid"
            onClick={() => {
              deleteItemsFromCart(
                Object.keys(selectedItems).map((key) =>
                  selectedItems[key] ? parseInt(key) : -1
                )
              ).then(() => {
                setReRender(true);
              });
            }}
          >
            <MdDelete size="20" />
          </Button>
          <Button marginLeft="1em" variant="primarySolid">
            Proceed
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WithAuth(Cart);
