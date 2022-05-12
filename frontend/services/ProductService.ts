import api from "../util/AxiosApi"

export const addProduct = async (formData: FormData) => {
  const res = await api.post("/shop/createProduct/", formData, {withCredentials: true});
  return Promise.resolve(res);
}

export const updateProduct = async (data: any) => {
  const res = await api.post('/shop/updateproduct/', data, {withCredentials: true});
  if (res.status === 200) return Promise.resolve(res);
}

// TODO: change post method to get
export const getProductInfo = async (productId: any) => {
  const res = await api.post('/shop/getproduct/', {id: productId})
  if(res) {
    // change product_id field to id
    let modifiedProduct = {
      ...res.data.product,
      id: res.data.product.product_id,
    };
    delete modifiedProduct["product_id"];
    return Promise.resolve(modifiedProduct);
  }
}

export const getProductPrice = async (productId: number) => {
  const res = await api.get(`/shop/get-product-prices/${productId}/`)
  if(res) return Promise.resolve(res.data);
}

export const addProductImages = async (formData: FormData) => {
  const res = await api.post('/shop/addproductimages/', formData, {withCredentials: true});
  if (res) return Promise.resolve(res);
}