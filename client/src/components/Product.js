// import React, { useState } from "react";
// import "../card.css";
// import axios from "axios";

// const Product = () => {
//   const [quantity, setQuantity] = useState(0);
//   let price = 100,
//     total;

//   total = quantity * price;

//   console.table({ price, quantity, total });
//   const decrementQuantity = () => {
//     if (quantity >= 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const addToCart = () => {
//     console.log("Add to cart");
//   };

//   //write a function to send the data to the server
//   const { data } = axios.post(
//     "/api/user/",
//     {
//       quantity,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return (
//     <>
//       <div className="container">
//         <h4 className="title">Mechanical keyboard</h4>
//         <p>Keyboard with mechanical switches</p>
//         <p className="price">Price: $100</p>
//         <button
//           className="changeItems"
//           onClick={() => setQuantity(quantity + 1)}
//         >
//           +
//         </button>
//         <p className="quantity">{quantity}</p>
//         <button className="changeItems" onClick={decrementQuantity}>
//           -
//         </button>
//         <button className="cart" onClick={addToCart}>
//           Add to cart
//         </button>
//       </div>
//     </>
//   );
// };

// export default Product;
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
} from "@chakra-ui/react";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function Product() {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
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
            backgroundImage: `url(${IMAGE})`,
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
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            Product Name
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              $79.99
            </Text>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            <NumberInput defaultValue={0} min={0} max={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            <Button colorScheme="green" variant="outline" width="230px">
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
