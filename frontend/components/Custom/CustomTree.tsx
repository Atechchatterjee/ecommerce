import React from "react";
import { ContainerProps, Container, List, ListItem } from "@chakra-ui/react";

interface CustomTreeProps extends ContainerProps {
  nodes: any;
}

const CustomTree = ({ nodes, ...props }: CustomTreeProps) => {
  return (
    <Container {...props}>
      <List></List>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </Container>
  );
};

export default CustomTree;
