import { Tooltip } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  onDelete?: Function;
}

const DeleteBtn: React.FC<Props> = ({ onDelete }) => {
  return (
    <Tooltip label="Delete">
      <span style={{ float: "right" }}>
        <BsFillTrashFill
          style={{
            float: "right",
            marginTop: "0.56em",
            marginRight: "0.5em",
          }}
          size="18"
          color="#BF3E3D"
          cursor="pointer"
          onClick={() => {
            if (onDelete) onDelete();
          }}
        />
      </span>
    </Tooltip>
  );
};

export default DeleteBtn;
