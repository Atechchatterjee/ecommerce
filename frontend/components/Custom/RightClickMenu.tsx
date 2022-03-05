import { Container, Box, List, ListItem } from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const RightClickMenu: React.FC = ({ children }) => {
  const [x, setX] = useState<number>(-1);
  const [y, setY] = useState<number>(-1);
  const clickAreaRef = useRef<any>();

  const ClickMenu = ({ list }: { list: string[] }) => {
    return (
      <Container
        bgColor="white"
        position="absolute"
        width="5em"
        top={y + "px"}
        left={x + "px"}
        display={x !== -1 && y !== -1 ? "block" : "none"}
        zIndex="10"
      >
        <List>
          {list.map((item, indx) => (
            <ListItem key={indx} color="black">
              {item}
            </ListItem>
          ))}
        </List>
      </Container>
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
      }}
    >
      {children}
      {/* <ClickMenu list={["a", "b", "c"]} /> */}
    </Box>
  );
};

export default RightClickMenu;
