import Fuse from "fuse.js";
import { InputGroup, InputGroupProps, InputRightAddon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { CustomField } from "../../Custom/CustomField";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps extends InputGroupProps {
  productState: [
    allProducts: any,
    setAllProducts: Dispatch<SetStateAction<any>>
  ];
  searchPhraseState: [
    serachPhrase: string,
    setSearchPhrase: Dispatch<SetStateAction<string>>
  ];
  searchBarAutoFocusState: [
    searchBarAutoFoucs: boolean,
    setSearchBarAutoFocus: Dispatch<SetStateAction<boolean>>
  ];
  originalProducts: any;
}

const SearchBar = ({
  productState,
  searchPhraseState,
  originalProducts,
  searchBarAutoFocusState,
  ...props
}: SearchBarProps) => {
  const [allProducts, setAllProducts] = productState;
  const [searchPhrase, setSearchPhrase] = searchPhraseState;
  const [searchBarAutoFocus, setSearchBarAutoFocus] = searchBarAutoFocusState;

  const [width] = useWindowDimensions();

  const search = () => {
    if (allProducts && originalProducts) {
      const fuse = new Fuse(originalProducts, {
        keys: ["name", "price"],
        fieldNormWeight: 1,
      });
      const output = fuse.search(searchPhrase);
      const filteredProduct: any[] = output.map(
        (eachOutput) => eachOutput.item
      );
      if (setAllProducts && filteredProduct.length > 0) {
        setAllProducts(filteredProduct);
      } else if (setAllProducts) {
        setAllProducts(originalProducts);
      }
    }
  };

  const handleSearchPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarAutoFocus(true);
    setSearchPhrase(e.target.value);
    if (e.target.value.length > 0) {
      search();
    } else if (setAllProducts && originalProducts) {
      setAllProducts(originalProducts);
    }
  };

  return (
    <InputGroup color="gray" display="flex" {...props}>
      <CustomField
        key={1}
        flex="0.78"
        placeholder="Search"
        value={searchPhrase}
        bg="primary.200"
        opacity="1"
        borderWidth="0"
        borderLeftRadius="md"
        borderRightRadius={width >= 700 ? "none" : "md"}
        onChange={handleSearchPhraseChange}
        onBlur={(e: any) => {
          if (e.target.value === "" && originalProducts && setAllProducts) {
            setAllProducts(originalProducts);
          }
        }}
        _focus={{ border: "none" }}
        autoFocus={searchBarAutoFocus}
        height="2.5rem"
        color="white"
      />
      {width >= 700 ? (
        <InputRightAddon
          flex="1"
          bg="primary.200"
          height="4.2%"
          minHeight="2.5em"
          color="white"
          border="none"
          position="relative"
          cursor="pointer"
        >
          <FaSearch />
        </InputRightAddon>
      ) : (
        <></>
      )}
    </InputGroup>
  );
};

export default SearchBar;
