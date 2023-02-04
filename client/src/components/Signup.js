import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Signup = () => {
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
