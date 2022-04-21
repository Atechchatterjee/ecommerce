import React, { useState } from "react";
import { CustomField } from "../Custom/CustomField";
import { Box, InputProps } from "@chakra-ui/react";
import { CategoryTree } from "../../util/Tree";
import { searchCategory } from "../../util/SearchCategory";
import SearchDropDown from "./SearchDropDown";

interface CategoryTreeProps extends InputProps {
  categoryTree: CategoryTree;
}

const CategorySearch = ({ categoryTree, ...props }: CategoryTreeProps) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [searchedCategories, setSearchedCategories] = useState<any[]>([]);

  const handleChange = (e: any) => {
    setSearchPhrase(e.target.value);
    setSearchedCategories(searchCategory(categoryTree, e.target.value, 5));
  };

  return (
    <Box width="100%" justifyContent="center" padding="1em" position="relative">
      <CustomField
        value={searchPhrase}
        placeholder="Search Categories"
        onChange={handleChange}
        {...props}
      />
      {searchPhrase && (
        <SearchDropDown
          items={searchedCategories}
          width="95%"
          mt="2%"
          borderRadius="lg"
        />
      )}
    </Box>
  );
};

export default CategorySearch;
