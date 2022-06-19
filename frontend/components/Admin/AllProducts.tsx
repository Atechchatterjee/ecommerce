import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Product from "../Shop/Product";
import {
  Button,
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDynamicColumns } from "../../hooks/useDynamicColumns";
import { ProductInfoContext } from "../../context/ProductInfoContext";
import { getAllProducts, deleteProduct } from "../../services/ProductService";
import usePagination from "../../hooks/usePagination";
import PaginationBar from "../Widgets/PaginationBar";

const AllProducts: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [prdDel, setPrdDel] = useState<any>();
  const [columns] = useDynamicColumns(4, [1700, 1300, 860]);
  const [pageLimit] = useState<number>(8);
  const { data: allProducts, isLoading } = useQuery(
    ["all-products", del],
    async () => await getAllProducts()
  );

  // modal to confirm delete-action
  const DeleteModal: React.FC<{ confirmDelete: Function }> = ({
    confirmDelete,
  }) => {
    return (
      <Modal onClose={() => setIsOpen(false)} size="md" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this product?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setIsOpen(false);
                confirmDelete();
              }}
            >
              yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  useEffect(() => {
    if (del) {
      setDel(false);
    }
  }, [del, setDel, prdDel, setPrdDel]);

  const {
    startIndx,
    endIndx,
    moveNext,
    movePrev,
    moveToPage,
    numberOfPages,
    currentSelectedPage,
    numberOfElementDisplayed,
  } = usePagination({ pageLimit, maxEl: allProducts?.length || 0 });

  return (
    <Box marginTop="3em" width="100%" overflow="hidden" padding="0 2% 3% 2%">
      <Grid
        h="inherit"
        gap={6}
        templateColumns={`repeat(${columns}, 1fr)`}
        templateRows={`repeat(${Math.ceil(
          numberOfElementDisplayed / columns
        )}, 1fr)`}
      >
        {allProducts &&
          allProducts
            .filter((_: any, i: number) => i >= startIndx && i < endIndx)
            .map((product: any) => (
              <ProductInfoContext.Provider
                value={{
                  productInfo: [
                    { ...product, id: product.product_id },
                    () => {},
                  ],
                }}
              >
                <Product
                  key={product.product_id}
                  onDelete={() => {
                    setIsOpen(true);
                    setPrdDel(product);
                  }}
                  editable
                />
              </ProductInfoContext.Provider>
            ))}
      </Grid>
      {!isLoading && (
        <PaginationBar
          {...{
            moveNext,
            movePrev,
            moveToPage,
            currentSelectedPage,
            numberOfPages,
          }}
        />
      )}
      <DeleteModal
        confirmDelete={() => {
          setDel(true);
          if (prdDel) deleteProduct(prdDel.product_id);
        }}
      />
    </Box>
  );
};

export default AllProducts;
