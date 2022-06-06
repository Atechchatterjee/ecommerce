import api from "../util/AxiosApi";

export const removeUnits = async (unit: any) => {
  const res = await api.post(
    "/shop/remove-units/",
    { unitId: unit.unit_id },
    { withCredentials: true }
  );
  return Promise.resolve(res);
};

export const addUnits = async (unit: string) => {
  if (unit.trim() == "") {
    alert("Please enter a unit");
    return;
  }

  const res = await api.post(
    "/shop/add-units/",
    { unitValue: unit },
    { withCredentials: true }
  );

  return Promise.resolve(res);
};

export const fetchUnits = async (): Promise<any[]> => {
  const res = await api.get("/shop/get-units/");
  return Promise.resolve(res.data.units);
};
