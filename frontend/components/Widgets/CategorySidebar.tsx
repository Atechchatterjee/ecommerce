import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ContainerProps,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/react";
import CustomContainer from "../Custom/CustomContainer";
import { useCategoryData } from "../../hooks/useCategoryData";
import { IoIosArrowBack } from "react-icons/io";

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
        <Box
          key={indx}
          display="flex"
          w="95%"
          h="5vh"
          borderRadius="lg"
          {...(hoverId === category.val.id
            ? {
                bgGradient:
                  "linear(to-r, rgba(71, 84, 153, 0.2), rgba(59, 73, 148, 0.2))",
              }
            : { backgroundColor: "rgba(255,255,255,0.4)" })}
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
          <Text>{category.val.name}</Text>
        </Box>
      ))}
    </Flex>
  );
};

const CategorySidebar = ({ ...props }: ContainerProps) => {
  const [, , categoryTree] = useCategoryData({
    returnTree: true,
  });
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

  return (
    <Box
      position="fixed"
      top="9%"
      left="1%"
      w="18%"
      h="88vh"
      borderRadius="2xl"
      backgroundColor="rgba(240,240,240,0.75)"
      backdropFilter="blur(20px)"
      boxShadow="rgba(0, 0, 0, 0.3) 0px 5px 15px"
      padding="1.5% 1% 0 2%"
      transition="all 0.2s ease-in-out"
      {...props}
    >
      <Flex flexDirection="column" gridGap={8}>
        <Text fontWeight="semibold" fontSize="1.5rem" flex="1">
          Categories
        </Text>
        <DisplayCategories
          categories={categoriesToDisplay}
          flex="1"
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
          onClick={popCategoryFromStack}
        >
          <IoIosArrowBack />
        </Button>
      </Flex>
    </Box>
  );
};

export default CategorySidebar;
