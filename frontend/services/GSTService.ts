import api from "../util/AxiosApi";

interface GSTData {
  cgst: string;
  sgst: string;
  igst: string;
}

export const fetchGST = async (): Promise<any> => {
  const res = await api.get('/shop/fetch-gst/')
  if(res) return new Promise((resolve) => resolve(res));
  else return new Promise((_, reject) => reject());
};

export const addGST = async (data: GSTData): Promise<any> => {
  const res = await api.post('/shop/add-gst/', data, {withCredentials: true});
  return new Promise((resolve) => resolve(res));
}

export const deleteGST = async (ids: number[]): Promise<any> => {
  const res = await api.delete(`/shop/delete-gst/${ids.join(',')}/`, {withCredentials: true});
  return new Promise((resolve) => resolve(res));
}