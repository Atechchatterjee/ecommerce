import React, { useState, useEffect } from "react";
import constants from "../../util/Constants";
import Product from "../Shop/Product";
import {
  Button,
  Box,
  Center,
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
import axios from "axios";
import { useDynamicColumns } from "../../hooks/useDynamicColumns";
import { ProductInfoContext } from "../../context/ProductInfoContext";

interface Product {
  product_id: number;
  description: string;
  image: any;
  name: string;
  price: any[];
  category: number;
}

const fetchAllProducts = async (): Promise<Product[]> => {
  console.log("fetching all products");
  return new Promise((resolve) => {
    axios
      .get(`${constants.url}/shop/getallproducts/`, { withCredentials: true })
      .then((res) => {
        const allProducts = res.data.allProducts;
        resolve(allProducts);
      })
      .catch((err) => console.error(err));
  });
};

const AllProducts: React.FunctionComponent = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [prdDel, setPrdDel] = useState<Product>();
  const [columns] = useDynamicColumns(4, [1700, 1300, 860]);

  const deleteProduct = (productId: any) => {
    axios
      .delete(`${constants.url}/shop/delete-product/${productId}/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

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

  // updates the local array of product values
  const updateProduct = (updatedProduct: Product) => {
    let copyProducts: Product[] = allProducts.map((el) => {
      if (updatedProduct.product_id === el.product_id) return updatedProduct;
      else return el;
    });
    setAllProducts(copyProducts);
  };

  // removes the product from the local array of product values
  const removeProduct = (product: Product | undefined) => {
    if (!product) return;
    let copyProducts: Product[] = allProducts.filter((el) => {
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

  // sends changes/updates to backend to updates the db
  const updateChanges = (
    id: number,
    name: string,
    description: string,
    price: string,
    image: any
  ) => {
    let formData = new FormData();

    formData.append("id", id.toString());
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    console.log(formData.get("image"));

    axios
      .post(`${constants.url}/shop/updateproduct/`, formData, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        fetchAllProducts().then((allProducts) => setAllProducts(allProducts));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box marginTop="3em" width="100%" overflow="hidden" padding="0 2% 3% 2%">
      <Grid
        h="inherit"
        gap={6}
        templateColumns={`repeat(${columns}, 1fr)`}
        templateRows={`repeat(${Math.ceil(allProducts.length / columns)}, 1fr)`}
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
              />
            </ProductInfoContext.Provider>
          </GridItem>
        ))}
      </Grid>
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
