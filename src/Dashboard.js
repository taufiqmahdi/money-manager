import { ArrowDownIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <Flex direction="column">
      <Flex
        class="navbar"
        align="center"
        bgColor="blue.400"
        justify="space-between"
        h="75px"
        w="100%"
      >
        <Flex>
          <Flex mr="10px" ml="10px">
            Money Manager
          </Flex>
          <Flex mr="10px">Home</Flex>
        </Flex>
        <Flex align="center">
          <Flex mr="10px">Account Name</Flex>
          <Flex>
            <Button bg="none">
              <ArrowDownIcon />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex class="main" p="10px" direction="column">
        <Flex mb="50px">Hi, account.</Flex>
        <Flex mb="50px">You have $100</Flex>
        <Flex mb="50px">
            This month, you have spent $50
        </Flex>
        <Flex>
            <Button mr='10px'>Add an income</Button>
            <Button>Add a spending</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
