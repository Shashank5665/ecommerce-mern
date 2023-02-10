import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const { state: product } = useLocation();

  console.log(product);
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {product?.name}
      </Heading>
      <Text color={"gray.500"}>{product?.description}</Text>
      <Text color={"gray.500"}>The total cost is {product?.price}</Text>
      <Text color={"gray.500"}>
        A confirmation email has been sent. Thank you!
      </Text>
    </Box>
  );
}
