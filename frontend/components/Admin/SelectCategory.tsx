import React, { useEffect, useRef, useState } from "react";
import Tree from "@naisutech/react-tree";
import { Category, CategoryMap } from "../../types/shop";
import { convertToCategoryTree, convertToTree } from "../../util/Tree";
import axios from "axios";
import constants from "../../util/Constants";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";

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

interface Props {
  onSelect?: ({
    selectedCategory,
  }: {
    selectedCategory: number | null;
  }) => void;
  color?: string;
  marginTop?: string;
  width?: string;
}

const SelectCategory: React.FC<Props> = ({
  onSelect,
  color,
  width,
  marginTop,
}) => {
  const categoryMap = useRef<CategoryMap>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(-2);

  useEffect(() => {
    getAllCategory().then((categories) => {
      categories.push({
        category_id: null,
        category_name: "None",
        sub_category: null,
      });
      const tree = convertToCategoryTree(categories);
      const nodeTree = convertToTree(tree);

      setNodes(nodeTree);

      categoryMap.current[-1] = "None";

      // setting up the category map
      categories.forEach(({ category_name, category_id }) => {
        if (category_id) categoryMap.current[category_id] = category_name;
      });
    });
  }, []);

  return (
    <>
      <Button
        color={color ? color : "gray.400"}
        width={width ? width : "full"}
        marginTop={marginTop ? marginTop : "0"}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {(() => {
          switch (selectedCategory) {
            case null:
              return categoryMap.current[-1];
            case -2:
              return "Sub Category";
            default:
              return categoryMap.current[selectedCategory];
          }
        })()}
      </Button>
      <Modal onClose={() => setModalOpen(false)} size={"md"} isOpen={modalOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tree
              theme="light"
              nodes={nodes}
              size="full"
              grow={true}
              onSelect={(nodeId) => {
                let id: number | string | null = nodeId[0];
                console.log("onSelect id = ", id);

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
                if (onSelect)
                  onSelect({
                    selectedCategory: id,
                  });
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModalOpen(false)}>Select</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCategory;
