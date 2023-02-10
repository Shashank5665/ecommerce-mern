import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading, Text, Image, Stack, Button } from "@chakra-ui/react";
import { Divider, ButtonGroup } from "@chakra-ui/react";
import "../singleProductPageStyle.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const SingleProductPage = () => {
  const [product, setProducts] = React.useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProducts(data);
    })();
  }, [id]);

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
            <Button variant="solid" colorScheme="blue">
              Place order
            </Button>
            <Button variant="outline" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleProductPage;
