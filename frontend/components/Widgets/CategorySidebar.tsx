import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ContainerProps,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { CategoryTree } from "../../util/Tree";
import { AnimatePresence, motion } from "framer-motion";

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
    <Flex flexDirection="column" gridGap={5} {...props}>
      {categories?.map((category: any, indx) => (
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ x: -10 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box
              key={indx}
              display="flex"
              w="95%"
              h="5vh"
              borderRadius="lg"
              backgroundColor={
                hoverId !== category.val.id ? "rgba(255,255,255,0.4)" : ""
              }
              bgGradient={
                hoverId === category.val.id
                  ? "linear(to-r, rgba(71, 84, 153, 0.2), rgba(59, 73, 148, 0.2))"
                  : ""
              }
              onMouseEnter={() => setHoverId(category.val.id)}
              onMouseLeave={() => setHoverId(-1)}
              boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 4px 0px"
              padding="4% 8%"
              flex="1"
              cursor="pointer"
              margin="0"
              onClick={() => {
                if (selectCb) selectCb(category);
              }}
            >
              <Text isTruncated>{category.val.name}</Text>
            </Box>
          </motion.div>
        </AnimatePresence>
      ))}
    </Flex>
  );
};

interface CategorySidebarProps extends ContainerProps {
  categoryTree: CategoryTree;
}

const CategorySidebar = ({ categoryTree, ...props }: CategorySidebarProps) => {
  const [categoriesToDisplay, setCategoriesToDisplay] = useState<any[]>(
    categoryTree?.root.children || []
  );
  const [categoryStack, setCategoryStack] = useState<any[]>([]);

  useEffect(() => {
    if (categoryStack.length > 0) {
      setCategoriesToDisplay(categoryStack[categoryStack.length - 1].children);
    } else if (categoryTree) {
      setCategoriesToDisplay(categoryTree.root.children);
    }
  }, [categoryTree, categoryStack]);

  const popCategoryFromStack = () => {
    setCategoryStack(categoryStack.slice(0, categoryStack.length - 1));
  };

  const peekCategoryStack = () =>
    categoryStack[categoryStack.length - 1] || categoryTree.root;

  const DynamicHeading = () => {
    const category = peekCategoryStack();
    return category.val !== null ? category.val.name : "CATEGORIES";
  };

  return (
    <Box
      position="fixed"
      top="9%"
      left="0.5%"
      w="18%"
      h="89vh"
      borderRadius="2xl"
      backgroundColor="rgba(250,250,250,0.75)"
      backdropFilter="blur(20px)"
      boxShadow="rgba(0, 0, 0, 0.3) 0px 5px 15px"
      padding="1.5% 1% 0 2%"
      transition="all 0.2s ease-in-out"
      {...props}
    >
      <Flex flexDirection="column" gridGap={8}>
        <Text fontWeight="bold" fontSize="1.1rem" flex="1">
          <DynamicHeading />
        </Text>
        <DisplayCategories
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
          color="primary.500"
          variant="primaryBlurSolid"
          w="95%"
          onClick={popCategoryFromStack}
        >
          <IoIosArrowBack />
        </Button>
      </Flex>
    </Box>
  );
};

export default CategorySidebar;
