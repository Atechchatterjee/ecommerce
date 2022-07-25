import {
  Button,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CustomTable from "../Custom/CustomTable";

const ShowAllCartItems = ({
  cartItems,
  user,
}: {
  cartItems: any[];
  user: any;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const createCartItemRows = () => {
    return cartItems.map((cartItem: any) => {
      if (cartItem.product_id)
        return [
          cartItem.product_id.product_id,
          cartItem.product_id.name,
          cartItem.product_id.description,
          cartItem.quantity,
          "₹" + cartItem.total_price,
        ];
      else
        return [
          "",
          "",
          "",
          "total",
          <Text fontWeight="bold">{"₹" + cartItem.finalPrice}</Text>,
        ];
    });
  };

  return (
    <>
      <Button
        variant="secondaryOutline"
        onClick={(e: any) => {
          e.preventDefault();
          onOpen();
        }}
      >
        View Cart
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex flexDirection="row" gridGap="0.3rem">
              Cart Items of <Text fontWeight="bold">{user.name}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pointerEvents="none">
            <CustomTable
              heading={[
                "product name",
                "product description",
                "quantity",
                "total price",
              ]}
              rows={createCartItemRows()}
              disableClick
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowAllCartItems;
