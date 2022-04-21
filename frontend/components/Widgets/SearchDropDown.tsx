import React, { useEffect, useState } from "react";
import CustomContainer from "../Custom/CustomContainer";
import { ContainerProps, Box } from "@chakra-ui/react";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import { AnimatePresence, motion } from "framer-motion";

interface SearchDropDownProps extends ContainerProps {
  items: any[];
}

const SearchDropDown = ({ items, ...props }: SearchDropDownProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(items[0].item);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(items[0].item);
  }, [items]);

  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: 10, opacity: 1 }}
        initial={{ opacity: 0.3 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        style={{ width: "100%" }}
      >
        <CustomContainer
          bgColor="white"
          position="absolute"
          height="35vh"
          padding="0.8em"
          overflow="scroll"
          sx={scrollBarStyle({ color: "primary", borderRadius: "lg" })}
          transition="all ease-in-out 0.5s"
          {...props}
        >
          {items.map(({ item }, indx) => (
            <Box
              borderRadius="md"
              bgColor={selectedItem.id === item.id ? "primary.100" : "white"}
              color={selectedItem.id === item.id ? "white" : "gray.800"}
              _hover={{
                bgColor:
                  selectedItem.id === item.id ? "primary.200" : "gray.200",
              }}
              key={indx}
              width="full"
              padding="0.8em"
              cursor="pointer"
              onClick={() => handleSelectItem(item)}
              transition="all ease-in-out 0.2s"
            >
              {item.name}
            </Box>
          ))}
        </CustomContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDropDown;
