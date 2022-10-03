import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Flex>
      <Flex mb="50px">Hi, account.</Flex>
      <Flex mb="50px">You have $100</Flex>
      <Flex mb="50px">This month, you have spent $50</Flex>
      <Flex>
        <Link to="/AddActivity">
          <Button mr="10px">Add an income</Button>
        </Link>
        <Button>Add a spending</Button>
      </Flex>
      <Flex>
      </Flex>
    </Flex>
  );
};

export default MainPage;
