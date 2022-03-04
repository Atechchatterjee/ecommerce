import React, { useState } from "react";
import { ContainerProps, Container, List, ListItem } from "@chakra-ui/react";
import { CategoryNode } from "../../util/Tree";

interface CustomTreeProps extends ContainerProps {
  root: CategoryNode;
}

const CustomTreeWrapper = ({ root, key, ...props }: CustomTreeProps) => {
  const [selectedNode, setSelectedNode] =
    useState<{ [key: number]: boolean }>();

  const CustomTree = ({ root, key, ...props }: CustomTreeProps) => {
    if (root.val === null && root.children.length === 0) return null;
    return (
      <Container>
        {root.children.map((child) => (
          <ListItem
            cursor="pointer"
            display={
              selectedNode && selectedNode[child.val.parentId]
                ? "none"
                : "block"
            }
            onClick={() => {
              console.log({ id: child.val.id });
              setSelectedNode({
                ...selectedNode,
                [child.val.id]: selectedNode
                  ? !selectedNode[child.val.id]
                  : true,
              });
              console.log(selectedNode);
            }}
          >
            {child.val.id} : {child.val.name}
            {(function displayChildren() {
              if (child.children.length > 0)
                return <CustomTree root={child} key={child.val.id} />;
            })()}
          </ListItem>
        ))}
      </Container>
    );
  };

  return (
    <Container {...props} key={key}>
      <List>{CustomTree({ root, key, ...props })}</List>
    </Container>
  );
};

export default CustomTreeWrapper;
