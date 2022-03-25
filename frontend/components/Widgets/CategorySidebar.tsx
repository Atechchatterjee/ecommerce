import { useState, useEffect } from "react";
import { Box, ContainerProps, Flex, FlexProps, Text } from "@chakra-ui/react";
import CustomContainer from "../Custom/CustomContainer";
import { useCategoryData } from "../../hooks/useCategoryData";

interface DisplayCategoriesProps extends FlexProps {
  categories?: any[];
}

const DisplayCategories = ({
  categories,
  ...props
}: DisplayCategoriesProps) => {
  const [hoverId, setHoverId] = useState<number>(-1);

  return (
    <Flex flexDirection="column" gridGap={3} {...props}>
      {categories?.map((category: any) => (
        <Box
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
          boxShadow="rgba(0, 0, 0, 0.2) 0px 0px 10px 0px"
          justifyContent="center"
          alignItems="center"
          padding="4%"
          flex="1"
          cursor="pointer"
          interactive
          margin="0"
        >
          <Text>{category.val.name}</Text>
        </Box>
      ))}
    </Flex>
  );
};

const CategorySidebar = ({ ...props }: ContainerProps) => {
  const [categories, setCategories, categoryTree] = useCategoryData({
    returnTree: true,
  });

  useEffect(() => {}, []);

  return (
    <CustomContainer
      position="fixed"
      top="10%"
      left="2%"
      w="20%"
      h="85vh"
      borderRadius="lg"
      backgroundColor="rgba(255,255,255,0.8)"
      backdropFilter="blur(10px)"
      padding="1.5% 1% 0 2%"
      {...props}
    >
      <Flex flexDirection="column" gridGap={7}>
        <Text fontWeight="semibold" fontSize="1.5rem" flex="1">
          Categories
        </Text>
        <DisplayCategories categories={categoryTree?.root.children} flex="1" />
      </Flex>
    </CustomContainer>
  );
};

export default CategorySidebar;
