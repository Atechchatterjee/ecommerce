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
import { IoIosArrowBack } from "react-icons/io";
import { CategoryTree } from "../../util/Tree";
import { AnimatePresence, motion } from "framer-motion";
import { checkBrowser } from "../../util/CheckBrowser";

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
    <Flex flexDirection="column" gridGap={4} {...props}>
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
              display="flex"
              w="95%"
              minH="5vh"
              borderRadius="md"
              backgroundColor={
                hoverId !== category.val.id ? "rgba(255,255,255,0.4)" : ""
              }
              bgGradient={
                hoverId === category.val.id
                  ? "linear(to-r, rgba(46, 60, 126, 0.7), rgba(46, 60, 126, 0.6))"
                  : ""
              }
              color={hoverId === category.val.id ? "white" : "gray.800"}
              onMouseEnter={() => setHoverId(category.val.id)}
              onMouseLeave={() => setHoverId(-1)}
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              padding="4% 8%"
              flex="1"
              cursor="pointer"
              margin="0"
              onClick={() => {
                if (selectCb) selectCb(category);
              }}
              transition="all ease-in-out 0.1s"
            >
              <Text fontSize="1rem" isTruncated>
                {category.val.name}
              </Text>
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
    return category.val ? category.val.name : "All Categories";
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
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          <Box
            position="fixed"
            left="0"
            margin="0"
            w="18%"
            h="100vh"
            borderRadius="md"
            backgroundColor={
              checkBrowser(window, "firefox")
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.8)"
            }
            backdropFilter="blur(20px)"
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            padding="1.5rem 1rem 0 2rem"
            transition="all 0.2s ease-in-out"
            {...props}
          >
            <CloseButton
              position="absolute"
              right="3%"
              top="2.5%"
              onClick={handleClose}
            />
            <Flex flexDirection="column" gridGap={6}>
              <Text fontWeight="semibold" fontSize="1.3rem" flex="1">
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
              <Button
                color="gray.100"
                variant="primarySolid"
                opacity="0.8"
                marginTop="4%"
                w="95%"
                onClick={popCategoryFromStack}
              >
                <IoIosArrowBack />
              </Button>
            </Flex>
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return <></>;
  }
};

export default CategorySidebar;
