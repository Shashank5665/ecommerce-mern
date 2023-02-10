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
const OrderPage = () => {
  //FUNCTIONS
  const [orders, setOrders] = useState([]);

  //--------------------------------------------------------------------------------------------------------------------------------

  //WRITE LIKE THE BELOW CODE, IF THE DATA YOU ARE GETTING FROM THE 'GET' REQUEST IS EMPTY
  //CREATE A SEPARETE FUNCTION AND CALL IT IN THE USEEFFECT
  useEffect(() => {
    const fetchOrders = async () => {
      const config = {
        url: "/api/order/pastOrders",
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

  //--------------------------------------------------------------------------------------------------------------------------------

  //STYLES
  const myStyle1 = {
    margin: "10px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
  };

  //--------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
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
