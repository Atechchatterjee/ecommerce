import React, { useMemo, useState, useEffect } from "react";
import constants from "../../util/Constants";
import Product from "../Shop/Product";
import {
  Button,
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
import { Product as ProductType } from "../../types/shop";

interface Product {
  product_id: number;
  description: string;
  image: any;
  name: string;
  price: string;
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
  const [columns, _] = useState<string>("3");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [prdDel, setPrdDel] = useState<Product>();

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

  // useMemo(async () => await fetchAllProducts(), [fetchAllProducts]).then(
  //   (products) => {
  //     setAllProducts(products);
  //   }
  // );

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
    <Center marginTop="3em" width="100%">
      <Grid
        h="inherit"
        width="8xl"
        gap={12}
        templateColumns={`repeat(${columns}, 1fr)`}
        templateRows={`repeat(${Math.ceil(
          allProducts.length / parseInt(columns)
        )}, 1fr)`}
      >
        {allProducts.map(
          ({ name, image, description, price, product_id, category }) => (
            <GridItem key={product_id}>
              <Product
                key={product_id}
                id={product_id}
                name={name}
                image={image}
                description={description}
                price={price}
                editable
                cb={(id, name, description, price, img) => {
                  // updates the product list in the db
                  updateChanges(id, name, description, price, img);
                  updateProduct({
                    // update the product list locally
                    product_id,
                    name,
                    description,
                    price,
                    image,
                    category,
                  });
                }}
                onDelete={() => {
                  setIsOpen(true);
                  setPrdDel({
                    product_id,
                    name,
                    description,
                    price,
                    image,
                    category,
                  });
                }}
              />
            </GridItem>
          )
        )}
      </Grid>
      <DeleteModal
        confirmDelete={() => {
          setDel(true);
          if (prdDel) deleteProduct(prdDel.product_id);
        }}
      />
    </Center>
  );
};

export default AllProducts;
