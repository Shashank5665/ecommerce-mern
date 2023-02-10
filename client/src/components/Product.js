import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  border,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Product({ data: productData }) {
  const [quantity, setQuantity] = React.useState(0);
  const navigate = useNavigate();
  const handleAddToCart = async () => {
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
      setQuantity(0);
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = {
    textDecoration: "none",
    color: "blue",
    boxShadow: "0 2px 0 0 currentColor",
    marginRight: "10px",
  };

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"0px 4px 4px 0px rgba(0,0,0,0.2)"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        border={"1px solid lightblue"}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${productData.imageUrl})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={productData.imageUrl}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {productData.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${productData.price}
            </Text>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            <NumberInput
              value={quantity}
              onChange={(_, num) => setQuantity(num)}
              defaultValue={0}
              min={0}
              max={10}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            <Button
              variant={"solid"}
              width="113px"
              background={"blue.50"}
              color={"blue.500"}
              border={"1px"}
              boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
            >
              <Link to={`/product/${productData._id}`}>Visit</Link>
            </Button>
            <Button
              onClick={handleAddToCart}
              colorScheme="green"
              variant="solid"
              width="113px"
              boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
            >
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
