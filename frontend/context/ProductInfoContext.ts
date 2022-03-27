import { createContext } from 'react';
import {ProductType} from '../types/shop';

interface ProductInfoProps {
    productInfo :
      [product: ProductType,
      setProduct: (_:ProductType) => void]
}

export const ProductInfoContext = createContext<ProductInfoProps>({
    productInfo: [{
      id: 0,
      name: "",
      price: "",
      description: "",
      category: 0,
      image: []
    },
    () => {}],
});