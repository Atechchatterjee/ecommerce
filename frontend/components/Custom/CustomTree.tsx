import React, { useState } from "react";
import {
  Text,
  ContainerProps,
  Box,
  Container,
  List,
  ListItem,
  ListItemProps,
  TextProps,
  Flex,
  InputProps,
} from "@chakra-ui/react";
import { CategoryNode } from "../../util/Tree";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import RightClickMenu from "./RightClickMenu";
import { CustomField } from "./CustomField";
import { AnimatePresence, motion } from "framer-motion";

interface CustomTreeProps extends ContainerProps {
  root: CategoryNode;
  disableRightClick?: boolean;
  selectCb?: (selectedCategory: CategoryNode | null) => void;
  addCb?: (parentNode: CategoryNode, newNodeName: string) => void;
  deleteCb?: (node: CategoryNode) => void;
}

const ListItemStyle = (highlightNode: any, child: any): ListItemProps => ({
  padding: "0.5em 0.7em",
  cursor: "pointer",
  userSelect: "none",
  transition: "all ease-in-out 0.2s",
  bgColor: highlightNode?.val.id === child.val.id ? "secondary.200" : "none",
  ml: child.children.length === 0 ? "1em" : "0",
  color: highlightNode?.val.id === child.val.id ? "white" : "none",
  fontWeight: highlightNode?.val.id === child.val.id ? "semibold" : "regular",
  _hover: {
    bgColor: highlightNode?.val.id === child.val.id ? "" : "gray.300",
  },
});

const CustomTreeWrapper = ({
  root,
  key,
  selectCb,
  addCb,
  deleteCb,
  disableRightClick,
  ...props
}: CustomTreeProps) => {
  const [selectedNodeId, setSelectedNodeId] = useState<{
    [key: number]: boolean;
  }>();
  const [highlightNode, setHighlightNode] = useState<CategoryNode>();
  const [toAddNode, setToAddNode] = useState<boolean>(false);
  const [openedNodes, setOpenedNodes] = useState<any>({});

  const FoldingAction = (
    node: CategoryNode,
    action: "fold" | "unfold" = "fold"
  ) => {
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
      FoldingAction(node, "fold");
      setOpenedNodes({ ...openedNodes, [node.val.id]: false });
    } else {
      setOpenedNodes({ ...openedNodes, [node.val.id]: true });
      FoldingAction(node, "unfold");
    }
    if (selectCb) selectCb(node);
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

    const NewCategoryInputField = ({ ...props }: InputProps) => (
      <CustomField
        marginLeft="7%"
        marginTop="0.5em"
        borderRadius="sm"
        width="80%"
        size="md"
        onBlur={(e: any) => {
          setToAddNode(false);
          if (addCb && highlightNode && e.target.value !== "") {
            addCb(highlightNode, e.target.value);
          }
        }}
        autoFocus
        {...props}
      />
    );

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
              transition="all ease-in-out 0.2s"
            >
              <ListItem
                key={indx}
                onClick={() => handleFold(child)}
                {...ListItemStyle(highlightNode, child)}
              >
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  gridGap={3}
                  transition="all ease-in-out 0.2s"
                >
                  {child.children.length > 0 &&
                    (openedNodes[child.val.id] ? (
                      <IoMdArrowDropdown size="20" />
                    ) : (
                      <IoMdArrowDropright size="20" />
                    ))}
                  <Text>{child.val.name}</Text>
                </Flex>
              </ListItem>
              <Box>
                {toAddNode && child.val.id === highlightNode?.val.id && (
                  <NewCategoryInputField />
                )}
                {child.children.length > 0 && (
                  <AnimatePresence key={indx}>
                    <motion.div
                      initial={{
                        y: 0,
                        opacity:
                          selectedNodeId && selectedNodeId[child.val.parentId]
                            ? 0
                            : 1,
                      }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
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
                    </motion.div>
                  </AnimatePresence>
                )}
              </Box>
            </Box>
          ))}
      </Container>
    );
  };

  const handleAdd = () => {
    if (highlightNode) FoldingAction(highlightNode, "unfold");
    setToAddNode(true);
  };

  const MenuItemComponent = ({ children, ...props }: TextProps) => {
    return (
      <Text
        cursor="pointer"
        _hover={{ color: "primary.900", fontWeight: "semibold" }}
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
