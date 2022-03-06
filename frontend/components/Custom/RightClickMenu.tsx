import { Text, Box, List, ListItem, Fade } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import CustomContainer from "./CustomContainer";

const RightClickMenu: React.FC<{ menuItems?: any[] }> = ({
  children,
  menuItems,
}) => {
  const [x, setX] = useState<number>(-1);
  const [y, setY] = useState<number>(-1);
  const clickAreaRef = useRef<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const ClickMenu = ({ list }: { list: any[] }) => {
    return (
      <Fade in={showMenu}>
        <CustomContainer
          borderRadius="md"
          bgColor="white"
          position="absolute"
          width="inherit"
          top={y + "px"}
          left={x + "px"}
          zIndex="10"
          padding="0.5em 1.2em"
        >
          <List userSelect="none">{list.map((item) => item)}</List>
        </CustomContainer>
      </Fade>
    );
  };

  return (
    <Box
      ref={clickAreaRef}
      width="inherit"
      onContextMenu={(e) => {
        e.preventDefault();
        setX(e.pageX);
        setY(e.pageY);
        console.log(`x : ${e.clientX} y : ${e.clientY}`);
        setShowMenu(true);
      }}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      {children}
      <ClickMenu list={menuItems || []} />
    </Box>
  );
};

export default RightClickMenu;
