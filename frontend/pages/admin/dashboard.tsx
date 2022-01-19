import { NextPage } from "next";
import { Container, Text, HStack, Center } from "@chakra-ui/react";
import Navbar from "../../components/Admin/Navbar";
import WithAuth from "../../util/WithAuth";

const AdminDashboard: NextPage = ({ ...props }) => {
  console.log(props);

  return (
    <div>
      <Navbar />
      <Center>
        <HStack marginTop="2em">
          <Container
            boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
            height="5em"
            width="15em"
            marginRight="1em"
            borderRadius="lg"
            centerContent
          >
            <HStack marginTop="12%">
              <Text>No. of Orders</Text>
              <Text>10000</Text>
            </HStack>
          </Container>
          <Container
            boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
            height="5em"
            width="15em"
            centerContent
            borderRadius="lg"
          >
            <HStack marginTop="12%">
              <Text>Sales</Text>
              <Text>$ 5000</Text>
            </HStack>
          </Container>
        </HStack>
      </Center>
    </div>
  );
};

export default WithAuth(AdminDashboard, { admin: true });
