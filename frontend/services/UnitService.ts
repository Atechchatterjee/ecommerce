import axios from "axios";
import constants from "../util/Constants";


export  const removeUnits = async (unit: any) => {
    return new Promise((resolve, reject) => {
    axios
      .post(
        `${constants.url}/shop/remove-units/`,
        { unitId: unit.unit_id },
        { withCredentials: true }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
    });
  };

export  const addUnits = (unit: string) => {
    if (unit.trim() == "") {
      alert("Please enter a unit");
      return;
    }

    return new Promise((resolve, reject) => {
    axios
      .post(
        `${constants.url}/shop/add-units/`,
        { unitValue: unit },
        { withCredentials: true }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
    });
  };

export const fetchUnits = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.url}/shop/get-units/`)
        .then((res) => {
          resolve(res.data.units);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };