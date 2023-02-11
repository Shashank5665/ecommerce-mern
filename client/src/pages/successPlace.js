import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const { state: product } = useLocation();

  console.log(product);
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"100px"} color={"green.500"} />
      <Text color={"gray.500"} fontSize="5xl" fontWeight={"bold"}>
        Congratulations!
      </Text>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your order {product?.product?.name} has been placed.
      </Heading>
      <Text color={"gray.500"} fontSize="2xl">
        The total cost is {product?.totalPrice}
      </Text>
      <Text color={"gray.500"} fontSize="2xl">
        A confirmation email has been sent to your email address.
      </Text>
      <Text color={"gray.500"} fontSize="2xl">
        Thank you for shopping with us. We hope to see you again soon.
      </Text>
    </Box>
  );
}
