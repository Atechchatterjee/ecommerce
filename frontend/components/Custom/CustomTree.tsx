import React, { useEffect, useState } from "react";
import {
  Text,
  ContainerProps,
  Box,
  Container,
  List,
  ListItem,
  HStack,
  Fade,
} from "@chakra-ui/react";
import { CategoryNode } from "../../util/Tree";
// import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import RightClickMenu from "./RightClickMenu";

interface CustomTreeProps extends ContainerProps {
  root: CategoryNode;
  selectCb?: (selectedCategory: number | null) => void;
}

const CustomTreeWrapper = ({
  root,
  key,
  selectCb,
  ...props
}: CustomTreeProps) => {
  const [selectedNode, setSelectedNode] =
    useState<{ [key: number]: boolean }>();
  const [highlightNode, setHighlightNode] = useState<number>(0);

  useEffect(() => {
    root.children.forEach((child) => {
      setSelectedNode({ ...selectedNode, [child.val.id]: false });
    });
  }, []);

  const CustomTree = ({ root, key, selectCb, ...props }: CustomTreeProps) => {
    if (root.val === null && root.children.length === 0) return null;
    return (
      <Container key={key} {...props}>
        {root.children.map((child, indx) => (
          <Box
            key={indx}
            display={
              selectedNode && selectedNode[child.val.parentId]
                ? "block"
                : child.val.parentId
                ? "none"
                : "block"
            }
          >
            <ListItem
              padding="0.2em 0.7em"
              key={indx}
              bgColor={
                highlightNode === child.val.id ? "secondaryBlue.200" : "none"
              }
              color={highlightNode === child.val.id ? "white" : "none"}
              fontWeight={
                highlightNode === child.val.id ? "semibold" : "regular"
              }
              cursor="pointer"
              onClick={() => {
                if (selectCb) selectCb(child.val.id);
                setHighlightNode(child.val.id);
                setSelectedNode({
                  ...selectedNode,
                  [child.val.id]: selectedNode
                    ? !selectedNode[child.val.id]
                    : false,
                });
              }}
              userSelect="none"
            >
              <HStack>
                {child.children.length > 0 ? (
                  highlightNode === child.val.id ? (
                    <IoMdArrowDropdown size="20" />
                  ) : (
                    <IoMdArrowDropright size="20" />
                  )
                ) : (
                  <Box width="1em"></Box>
                )}
                <Text>{child.val.name}</Text>
              </HStack>
            </ListItem>
            {child.children.length > 0 ? (
              <CustomTree root={child} key={child.val.id} selectCb={selectCb} />
            ) : (
              <></>
            )}
          </Box>
        ))}
      </Container>
    );
  };

  return (
    <RightClickMenu>
      <Container {...props} key={key}>
        <List fontSize="1.2em">
          <CustomTree root={root} key={key} selectCb={selectCb} />
        </List>
      </Container>
    </RightClickMenu>
  );
};

export default CustomTreeWrapper;
