import { useState, useEffect } from "react";
import { Box, Button, Container, Image, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import constants from "../../util/Constants";
import CustomTable from "../Custom/CustomTable";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import { MdDelete } from "react-icons/md";
import { CustomField } from "../Custom/CustomField";
import { IoIosArrowBack } from "react-icons/io";
import { createImageUrl } from "../../util/CreateImageUrl";
import CustomContainer from "../Custom/CustomContainer";

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
    <Box padding="1% 2% 0 2%">
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
      <Box
        position="absolute"
        left="1.5em"
        bottom="2.5em"
        width="0.1em"
        height="1em"
      >
        <Button
          variant="primaryOutline"
          borderRadius="full"
          onClick={() => window.location.assign("/shop")}
        >
          <Flex flexDirection="row" gridGap={1.5}>
            <IoIosArrowBack size={20} />
            <Text flex="1">Back</Text>
          </Flex>
        </Button>
      </Box>
      <Box position="absolute" bottom="1em" right="1em">
        <Button
          variant="secondarySolid"
          borderRadius="md"
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
        <Button
          marginLeft="1em"
          variant="primarySolid"
          onClick={() => proceed && proceed()}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
