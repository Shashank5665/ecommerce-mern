import { HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import Product from "../components/Product";
const ProductPage = () => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products/all");
      setProducts(data);
    })();
  }, []);
  return (
    <HStack wrap={"wrap"} px={4} py={7} gap={5}>
      {products.map((product) => (
        <Product key={product._id} data={product} />
      ))}
    </HStack>
  );
};

export default ProductPage;
