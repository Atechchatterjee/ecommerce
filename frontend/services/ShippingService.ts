import api from "../util/AxiosApi";

interface ShippingDetails {
  address: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
}

export const createShippingQuery = async (shippingDetails: ShippingDetails) => {
  await api.post(`/checkout/create-shipping-query/`, shippingDetails, {
    withCredentials: true,
  });
  return Promise.resolve();
};
