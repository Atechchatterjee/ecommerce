import { createContext } from 'react';
import {Product} from '../types/shop';

interface ProductInfoProps {
    productInfo :
      [product: Product,
      setProduct: (_:Product) => void]
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