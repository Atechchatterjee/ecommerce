import React, { useContext } from "react";
import { Tooltip } from "@chakra-ui/react";
import { RiEditBoxLine, RiEditBoxFill } from "react-icons/ri";
import { ProductContext } from "../../../context/ProductContext";

const EditBtn: React.FC = () => {
  const { edit, setEdit, setTriggerUpload } = useContext(ProductContext);

  if (!edit)
    return (
      <Tooltip label="Edit">
        <span style={{ float: "right" }}>
          <RiEditBoxLine
            color={"#091353"}
            size="20"
            style={{
              float: "right",
              cursor: "pointer",
              marginRight: "0.5em",
              marginTop: "0.5em",
            }}
            onClick={() => {
              setEdit(!edit);
              setTriggerUpload(false);
            }}
          />
        </span>
      </Tooltip>
    );
  else
    return (
      <Tooltip label="Edit">
        <span style={{ float: "right" }}>
          <RiEditBoxFill
            color={"#091353"}
            size="20"
            style={{
              float: "right",
              cursor: "pointer",
              marginRight: "0.5em",
              marginTop: "0.5em",
            }}
            onClick={() => {
              setEdit(!edit);
            }}
          />
        </span>
      </Tooltip>
    );
};

export default EditBtn;
