import { NextPage } from "next";
import {
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import WithAuth from "../../util/WithAuth";
import api from "../../util/AxiosApi";

interface Users {
  email: string;
  phNumber: string;
  name: string;
}

interface Orders {
  [email: string]: number;
}

const AdminCustomers: NextPage = () => {
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [orders, setOrders] = useState<Orders>({});

  const getAllUsers = async (): Promise<Users[]> => {
    return new Promise(async (resolve, reject) => {
      const res = await api.get("/admin/getallusers/", {
        withCredentials: true,
      });

      const allUsers = res.data.all_users;

      if (allUsers) {
        resolve(allUsers);
      } else {
        reject();
      }
    });
  };

  useEffect(() => {
    getAllUsers().then((allUsers) => {
      setAllUsers(allUsers);
      let orders: Orders = {};

      for (const user of allUsers) orders[user.email] = 1000;

      setOrders(orders);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Center marginTop="3em">
          <Table variant="simple" width="60em">
            <Thead>
              <Tr>
                <Th>Customer Name</Th>
                <Th>Customer Phone Number</Th>
                <Th>Customer Email Address</Th>
                <Th isNumeric>Number of Orders</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allUsers.map((user) => {
                return (
                  <Tr key={user.email}>
                    <Td>{user.name}</Td>
                    <Td>{user.phNumber}</Td>
                    <Td>{user.email}</Td>
                    <Td isNumeric>{orders[user.email]}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Center>
      </Container>
    </>
  );
};

export default WithAuth(AdminCustomers, { admin: true });
