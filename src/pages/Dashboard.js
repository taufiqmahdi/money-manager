import { ArrowDownIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";
import React from "react";

const Dashboard = () => {
  return (
    <Flex direction="row">
      <Flex
        className="navbar"
        align="center"
        bgColor="blue.400"
        justify="space-between"
        minW="200px"
        h="100vh"
        direction="column"
      >
        <Flex direction="column">
          <Flex p="25px" fontSize="lg">
            <Link to="/">Money Manager</Link>
          </Flex>
          <Link to="/">
            <Flex
              pl="25px"
              _hover={{
                bgColor: "blue.200",
              }}
            >
              Home
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%" >
        <Flex align="center" justify="space-between" h="75px" p="25px">
          <Flex fontSize='xl' fontWeight='bold'>Home</Flex>
          <Flex align="center">
            <Flex mr="15px">Account Name</Flex>
            <Flex>
              <Avatar />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="main" p="25px" direction="column">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
