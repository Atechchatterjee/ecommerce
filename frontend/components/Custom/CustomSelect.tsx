import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface CustomSelectProps {
  options: string[];
  menuListWidth?: string;
  onSelect?: (_: string) => void;
  marginTop?: string;
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  menuListWidth,
  marginTop,
  onSelect,
  placeholder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(placeholder);

  return (
    <Menu>
      <MenuButton as={Button} width="full" marginTop={marginTop}>
        <Text textAlign="left" color="gray.500">
          {selectedCategory}
        </Text>
      </MenuButton>
      <MenuList width={menuListWidth ? menuListWidth : "initial"}>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setSelectedCategory(option);
              if (onSelect) onSelect(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CustomSelect;
