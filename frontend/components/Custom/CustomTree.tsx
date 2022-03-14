import React, { useState } from "react";
import {
  Text,
  ContainerProps,
  Box,
  Container,
  List,
  ListItem,
  HStack,
  Input,
  TextProps,
} from "@chakra-ui/react";
import { CategoryNode } from "../../util/Tree";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import RightClickMenu from "./RightClickMenu";

interface CustomTreeProps extends ContainerProps {
  root: CategoryNode;
  disableRightClick?: boolean;
  selectCb?: (selectedCategory: number | null) => void;
  addCb?: (parentNode: CategoryNode, newNodeName: string) => void;
  deleteCb?: (node: CategoryNode) => void;
}

const CustomTreeWrapper = ({
  root,
  key,
  selectCb,
  addCb,
  deleteCb,
  disableRightClick,
  ...props
}: CustomTreeProps) => {
  const [selectedNodeId, setSelectedNodeId] =
    useState<{ [key: number]: boolean }>();
  const [highlightNode, setHighlightNode] = useState<CategoryNode>();
  const [toAddNode, setToAddNode] = useState<boolean>(false);
  const [openedNodes, setOpenedNodes] = useState<any>({});

  const FoldNode = (node: CategoryNode, action: "fold" | "unfold" = "fold") => {
    setHighlightNode(node);
    setSelectedNodeId({
      ...selectedNodeId,
      [node.val.id]: selectedNodeId
        ? action === "fold"
          ? false
          : true
        : false,
    });
  };

  const handleFold = (node: CategoryNode) => {
    if (selectedNodeId && selectedNodeId[node.val.id]) {
      FoldNode(node, "fold");
      setOpenedNodes({ ...openedNodes, [node.val.id]: false });
    } else {
      setOpenedNodes({ ...openedNodes, [node.val.id]: true });
      FoldNode(node, "unfold");
    }
    if (selectCb) selectCb(node.val.id);
  };

  const CustomTree = ({
    root,
    key,
    selectCb,
    addCb,
    deleteCb,
    disableRightClick,
    ...props
  }: CustomTreeProps) => {
    if (root.val === null && root.children.length === 0) return null;

    return (
      <Container key={key} {...props}>
        {root.children &&
          root.children.map((child, indx) => (
            <Box
              key={indx}
              display={
                selectedNodeId && selectedNodeId[child.val.parentId]
                  ? "block"
                  : child.val.parentId
                  ? "none"
                  : "block"
              }
            >
              <ListItem
                padding="0.5em 0.7em"
                key={indx}
                bgColor={
                  highlightNode?.val.id === child.val.id
                    ? "secondaryPink.200"
                    : "none"
                }
                borderRadius={
                  highlightNode?.val.id === child.val.id ? "lg" : "none"
                }
                color={
                  highlightNode?.val.id === child.val.id ? "white" : "none"
                }
                fontWeight={
                  highlightNode?.val.id === child.val.id
                    ? "semibold"
                    : "regular"
                }
                cursor="pointer"
                onClick={() => handleFold(child)}
                _hover={{
                  bgColor: "#D1BEE8",
                  color: "white",
                  borderRadius: "lg",
                }}
                userSelect="none"
              >
                <HStack>
                  {child.children.length > 0 ? (
                    openedNodes[child.val.id] ? (
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
              <Box>
                {toAddNode && child.val.id === highlightNode?.val.id ? (
                  <Input
                    marginLeft="7%"
                    marginTop="0.5em"
                    borderRadius="sm"
                    // width="17em"
                    width="80%"
                    size="md"
                    onBlur={(e: any) => {
                      setToAddNode(false);
                      if (addCb && highlightNode && e.target.value !== "") {
                        addCb(highlightNode, e.target.value);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <></>
                )}
                {child.children.length > 0 ? (
                  <CustomTree
                    {...{
                      root: child,
                      key,
                      selectCb,
                      addCb,
                      deleteCb,
                      disableRightClick,
                    }}
                  />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          ))}
      </Container>
    );
  };

  const handleAdd = () => {
    if (highlightNode) FoldNode(highlightNode, "unfold");
    setToAddNode(true);
  };

  const MenuItemComponent = ({ children, ...props }: TextProps) => {
    return (
      <Text
        cursor="pointer"
        _hover={{ color: "secondaryBlue.200", fontWeight: "semibold" }}
        {...props}
      >
        {children}
      </Text>
    );
  };

  const handleDelete = () => {
    if (deleteCb && highlightNode) deleteCb(highlightNode);
  };

  const IncludeRightClick: React.FC<{ include?: boolean }> = ({
    children,
    include,
  }) => {
    if (!include) return <>{children}</>;
    return (
      <RightClickMenu
        menuItems={[
          <MenuItemComponent onClick={handleAdd} key="1">
            Add
          </MenuItemComponent>,
          <MenuItemComponent
            key="2"
            display={highlightNode?.children.length === 0 ? "block" : "none"}
            onClick={handleDelete}
          >
            Delete
          </MenuItemComponent>,
          <MenuItemComponent key="3">Modify</MenuItemComponent>,
        ]}
      >
        {children}
      </RightClickMenu>
    );
  };

  return (
    <IncludeRightClick include={!disableRightClick}>
      <Container {...props} key={key}>
        <List fontSize="1.2em">
          <CustomTree
            {...{ root, key, selectCb, addCb, deleteCb, disableRightClick }}
          />
        </List>
      </Container>
    </IncludeRightClick>
  );
};

export default CustomTreeWrapper;
