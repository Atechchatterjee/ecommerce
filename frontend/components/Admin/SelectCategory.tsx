import React, { useEffect, useRef, useState } from "react";
import { Category, CategoryMap } from "../../types/shop";
import { CategoryNode, convertToCustomTree } from "../../util/Tree";
import { Button, BoxProps } from "@chakra-ui/button";
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
import { getAllCategory } from "../../services/CategoryService";

interface Props extends BoxProps {
  selectCb?: ({
    selectedCategory,
  }: {
    selectedCategory: CategoryNode | null;
  }) => void;
  text?: string;
  includeNone?: boolean;
}

const SelectCategory = ({
  selectCb: onSelect,
  text,
  includeNone,
  ...props
}: Props) => {
  const categoryMap = useRef<CategoryMap>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryNode | null | undefined
  >(undefined);
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

  const handleSelect = (node: any) => {
    let id = node.val.id;
    if (typeof id === "number") {
      setSelectedCategory(node);
      if (id < 0) id = null;
    } else if (typeof id === "string") {
      id = parseInt(id);
      if (id < 0) id = null;
      setSelectedCategory(node);
    } else {
      id = null;
      setSelectedCategory(null);
    }

    // callback to return category name and selected category id
    if (onSelect) {
      onSelect({
        selectedCategory: node,
      });
    }
  };

  const TriggerButtonText: React.FC = () => {
    switch (selectedCategory?.val.id) {
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
      case undefined:
        return <> {text ? text : "Sub Category"}</>;
      default:
        return <>{categoryMap.current[selectedCategory?.val.id]}</>;
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        variant="primarySolid"
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
              selectCb={(node: any) => handleSelect(node)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="primarySolid" onClick={() => setModalOpen(false)}>
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCategory;
