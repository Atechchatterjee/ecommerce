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

export const getAllShippingQueries = async (): Promise<any[]> => {
  const res = await api.get(`/checkout/get-all-shipping-queries/`, {
    withCredentials: true,
  });
  if (res.status === 200) return Promise.resolve(res.data.shipping_queries);
  else return Promise.reject();
};

export const approveShippingQueries = async (
  shippingQueries: { id: number; charges: string }[]
) => {
  const res = await api.post(
    `/checkout/approve-shipping-queries/`,
    { queries: shippingQueries },
    { withCredentials: true }
  );
  if (res.status === 200) return Promise.resolve();
  else return Promise.reject();
};

export const getShippingDetails = async (): Promise<any> => {
  const res = await api.get(`/checkout/get-shipping-details/`, {
    withCredentials: true,
  });
  if (res && res.status === 200)
    return Promise.resolve(res.data.shipping_details);
  else return Promise.reject();
};

export const getShippingQuery = async () => {
  const res = await api.get(`/checkout/get-shipping-query/`, {
    withCredentials: true,
  });
  if (res && res.status === 200) return Promise.resolve(res.data.queries);
  else return Promise.reject();
};
