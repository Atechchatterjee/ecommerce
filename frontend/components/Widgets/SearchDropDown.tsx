import React, { useEffect, useState } from "react";
import { ContainerProps, Box } from "@chakra-ui/react";
import { scrollBarStyle } from "../../util/ScrollBarStyle";
import { AnimatePresence, motion } from "framer-motion";
import { useKeyPress } from "../../hooks/useKeyPress";
import CustomContainer from "../Custom/CustomContainer";

interface SearchDropDownProps extends ContainerProps {
  items: any[];
  selectedCb?: (item: any, enter?: boolean) => void;
}

const SearchDropDown = ({
  selectedCb,
  items,
  ...props
}: SearchDropDownProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(
    items[0] && items[0].item
  );
  const [lastItemSelected, setLastItemSelected] = useState<number>(0);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    if (selectedCb) selectedCb(item);
  };

  useEffect(() => {
    if (items[0]) setSelectedItem(items[0].item);
  }, [items]);

  useEffect(() => {
    // move selection to the next item in the list
    if (items[lastItemSelected] && downPress) {
      if (lastItemSelected < items.length - 1) {
        if (selectedCb) selectedCb(items[lastItemSelected + 1].item);
        setSelectedItem(items[lastItemSelected + 1].item);
        setLastItemSelected(lastItemSelected + 1);
      }
    }
    // move selection to the previous item in the list
    if (items[lastItemSelected] && upPress) {
      if (lastItemSelected > 0) {
        if (selectedCb) selectedCb(items[lastItemSelected - 1].item);
        setSelectedItem(items[lastItemSelected - 1].item);
        setLastItemSelected(lastItemSelected - 1);
      }
    }
    if (items[lastItemSelected] && enterPress) {
      if (lastItemSelected >= 0 && lastItemSelected < items.length) {
        if (selectedCb) selectedCb(items[lastItemSelected].item, true);
      }
    }
  }, [downPress, upPress, enterPress]);

  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: 10, opacity: 1 }}
        initial={{ opacity: 0.5 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        style={{ zIndex: 11, width: "100%" }}
      >
        <CustomContainer
          bgColor="white"
          opacity="1"
          zIndex={11}
          position="fixed"
          height="35vh"
          padding="0.8em"
          overflow="auto"
          sx={scrollBarStyle({
            hidden: true,
            color: "primary",
            borderRadius: "lg",
          })}
          transition="all ease-in-out 0.5s"
          onKeyDown={(e: any) => {
            alert(e.keyCode);
          }}
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
