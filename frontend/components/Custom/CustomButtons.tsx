import { Button, BoxProps } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdDone } from "react-icons/md";

interface CustomButtonProps extends BoxProps {
  iconSize?: string | number;
}

export const SaveButton = ({ iconSize, ...props }: CustomButtonProps) => {
  return (
    <Button variant="primarySolid" padding="0.8em" {...props}>
      <MdDone size={iconSize || 20} />
    </Button>
  );
};

export const DeleteButton = ({ iconSize, ...props }: CustomButtonProps) => {
  return (
    <Button variant="primarySolid" {...props}>
      <FaTrash size={iconSize || 17} />
    </Button>
  );
};

export const AddButton = ({ iconSize, ...props }: CustomButtonProps) => {
  return (
    <Button
      width="8%"
      mb="0.5em"
      padding="0.8em"
      variant="primarySolid"
      {...props}
    >
      <FiPlus size={iconSize || 30} />
    </Button>
  );
};

export default Button;
