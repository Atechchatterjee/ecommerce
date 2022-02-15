import React, { useEffect, useState } from "react";
import { Container, Image } from "@chakra-ui/react";
import axios from "axios";
import constants from "../../../util/Constants";

const addProductImage = async (productId: number | string) =>
  new Promise((resolve) => {
    axios
      .post(
        `${constants.url}/shop/addProductImage/`,
        {
          productId,
        },
        { withCredentials: true }
      )
      .then(resolve)
      .catch((err) => console.error(err));
  });

const ImageGallery: React.FC<{ product: any }> = ({ product }) => {
  const [productImages, setProductImages] = useState<any[]>([]);

  useEffect(() => {}, []);

  return (
    <Container boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1">
      <Image />
    </Container>
  );
};

export default ImageGallery;
