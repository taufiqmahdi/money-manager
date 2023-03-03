import React, { useEffect } from "react";
import { Flex, Button, Text, Heading } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";

const MainPage = () => {
  // const user = user
  const [user, getUserData] = useOutletContext();
  // console.log(user)

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, [])
  
  return (
    <Flex direction="column">
      <Flex mb="25px">
        <Heading as='h2' size='md'>Home</Heading>
      </Flex>
      <Flex
        // minW="100%"
        direction="column"
        bgColor="white"
        boxShadow="lg"
        p="25px"
        borderRadius="8px"
        w='fit-content'
      >
        {/* <Flex mb="25px">
        Hi,&#160;
        <Text as="span" fontWeight="bold">
          {user.firstName + " " + user.lastName}
        </Text>
        .
      </Flex> */}
        <Flex mb="25px">
          You have&nbsp;
          <Text as="span" fontWeight="bold">
          Rp. {!user.balance ? 0 : user.balance
          }
          </Text>
        </Flex>
        {/* <Flex mb="25px">
          This month, you have spent&nbsp;
          <Text as="span" fontWeight="bold">
            $50
          </Text>
        </Flex> */}
        <Flex>
          <Link to="/add/income">
            <Button mr="10px" onClick={() => {}}>
              Add an income
            </Button>
          </Link>
          <Link to="/add/outcome">
            <Button onClick={() => {}}>Add a spending</Button>
          </Link>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Flex>
  );
};

export default MainPage;
