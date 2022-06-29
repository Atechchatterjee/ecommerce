import { Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import { MdEmail, MdPhone } from "react-icons/md";
import color from "../../../theme/ColorPalatte";

const { secondary } = color;

const QueryInfo = ({ ...props }: FlexProps) => (
  <Flex flexDirection="column" gridGap="2rem" mt="2%" {...props}>
    <Text fontSize="xl" fontWeight="bold" color="gray.600">
      Shipping Query Info
    </Text>
    <Text textAlign="left" color="gray.600">
      Your shipping details will be send to our vendors to calculate the
      shipping charges as the rates always fluctuate.
    </Text>
    <Text textAlign="left" color="gray.600">
      Once the vendor has finalized the shipping details and calculated the
      shipping cost, we will notify you through an email and the shipping
      charges will be reflected in your cart.
    </Text>
    <Text textAlign="left" color="gray.600">
      For more queries feel free to contact us.
    </Text>
    <Flex flexDirection="row" gridGap={5} mt="2rem">
      <MdEmail
        size={20}
        style={{ marginTop: "0.15rem" }}
        color={secondary[200]}
      />
      <Text fontSize="md" fontWeight="semibold" color="gray.600">
        Email Address :
      </Text>
      <Link href="mailto:info@cndengineering.com" textUnderlineOffset="2px">
        info@cndengineering.com
      </Link>
    </Flex>
    <Flex flexDirection="row" gridGap={5} mt="2rem">
      <MdPhone
        size={20}
        style={{ marginTop: "0.15rem" }}
        color={secondary[200]}
      />
      <Text fontSize="md" fontWeight="semibold" color="gray.600">
        Phone Number :
      </Text>
      <Text>8017033385</Text>
    </Flex>
  </Flex>
);

export default QueryInfo;
