import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { VStack } from "@chakra-ui/layout";
import axios, * as others from "axios";
import { BASE_URL } from "../services/helper";

const Signup = () => {
  //----------------------------------------------------------------------------------------------------------------------
  //State variables goes here

  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  //----------------------------------------------------------------------------------------------------------------------
  //Functions goes here
  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      console.log("Please fill all the fields");
      console.log(name, email, password, confirmpassword);
      return;
    }
    if (password !== confirmpassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log(name, email, password, confirmpassword);

    //send data to server using axios
    const { data } = await axios.post(
      `${BASE_URL}/api/user/signup`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  //----------------------------------------------------------------------------------------------------------------------
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={"password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <Input
            type={"password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
