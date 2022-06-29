import { Flex, FlexProps, Divider } from "@chakra-ui/react";
import QueryInfo from "./QueryInfo";
import ShippingDetailsForm from "./ShippingDetailsForm";

const Shipping = ({ ...props }: FlexProps) => (
  <Flex flexDirection="row" gridGap="5%" padding="1rem 3rem" {...props}>
    <ShippingDetailsForm />
    <Divider orientation="vertical" size="lg" h="70vh" mt="5vh" />
    <QueryInfo flex="1" />
  </Flex>
);

export default Shipping;
