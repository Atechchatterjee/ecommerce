import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  BoxProps,
} from "@chakra-ui/react";

interface SelectUnitMenuProps extends BoxProps {
  allUnits: any[];
  selectedUnit: any;
  setSelectedUnit: Function;
}

const SelectUnitMenu = ({
  allUnits,
  selectedUnit,
  setSelectedUnit,
  ...props
}: SelectUnitMenuProps) => {
  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant={selectedUnit ? "secondarySolid" : "primarySolid"}
          borderRadius="md"
          {...props}
        >
          {selectedUnit ? selectedUnit.value : "Units"}
        </MenuButton>
        <MenuList bgColor="primary.500" color="white" borderColor="primary.500">
          {allUnits.map((unit: any, indx: number) => {
            return (
              <MenuItem
                key={indx}
                onClick={() => setSelectedUnit(unit)}
                _hover={{ bgColor: "primary.200" }}
              >
                {unit.value}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SelectUnitMenu;
