import React, { useEffect } from "react";
import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { CardBody, CardFooter } from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../services/helper";
const OrderPage = () => {
  //FUNCTIONS
  const [orders, setOrders] = useState([]);

  //--------------------------------------------------------------------------------------------------------------------------------

  //WRITE LIKE THE BELOW CODE, IF THE DATA YOU ARE GETTING FROM THE 'GET' REQUEST IS EMPTY
  //CREATE A SEPARETE FUNCTION AND CALL IT IN THE USEEFFECT
  useEffect(() => {
    const fetchOrders = async () => {
      const config = {
        url: `${BASE_URL}/api/order/pastOrders`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      try {
        const { data } = await axios(config);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const clearOrderList = async () => {
    const config = {
      url: `${BASE_URL}/api/order/clearOrderList`,
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    try {
      const { data } = await axios(config);
      setOrders([]);
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------------

  //STYLES
  const myStyle1 = {
    margin: "10px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
  };

  //--------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Button
        ml={"79%"}
        mt={3}
        w={"9rem"}
        colorScheme="red"
        display={"block"}
        variant="solid"
        borderRadius={5}
        onClick={clearOrderList}
        boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      >
        Clear list
      </Button>
      {orders.map((order) => (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          key={order._id}
          style={myStyle1}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            minW={{ base: "100%", sm: "200px" }}
            minH={{ base: "100%", sm: "200px" }}
            maxH={{ base: "100%", sm: "200px" }}
            src={order.productId.imageUrl}
            alt={order.productId.name}
          />
          <Stack>
            <CardBody>
              <Heading size="md">{order.productId.name}</Heading>
              <Text py="2">{order.productId.description}</Text>
              <Badge variant="subtle" colorScheme="green">
                Delivered ✓
              </Badge>
            </CardBody>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

export default OrderPage;
