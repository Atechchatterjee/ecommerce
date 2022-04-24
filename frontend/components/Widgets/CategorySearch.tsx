import React, { useEffect, useState } from "react";
import { CustomField } from "../Custom/CustomField";
import { Box, InputProps } from "@chakra-ui/react";
import { CategoryTree } from "../../util/Tree";
import { searchCategory } from "../../util/SearchCategory";
import SearchDropDown from "./SearchDropDown";
import { useKeyPress } from "../../hooks/useKeyPress";

interface CategoryTreeProps extends InputProps {
  categoryTree: CategoryTree;
  getDropDownStatus?: (_: boolean) => void;
}

const CategorySearch = ({
  getDropDownStatus,
  categoryTree,
  ...props
}: CategoryTreeProps) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [searchedCategories, setSearchedCategories] = useState<any[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const escapeKeyPress = useKeyPress("Escape");

  const handleSearch = (e: any) => {
    setSearchPhrase(e.target.value);
    setShowDropDown(e.target.value !== "");
    setSearchedCategories(searchCategory(categoryTree, e.target.value, 5));
  };

  const handleDropDownSelection = (item: any, enter?: boolean) => {
    if (item) setSearchPhrase(item.name);
    if (enter) setShowDropDown(false);
  };

  useEffect(() => {
    if (escapeKeyPress) {
      setShowDropDown(false);
    }
  }, [escapeKeyPress]);

  useEffect(() => {
    if (getDropDownStatus) {
      getDropDownStatus(showDropDown);
    }
  }, [showDropDown]);

  return (
    <Box
      width="100%"
      justifyContent="center"
      padding="2em 3em 0em 3em"
      position="relative"
    >
      <CustomField
        size="lg"
        borderRadius="md"
        value={searchPhrase}
        placeholder="Search Categories"
        onChange={handleSearch}
        {...props}
      />
      {showDropDown && (
        <SearchDropDown
          items={searchedCategories}
          width="100%"
          mt="2%"
          borderRadius="lg"
          selectedCb={handleDropDownSelection}
        />
      )}
    </Box>
  );
};

export default CategorySearch;
