import { Container, Center, Heading } from "@chakra-ui/react";

const AddProduct: React.FC = () => {
  return (
    <Container
      style={{
        boxShadow: "0.2em 0.2em 0.2em 0.2em #e1e1e1",
        height: "33em",
      }}
    >
      <Center>
        <Heading>Add Product</Heading>
      </Center>
    </Container>
  );
};

export default AddProduct;
