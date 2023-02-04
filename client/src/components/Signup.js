import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  //Functions goes here
  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      console.log("Please fill all the fields");
      return;
    }
    if (password !== confirmpassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log(name, email, password, confirmpassword);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // const { data } = await axios.post(
      //   "/api/user",
      //   {
      //     name,
      //     email,
      //     password,
      //   },
      //   config
      // );
      // console.log(data);
      // console.log("User Created");
      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  //----------------------------------------------------------------------------------------------------------------------
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" placeholder="Enter Your Email Address" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input type={"password"} placeholder="Enter Password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input type={"password"} placeholder="Confirm password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
