import React from "react";
import { Card, Image, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const cartPage = () => {
  return (
    <div className="cartContainer">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">The perfect latte</Heading>

            <Text py="2">
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
            <Text color="blue.600" fontSize="4xl">
              $<strong>450</strong>
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Place order
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

export default cartPage;
