import React, { useEffect, useRef, useState } from "react";
import Tree, { ThemeSettings } from "@naisutech/react-tree";
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

// theme for category tree
const myTheme: ThemeSettings = {
  theme1: {
    text: "#fafafa",
    bg: "#091353",
    indicator: "#9D84B7",
    separator: "#091353",
    icon: "#9D84B7",
    selectedBg: "#9D84B7",
    selectedText: "#fafafa",
    hoverBg: "#4F5BBA",
    hoverText: "#fafafa",
    accentBg: "#2d3439",
    accentText: "#999",
    textSize: "large",
  },
};

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
  colorScheme?: string;
  marginTop?: string;
  width?: string;
  borderRadius?: string;
  text?: string;
  includeNone?: boolean;
  bgColor?: string;
  height?: string;
}

const SelectCategory: React.FC<Props> = ({
  onSelect,
  colorScheme,
  width,
  marginTop,
  borderRadius,
  text,
  includeNone,
  bgColor,
  height,
}) => {
  const categoryMap = useRef<CategoryMap>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(-2);

  useEffect(() => {
    getAllCategory().then((categories) => {
      if (includeNone) {
        categories.push({
          category_id: null,
          category_name: "None",
          sub_category: null,
        });
      }

      // creating a categoryTree from given categories from db
      const tree = convertToCategoryTree(categories);
      const nodeTree = convertToTree(tree);

      setNodes(nodeTree);

      if (includeNone) categoryMap.current[-1] = "None";

      // setting up the category map
      categories.forEach(({ category_name, category_id }) => {
        if (category_id) categoryMap.current[category_id] = category_name;
      });
    });
  }, []);

  return (
    <>
      <Button
        colorScheme={colorScheme ? colorScheme : ""}
        backgroundColor={bgColor ? bgColor : "teal"}
        width={width ? width : "full"}
        marginTop={marginTop ? marginTop : "0"}
        borderRadius={borderRadius ? borderRadius : "md"}
        height={height ? height : "2.5em"}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {(() => {
          switch (selectedCategory) {
            case null:
              return includeNone
                ? categoryMap.current[-1]
                : text
                ? text
                : "Sub Category";
            case -2:
              return text ? text : "Sub Category";
            default:
              return categoryMap.current[selectedCategory];
          }
        })()}
      </Button>
      <Modal
        onClose={() => setModalOpen(false)}
        size={"md"}
        isOpen={modalOpen}
        blockScrollOnMount={false}
        colorScheme="whiteAlpha"
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#091353">
          <ModalHeader color="white">Select Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tree
              theme="theme1"
              customTheme={myTheme}
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
            <Button onClick={() => setModalOpen(false)} colorScheme="facebook">
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCategory;
