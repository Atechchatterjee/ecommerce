import { createContext } from 'react';

type Product = {
  id: number | string;
  name: string;
  price: string;
  description: string;
  image: any[]
}

interface ProductInfoProps {
    productInfo : [product: Product,
    setProduct: (_:Product) => void]
}

export const ProductInfoContext = createContext<ProductInfoProps>({
    productInfo: [{
      id: 0,
      name: "",
      price: "",
      description: "",
      image: []
    },
    () => {}],
});