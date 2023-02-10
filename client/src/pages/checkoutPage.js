import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  Flex,
  HStack,
  flexbox,
  Center,
} from "@chakra-ui/react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);

  const { state: order } = useLocation();
  console.log("eeeeeeeeeeeee", order);

  const placeOrder = async (e, product_id, quantity, totalPrice) => {
    e.preventDefault();
    const config = {
      url: "/api/order/add",
      method: "POST",
      data: {
        productId: product_id,
        quantity: quantity,
        firstName,
        lastName,
        address,
        city,
        country,
        phone,
        totalPrice: totalPrice,
      },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    try {
      const data = await axios(config);
      console.log("------------------->", data);
      // navigate("/success", { state: product });
      data.data.quantity = quantity;
      navigate("/checkout", { state: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" p={10} ml="4rem">
      <HStack display={"flex"} justifyContent={"space-between"} w={"90%"}>
        <Box>
          <Text
            fontSize={"2rem"}
            fontWeight="extrabold"
            mb={4}
            borderBottom="1px solid gray"
          >
            Shipping information
          </Text>
          <form
            onSubmit={(e) => {
              placeOrder(
                e,
                order?.product._id,
                order.quantity,
                order?.totalPrice
              );
            }}
          >
            <HStack>
              <FormControl>
                <FormLabel
                  fontWeight={"bold"}
                  fontSize={"1rem"}
                  htmlFor="first-name"
                >
                  First Name
                </FormLabel>
                <Input
                  borderRadius={0}
                  backgroundColor="gray.100"
                  placeholder="Shashank"
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required={true}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontWeight={"bold"} htmlFor="last-name">
                  Last Name
                </FormLabel>
                <Input
                  borderRadius={0}
                  backgroundColor="gray.100"
                  placeholder="Achar"
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required={true}
                />
              </FormControl>
            </HStack>
            <FormControl mt={2}>
              <FormLabel
                fontWeight={"bold"}
                fontSize={"1rem"}
                htmlFor="address"
              >
                Address
              </FormLabel>
              <Input
                borderRadius={0}
                backgroundColor="gray.100"
                placeholder="Address"
                type="text"
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required={true}
              />
            </FormControl>
            <HStack>
              <FormControl mt={2}>
                <FormLabel fontWeight={"bold"} fontSize={"1rem"} htmlFor="city">
                  City
                </FormLabel>
                <Input
                  borderRadius={0}
                  backgroundColor="gray.100"
                  placeholder="Bangalore"
                  type="text"
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required={true}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel
                  fontWeight={"bold"}
                  fontSize={"1rem"}
                  mt={2}
                  htmlFor="country"
                >
                  Country
                </FormLabel>
                <Input
                  borderRadius={0}
                  backgroundColor="gray.100"
                  placeholder="India"
                  type="text"
                  id="country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  required={true}
                />
              </FormControl>
            </HStack>

            <FormControl mt={2}>
              <FormLabel fontWeight={"bold"} fontSize={"1rem"} htmlFor="phone">
                Phone Number
              </FormLabel>
              <Input
                borderRadius={0}
                backgroundColor="gray.100"
                placeholder="000 111 2222"
                type="text"
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required={true}
              />
            </FormControl>
            <Button
              mt={10}
              colorScheme="messenger"
              type="submit"
              w="100%"
              borderRadius={0}
            >
              Place Order
            </Button>
          </form>
        </Box>
        <Box
          fontSize={"1rem"}
          mr={"4rem"}
          backgroundColor="gray.50"
          w={"40rem"}
          h={"25rem"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            alignItems={"center"}
            h={"60%"}
          >
            <Text fontSize={"2rem"} fontWeight="extrabold" mb={4} ml={5}>
              Order summary
            </Text>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-around"}
              h={"100%"}
              w={"70%"}
            >
              <HStack
                w={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w={"60%"}
                >
                  <Image
                    src={order?.product.imageUrl}
                    alt="product"
                    maxW={"75px"}
                    minW={"75px"}
                    minH={"75px"}
                    maxH={"75px"}
                  />
                  <Text fontWeight="bold" ml={5}>
                    {order?.product.name}
                  </Text>
                </Box>
                <Text fontWeight="bold">$ {order?.product.price}</Text>
              </HStack>
              <HStack
                w={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>Quantity</Text>
                <Text fontWeight="bold">{order?.quantity}</Text>
              </HStack>
              <HStack
                w={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>Tax</Text>
                <Text fontWeight="bold">$ 00.00 </Text>
              </HStack>
              <hr></hr>
              <HStack
                w={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Text>Total</Text>
                <Text fontWeight="bold">$ {order?.totalPrice}.00</Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      </HStack>
    </Flex>
  );
};

export default CheckoutPage;
