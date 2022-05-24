import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Text, ContainerProps, FlexProps, Button } from "@chakra-ui/react";
import {
  CategoryNode,
  CategoryTree,
  convertToCustomTree,
} from "../../util/Tree";
import CustomContainer from "../Custom/CustomContainer";
import { getAllCategory } from "../../services/CategoryService";
import CategorySearch from "../Widgets/CategorySearch";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { CustomField } from "../Custom/CustomField";
import { createCategory, deleteCategory } from "../../services/CategoryService";
import { FaTrash } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import ConfirmationModal from "../Widgets/ConfirmationModal";

interface DisplayCategoriesProps extends FlexProps {
  categories?: any[];
  selectCb?: (_: any) => void;
  deleteCb?: (_: any) => void;
}

const DisplayCategories = ({
  categories,
  selectCb,
  deleteCb,
  ...props
}: DisplayCategoriesProps) => {
  const [hoverId, setHoverId] = useState<number>(-1);

  const handleDeleteCategory = (category: any) => {
    if (deleteCb) deleteCb(category);
  };

  return (
    <Flex flexDirection="column" gridGap={4} {...props}>
      {categories?.length === 0 && (
        <Text
          fontFamily="sora"
          fontSize="lg"
          fontWeight="semibold"
          color="gray.500"
          textAlign="center"
        >
          No Sub Categories
        </Text>
      )}
      {categories?.map((category: any, indx) => (
        <AnimatePresence key={indx}>
          <motion.div
            key="modal"
            initial={{ x: -10 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex flexDirection="row" gridGap={2}>
              <Box
                key={indx}
                w="100%"
                borderRadius="md"
                backgroundColor={
                  hoverId !== category.val.id ? "white" : "primary.100"
                }
                color={hoverId === category.val.id ? "white" : "gray.800"}
                onMouseEnter={() => setHoverId(category.val.id)}
                onMouseLeave={() => setHoverId(-1)}
                boxShadow="rgba(99, 99, 99, 0.12) 1px 3px 8px 1px"
                padding="1.2rem 5%"
                flex="1"
                cursor="pointer"
                margin="0"
                onClick={() => {
                  if (selectCb) selectCb(category);
                }}
                transition="all ease-in-out 0.1s"
              >
                <Text
                  fontSize={{ base: "13px", md: "15px", lg: "16px" }}
                  isTruncated
                >
                  {category.val.name}
                </Text>
              </Box>

              <Button
                variant="ghost"
                color="secondary.200"
                size="lg"
                position="revert"
                padding="0% 2%"
                height="inherit"
                alignContent="right"
                onClick={() => handleDeleteCategory(category)}
                isDisabled={category.children.length > 0}
                _disabled={{ position: "revert", color: "secondary.100" }}
              >
                <FaTrash />
              </Button>
            </Flex>
          </motion.div>
        </AnimatePresence>
      ))}
    </Flex>
  );
};

const AddCategory = ({ ...props }: ContainerProps) => {
  const [customTree, setCustomTree] = useState<CategoryTree>();
  const [reRender, setReRender] = useState<boolean>(false);
  const [categoriesToDisplay, setCategoriesToDisplay] = useState<any[]>(
    customTree?.root.children || []
  );
  const [categoryStack, setCategoryStack] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(false);
  const [triggerDeleteModal, setTriggerDeleteModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>();

  const updateCategoryStack = (
    cur: CategoryNode,
    categoryStackLocal: CategoryNode[],
    itr: number,
    cb?: (_: CategoryNode[]) => void
  ) => {
    if (itr < categoryStackLocal.length) {
      const categoryInStack = categoryStackLocal[itr];
      cur.children.forEach((child) => {
        if (child.val.id === categoryInStack.val.id) {
          categoryStackLocal[itr] = child;
          console.log({ newChild: child });
          return updateCategoryStack(child, categoryStackLocal, itr + 1, cb);
        }
      });
    } else {
      if (cb) cb(categoryStackLocal);
    }
  };

  useEffect(() => {
    getAllCategory()
      .then((categories) => {
        const customTree = convertToCustomTree(categories);
        setCustomTree(customTree);
        setNewCategoryName("");
        const categoryStackCopy = categoryStack;
        updateCategoryStack(
          customTree.root,
          categoryStackCopy,
          0,
          (newCategoryStack) => {
            setCategoryStack(newCategoryStack);
          }
        );
        setReRender(false);
      })
      .catch(() => {
        setReRender(false);
      });
  }, [reRender]);

  const popCategoryFromStack = () => {
    setCategoryStack(categoryStack.slice(0, categoryStack.length - 1));
  };

  const peekCategoryStack = () =>
    categoryStack[categoryStack.length - 1] || customTree?.root || {};

  const DynamicHeading = () => {
    const category = peekCategoryStack();
    return category.val ? category.val.name : "Categories";
  };

  useEffect(() => {
    if (categoryStack.length > 0) {
      setCategoriesToDisplay(peekCategoryStack().children);
    } else if (customTree) {
      setCategoriesToDisplay(customTree.root.children);
    }
  }, [customTree, categoryStack]);

  useEffect(() => {
    deleteCategory(categoryToDelete?.val.id)
      .then(() => {
        setTimeout(() => {
          setReRender(true);
        }, 100);
        setConfirmDelete(false);
      })
      .catch((err) => {
        console.error(err);
        setConfirmDelete(false);
      });
  }, [confirmDelete]);

  const handleAddCategory = (e: any) => {
    const parentCategory = peekCategoryStack();
    createCategory({
      category_name: newCategoryName,
      sub_category: parentCategory.val ? parentCategory.val.id : null,
    })
      .then(() => {
        setReRender(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CustomContainer
      height="inherit"
      padding="2em 1em 2.5em 1em"
      marginBottom="5em"
      borderRadius="lg"
      {...props}
    >
      <Text
        fontWeight="bold"
        fontSize="2em"
        textColor="primary.900"
        textAlign="center"
      >
        <DynamicHeading />
      </Text>
      {customTree && (
        <CategorySearch
          padding="2em 9% 0em 8%"
          categoryTree={customTree}
          getDropDownStatus={(status) => setDropDownStatus(status)}
        />
      )}
      <ConfirmationModal
        open={triggerDeleteModal}
        setOpen={setTriggerDeleteModal}
        modalBody={<Text>Do you want to Delete this category?</Text>}
        confirmCb={() => {
          setConfirmDelete(true);
        }}
      />
      {customTree && customTree.root && (
        <AnimatePresence>
          <motion.div
            style={{
              width: "100%",
            }}
            key="modal"
            initial={{ x: -3, opacity: 0.5 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0.5 }}
          >
            <Box
              left="0.5%"
              w="100%"
              h="inherit"
              borderRadius="md"
              padding="0.2% 8% 0 8%"
              transition="all 0.2s ease-in-out"
              {...props}
            >
              <Flex flexDirection="column" gridGap={6} position="unset">
                <DisplayCategories
                  flex="1"
                  categories={categoriesToDisplay}
                  selectCb={(category) => {
                    setCategoriesToDisplay(category.children);
                    setCategoryStack([...categoryStack, category]);
                  }}
                  deleteCb={(category) => {
                    setCategoryToDelete(category);
                    setTriggerDeleteModal(true);
                  }}
                />
                <Flex flexDirection="row" gridGap={3} w="99%">
                  <CustomField
                    placeholder="Add Category"
                    zIndex={dropDownStatus ? "-1" : "1"}
                    value={newCategoryName}
                    borderRadius="md"
                    height="5.5vh"
                    onChange={(e: any) => setNewCategoryName(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    borderRadius="md"
                    size="md"
                    mt="0.8%"
                    h="4.8vh"
                    padding="0"
                    position="revert"
                    onClick={handleAddCategory}
                  >
                    <MdDone strokeWidth="0.03em" size="25" />
                  </Button>
                </Flex>
                <Flex
                  flexDirection="row"
                  justifyContent="right"
                  mt="5%"
                  gridGap={2}
                >
                  <Button
                    color="gray.100"
                    variant="primarySolid"
                    size="lg"
                    w="10%"
                    padding="0"
                    position="revert"
                    onClick={popCategoryFromStack}
                  >
                    <IoIosArrowBack size="1.1em" />
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </motion.div>
        </AnimatePresence>
      )}
    </CustomContainer>
  );
};

export default AddCategory;
