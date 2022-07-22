import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CloseButton,
  ContainerProps,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/react";
import { CategoryTree } from "../../util/Tree";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface DisplayCategoriesProps extends FlexProps {
  categories?: any[];
  selectCb?: (_: any) => void;
}

const DisplayCategories = ({
  categories,
  selectCb,
  ...props
}: DisplayCategoriesProps) => {
  const [hoverId, setHoverId] = useState<number>(-1);

  return (
    <Flex flexDirection="column" gridGap={0} w="100%" {...props}>
      {categories?.map((category: any, indx) => (
        <AnimatePresence key={indx}>
          <motion.div
            key="modal"
            initial={{ x: -10, opacity: "0.4" }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Box
              key={indx}
              position="relative"
              w="100%"
              minH="5vh"
              borderTop="1px solid #414D9A"
              borderBottom={
                indx === categories.length - 1 ? "1px solid #414D9A" : ""
              }
              bg={hoverId === category.val.id ? "primary.200" : ""}
              color={hoverId === category.val.id ? "white" : "gray.100"}
              onMouseEnter={() => setHoverId(category.val.id)}
              onMouseLeave={() => setHoverId(-1)}
              padding="5% 9%"
              flex="1"
              cursor="pointer"
              margin="0"
              onClick={() => {
                if (selectCb) selectCb(category);
              }}
              transition="all ease-in-out 0.1s"
            >
              <Text fontSize="1.1rem" isTruncated>
                {category.val.name}
              </Text>
              {category.children.length > 0 && (
                <ChevronRightIcon
                  fontSize="1.3rem"
                  position="absolute"
                  top="1.2rem"
                  right="1rem"
                />
              )}
            </Box>
          </motion.div>
        </AnimatePresence>
      ))}
    </Flex>
  );
};

interface CategorySidebarProps extends ContainerProps {
  categoryTree?: CategoryTree;
  open?: boolean;
  closeCb?: Function;
}

const CategorySidebar = ({
  open,
  categoryTree,
  closeCb,
  ...props
}: CategorySidebarProps) => {
  const [categoriesToDisplay, setCategoriesToDisplay] = useState<any[]>(
    categoryTree?.root.children || []
  );
  const [categoryStack, setCategoryStack] = useState<any[]>([]);

  const popCategoryFromStack = () => {
    setCategoryStack(categoryStack.slice(0, categoryStack.length - 1));
  };

  const peekCategoryStack = () =>
    categoryStack[categoryStack.length - 1] || categoryTree?.root || {};

  useEffect(() => {
    if (categoryStack.length > 0) {
      setCategoriesToDisplay(peekCategoryStack().children);
    } else if (categoryTree) {
      setCategoriesToDisplay(categoryTree.root.children);
    }
  }, [categoryTree, categoryStack]);

  const DynamicHeading = () => {
    const category = peekCategoryStack();
    return category.val ? category.val.name : "Categories";
  };

  const handleClose = () => {
    if (closeCb) closeCb();
  };

  if (open) {
    return (
      <AnimatePresence>
        <motion.div
          style={{
            position: "fixed",
            zIndex: 20,
            width: "100%",
            padding: "0",
            height: "full",
          }}
          key="modal"
          initial={{ opacity: 0.5, x: -5 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", velocity: 0.1 }}
          exit={{ opacity: 0.5, x: -5 }}
        >
          <Box
            position="fixed"
            left="0"
            margin="0"
            w="18%"
            h="100vh"
            borderRadius="md"
            bg="#262F65"
            padding="1.5rem 0rem 0 0rem"
            transition="all 0.2s ease-in-out"
            {...props}
          >
            <CloseButton
              position="absolute"
              color="white"
              right="3%"
              top="2.5%"
              onClick={handleClose}
            />
            <Flex flexDirection="column" gridGap={6}>
              <Text
                fontWeight="medium"
                fontSize="1.3rem"
                flex="1"
                color="white"
                fontFamily="Sora"
                ml="10%"
                transition="all ease-in-out 0.2s"
              >
                <DynamicHeading />
              </Text>
              <DisplayCategories
                mt="8%"
                flex="1"
                categories={categoriesToDisplay}
                selectCb={(category) => {
                  if (category.children.length > 0) {
                    setCategoriesToDisplay(category.children);
                    setCategoryStack([...categoryStack, category]);
                  }
                }}
              />
            </Flex>
            <Button
              color="gray.100"
              variant="secondarySolid"
              borderRadius="none"
              marginTop="10%"
              padding="1.7rem 0"
              w="100%"
              onClick={popCategoryFromStack}
              isDisabled={categoryStack.length === 0}
            >
              <Flex flexDirection="row" gridGap="2" textAlign="center">
                <ChevronLeftIcon fontSize="1.5rem" ml="-15%" />
                <Text fontSize="1.1rem" mt="0.15rem">
                  Back
                </Text>
              </Flex>
            </Button>
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return <></>;
  }
};

export default CategorySidebar;
