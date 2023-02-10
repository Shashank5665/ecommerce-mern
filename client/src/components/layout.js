import { Button } from "@chakra-ui/react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  const mystyle = {
    color: "white",
    borderBottom: "1px solid white",
  };

  const mystyle2 = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "1.3rem",
    fontWeight: "bold",
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Box style={mystyle2} bg="blue.500" w="100%" p={10} color="white">
        <Link style={mystyle} to={`/`}>
          {" "}
          Home{" "}
        </Link>
        <Link style={mystyle} to={`/cart`}>
          {" "}
          My cart{" "}
        </Link>
        <Link style={mystyle} to={`/order`}>
          {" "}
          My orders{" "}
        </Link>
        <Button
          style={mystyle}
          colorScheme="facebook"
          variant="solid"
          p={5}
          w={150}
          color="white"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
