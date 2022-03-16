import React, { useEffect, useRef, useState } from "react";
import { Category, CategoryMap } from "../../types/shop";
import { convertToCustomTree } from "../../util/Tree";
import axios from "axios";
import constants from "../../util/Constants";
import { Button, ButtonProps } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import CustomTree from "../Custom/CustomTree";

export const getAllCategory = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(`${constants.url}/shop/getallcategory/`, {
      withCredentials: true,
    });
    return Promise.resolve(res.data.categories);
  } catch (err) {
    return Promise.reject(err);
  }
};

interface Props extends ButtonProps {
  selectCb?: ({
    selectedCategory,
  }: {
    selectedCategory: number | null;
  }) => void;
  text?: string;
  includeNone?: boolean;
}

const SelectCategory: React.FC<Props> = ({
  selectCb: onSelect,
  text,
  includeNone,
  ...props
}) => {
  const categoryMap = useRef<CategoryMap>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(-2);
  const [customTree, setCustomTree] = useState<any>([]);

  const createTree = (categories: Category[]) => {
    if (includeNone) {
      categories.push({
        category_id: null,
        category_name: "None",
        sub_category: null,
      });
    }

    // creating a categoryTree from given categories from db
    const customTree = convertToCustomTree(categories);
    setCustomTree(customTree);

    if (includeNone) categoryMap.current[-1] = "None";

    // setting up the category map
    categories.forEach(({ category_name, category_id }) => {
      if (category_id) categoryMap.current[category_id] = category_name;
    });
  };

  useEffect(() => {
    getAllCategory().then(createTree);
  }, []);

  const handleSelect = (id: any) => {
    if (typeof id === "number") {
      setSelectedCategory(id);
      if (id < 0) id = null;
    } else if (typeof id === "string") {
      id = parseInt(id);
      if (id < 0) id = null;
      setSelectedCategory(id);
    } else {
      id = null;
      setSelectedCategory(null);
    }

    // callback to return category name and selected category id
    if (onSelect) {
      onSelect({
        selectedCategory: id,
      });
    }
  };

  const TriggerButtonText: React.FC = () => {
    switch (selectedCategory) {
      case null:
        return (
          <>
            {includeNone
              ? categoryMap.current[-1]
              : text
              ? text
              : "Sub Category"}
          </>
        );
      case -2:
        return <> {text ? text : "Sub Category"}</>;
      default:
        return <>{categoryMap.current[selectedCategory]}</>;
    }
  };

  return (
    <>
      <Button
        // variant={variant || "pinkSolid"}
        // colorScheme={colorScheme ? colorScheme : ""}
        // backgroundColor={bgColor ? bgColor : "teal"}
        // width={width ? width : "full"}
        // marginTop={marginTop ? marginTop : "0"}
        // borderRadius={borderRadius ? borderRadius : "md"}
        // height={height ? height : "2.5em"}
        onClick={() => {
          setModalOpen(true);
        }}
        {...props}
      >
        <TriggerButtonText />
      </Button>
      <Modal
        onClose={() => setModalOpen(false)}
        size={"xl"}
        isOpen={modalOpen}
        blockScrollOnMount={false}
        colorScheme="whiteAlpha"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700" fontFamily="Sora">
            Select Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomTree
              root={customTree.root}
              key="-1"
              marginLeft="-1.8em"
              disableRightClick
              selectCb={(id: any) => handleSelect(id)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="blueSolid" onClick={() => setModalOpen(false)}>
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCategory;
