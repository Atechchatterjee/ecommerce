import { useState } from "react";
import { Container, ContainerProps } from "@chakra-ui/react";

interface CustomContainerProps extends ContainerProps {
  interactive?: boolean;
  reverseEffect?: boolean;
}

const CustomContainer = ({
  interactive,
  reverseEffect,
  ...props
}: CustomContainerProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const normalBS = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
  const hoverBS = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
  if (!interactive) return <Container boxShadow={`${normalBS}`} {...props} />;
  return (
    <Container
      {...(hover
        ? { boxShadow: `${reverseEffect ? normalBS : hoverBS}` }
        : {
            boxShadow: `${reverseEffect ? hoverBS : normalBS}`,
          })}
      transition="box-shadow 300ms"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    />
  );
};

export default CustomContainer;
