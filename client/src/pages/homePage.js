import Login from "../components/Login";
import Signup from "../components/Signup";
import {
  Container,
  Box,
  Text,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      {/* Box is just like a div in html. */}
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          E-Commerce
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="solid-rounded">
          <TabList mb="1em">
            <Tab border={"1px solid blue"}>Login</Tab>
            <Tab border={"1px solid blue"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
