import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading, Text, Image, Stack, Button, Spinner } from "@chakra-ui/react";
import { Divider, ButtonGroup } from "@chakra-ui/react";
import "../singleProductPageStyle.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const SingleProductPage = () => {
  const navigate = useNavigate();
  const [product, setProducts] = React.useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProducts(data);
    })();
  }, [id]);

  const handleAddToCart = async (productData, quantity) => {
    const config = {
      url: "/api/cart/add",
      method: "POST",
      data: { productId: productData._id, quantity },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    try {
      console.log("add to cart");
      const { data } = await axios(config);
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------------

  const checkoutOrder = async (product, quantity) => {
    isLoading(true);

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
    return <Spinner color="red.500" />;
  }

  //--------------------------------------------------------------------------------------------------------------------------------

  console.log(product);

  return (
    <div className="mainContainer">
      <Card maxW="lg">
        <CardBody>
          <Image
            src={product.imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text>{product.description}</Text>
            <Text color="blue.600" fontSize="4xl">
              $<strong>{product.price}</strong>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => checkoutOrder(product, 1)}
            >
              checkout
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => handleAddToCart(product, 1)}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleProductPage;
