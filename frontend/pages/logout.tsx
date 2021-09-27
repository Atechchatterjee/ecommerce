import type { NextPage } from "next";
import axios from "axios";
import constants from "../util/Constants";

const Logout: NextPage = () => {
  return <></>;
};

export const getServerSideProps = () => {
  axios
    .get(`${constants.url}/auth/logout/`)
    .then((res) => console.log(res.data))
    .catch((err) => {
      console.error(err);
    });
  return {
    props: {},
  };
};

export default Logout;
