import React from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Login = () => {
  //RENDER THE LOGIN PAGE
  return (
    <VStack spacing="10px">
      //----------------------------------------------------------------------------------------------------------------------
      //EMAIL FIELD
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" placeholder="Enter Your Email Address" />
      </FormControl>
      //----------------------------------------------------------------------------------------------------------------------
      //PASSWORD FIELD
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input placeholder="Enter password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      //----------------------------------------------------------------------------------------------------------------------
      //LOGIN BUTTON
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Login
      </Button>
      //----------------------------------------------------------------------------------------------------------------------
      //GUEST BUTTON
      <Button variant="solid" colorScheme="red" width="100%">
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
