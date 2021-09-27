import React, { useEffect, useState } from "react";
import {
  HStack,
  Text,
  Heading,
  Center,
  Link,
  Divider,
} from "@chakra-ui/layout";
import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/input";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { isAuthenticated } from "../util/Authenticated";

const CategoryMenu: React.FunctionComponent<any> = ({ ...props }) => {
  const [selectedItem, selectItem] = useState<string>("All Categories");

  return (
    <Menu {...props}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        style={{ fontSize: "0.9em" }}
        borderLeftRadius="3xl"
      >
        <Text>{selectedItem}</Text>
      </MenuButton>
      <MenuList style={{ fontSize: "0.9em" }}>
        <MenuItem
          value="All Categories"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          All Categories
        </MenuItem>
        <MenuItem
          value="Fashion"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Fashion
        </MenuItem>
        <MenuItem
          value="Furniture"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Furniture
        </MenuItem>
        <MenuItem
          value="Shoes"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Shoes
        </MenuItem>
        <MenuItem
          value="Sports"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Sports
        </MenuItem>
        <MenuItem
          value="Games"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Games
        </MenuItem>
        <MenuItem
          value="Computers"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Computers
        </MenuItem>
        <MenuItem
          value="Electronics"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Electronics
        </MenuItem>
        <MenuItem
          value="Kitechen"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Kitchen
        </MenuItem>
        <MenuItem
          value="Clothing"
          onClick={(event: any) => selectItem(event.target.value)}
        >
          Clothing
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [cookies] = useCookies(["user_session"]);

  useEffect(() => {
    isAuthenticated(cookies)
      .then(() => {
        console.log("user is authenticated");
        setAuthenticated(true);
      })
      .catch(() => {
        console.log("user is not authenticated");
        setAuthenticated(false);
      });
  }, []);

  return (
    <>
      <Center
        className="header-up"
        style={{
          width: "100%",
          height: "8em",
          backgroundColor: "#F40103",
          color: "white",
        }}
      >
        <HStack style={{ paddingTop: "0" }}>
          <Heading
            as="h1"
            size="md"
            isTruncated
            style={{ width: "18rem", marginLeft: "0", cursor: "pointer" }}
            onClick={() => window.location.assign("/")}
          >
            Ecommerce Design
          </Heading>
          <InputGroup
            style={{ width: "45rem", marginLeft: "7%", color: "gray" }}
          >
            <InputLeftAddon
              children={<CategoryMenu />}
              style={{ padding: "0.2px" }}
              borderLeftRadius="3xl"
              borderRightRadius="none"
            />
            <Input
              style={{ fontSize: "0.9em" }}
              placeholder="I am shopping for ..."
              backgroundColor="white"
              borderRadius="none"
            />
            <InputRightAddon
              children={
                <Text style={{ cursor: "pointer", fontSize: "0.8em" }}>
                  Search
                </Text>
              }
              style={{ backgroundColor: "#F9C200", color: "white" }}
              borderRadius="3xl"
            />
          </InputGroup>
          <HStack style={{ marginLeft: "10%" }} spacing={5}>
            <FaRegHeart size={25} style={{ cursor: "pointer" }} />
            <AiOutlineShopping
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => window.location.assign("/shop")}
            />
            <FaRegUser size={25} style={{ cursor: "pointer" }} />
          </HStack>
          {!authenticated ? (
            <Link style={{ marginLeft: "5em" }} href="/login">
              Login
            </Link>
          ) : (
            <Link style={{ marginLeft: "5em" }} href="/api/logout">
              logout
            </Link>
          )}
        </HStack>
      </Center>
      <Center
        className="header-mid"
        style={{
          backgroundColor: "#ffffff",
          marginLeft: "-50em",
          height: "3.2em",
        }}
      >
        <HStack style={{ color: "black" }}>
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon marginLeft={10} />}
              borderRadius="none"
              style={{ height: "3.2em" }}
              backgroundColor="white"
              _hover={{ backgroundColor: "#336699", color: "white" }}
              _active={{ backgroundColor: "#336699", color: "white" }}
            >
              <HStack>
                <BsListUl />
                <Text style={{ marginTop: "0.2em", marginLeft: "1em" }}>
                  Browse Categories
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="HomeGarden">Home Garden</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="BagsNShoes">Bags and Shoes</MenuItem>
              <MenuItem value="OutdoorFunNSports">
                Outdoor Fun and Sports
              </MenuItem>
              <MenuItem value="AutomobilesNBikes">
                Automobiles and Bikes
              </MenuItem>
              <MenuItem value="Toys and kids">Toys and Kids</MenuItem>
              <MenuItem value="HomeImprovement">Home Improvement</MenuItem>
              <MenuItem value="HealthNBeauty">Health and Beauty</MenuItem>
            </MenuList>
          </Menu>
          <Divider orientation="vertical" color="gray.500" />
          <Link fontWeight={700} color="gray.600" style={{ marginLeft: "1em" }}>
            All Products
          </Link>
          <Link fontWeight={700} color="gray.600" style={{ marginLeft: "1em" }}>
            Campaigns
          </Link>
        </HStack>
      </Center>
    </>
  );
};

export default Header;
