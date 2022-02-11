import { NextPage } from "next";
import AddProduct from "../../components/Admin/AddProduct";
import WithAuth from "../../util/WithAuth";

const MainPanel: NextPage = () => {
  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default WithAuth(MainPanel, { admin: true });
