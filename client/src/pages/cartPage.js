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
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BrowserRouter, useNavigate } from "react-router-dom";
const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  //--------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      const config = {
        url: "/api/cart",
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
        setCartItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, []);
  console.log("these are the items", cartItems);

  //--------------------------------------------------------------------------------------------------------------------------------

  const deleteItem = async (id) => {
    const config = {
      url: `/api/cart/remove/${id}`,
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    try {
      const cartUpdate = await axios(config);
      setCartItems((preValue) => {
        return {
          ...preValue,
          cart: preValue.cart.map((item) => {
            if (item.productId._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          }),
        };
      });
    } catch (error) {
      console.log(error);
      setCartItems((preValue) => {
        return {
          ...preValue,
          cart: preValue.cart.filter((item) => item.productId._id !== id),
        };
      });
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------------

  const checkoutOrder = async (product, quantity) => {
    const config = {
      url: "/api/order/checkout",
      method: "POST",
      data: { productId: product._id, quantity: quantity },
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
  // navigate("/success", { state: product });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="cartContainer">
      {cartItems?.cart?.map((item) => (
        <Card
          key={item?._id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          style={{
            margin: "10px",
            boxShadow: "0 1px 1px 0 rgba(0,0,0,0.2)",
            borderRadius: "none",
            border: "1px solid lightblue",
          }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            minW={{ base: "100%", sm: "200px" }}
            minH={{ base: "100%", sm: "200px" }}
            maxH={{ base: "100%", sm: "250px" }}
            src={item?.productId.imageUrl}
            alt="Caffe Latte"
            margin={"1rem"}
            boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{item?.productId.name}</Heading>

              <Text py="2">{item?.productId.description}</Text>
              <Text color="blue.600" fontSize="4xl">
                $<strong>{item?.productId.price}</strong>
              </Text>
              <Badge variant="outline" colorScheme="green" p={2}>
                QUANTITY: {item?.quantity}
              </Badge>
            </CardBody>
            <CardFooter>
              <Button
                bg={"red.500"}
                color={"white"}
                width={"1rem"}
                _hover={{
                  bg: "red.600",
                }}
                marginRight={"0.5rem"}
                onClick={() => deleteItem(item?.productId?._id)}
                boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
              >
                <DeleteIcon />
              </Button>
              <Button
                position={"relative"}
                variant="solid"
                colorScheme="blue"
                onClick={() => checkoutOrder(item?.productId, item?.quantity)}
                boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
              >
                Place order
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

export default CartPage;
