import React, { useState, useEffect } from "react";
import Product from "../Shop/Product";
import {
  Button,
  Box,
  Grid,
  GridItem,
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
import Pagination from "../Widgets/Pagination";

const fetchAllProducts = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    getAllProducts(13).then((allProducts) => {
      console.table(allProducts);
      resolve(allProducts);
    });
  });
};

const AllProducts: React.FunctionComponent = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [prdDel, setPrdDel] = useState<any>();
  const [columns] = useDynamicColumns(4, [1700, 1300, 860]);
  const [pageLimit, setPageLimit] = useState<number>(8);
  const [noOfProductDisplayed, setNoOfProductDisplayed] =
    useState<number>(pageLimit);

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

  // removes the product from the local array of product values
  const removeProduct = (product: any | undefined) => {
    if (!product) return;
    let copyProducts: any[] = allProducts.filter((el) => {
      return product.product_id !== el.product_id;
    });
    setAllProducts(copyProducts);
  };

  useEffect(() => {
    fetchAllProducts().then((allProducts) => setAllProducts(allProducts));
  }, []);

  useEffect(() => {
    if (del) {
      removeProduct(prdDel);
      setDel(false);
    }
  }, [del, setDel, prdDel, setPrdDel]);

  return (
    <Box marginTop="3em" width="100%" overflow="hidden" padding="0 2% 3% 2%">
      <Pagination
        wrapperEl={({ children }: any) => (
          <Grid
            h="inherit"
            gap={6}
            templateColumns={`repeat(${columns}, 1fr)`}
            templateRows={`repeat(${Math.ceil(
              noOfProductDisplayed / columns
            )}, 1fr)`}
          >
            {children}
          </Grid>
        )}
        pageLimit={pageLimit}
        maxEl={allProducts.length}
        getNoOfElDisplayed={(n) => {
          setNoOfProductDisplayed(n);
        }}
      >
        {allProducts.map((product) => (
          <GridItem key={product.product_id}>
            <ProductInfoContext.Provider
              value={{
                productInfo: [{ ...product, id: product.product_id }, () => {}],
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
          </GridItem>
        ))}
      </Pagination>
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
