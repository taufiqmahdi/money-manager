import { Divider, Flex, Heading, Image, Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onUserChange }) => {
  const handleUserChange = (user) => {
    onUserChange(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    handleUserChange("");
  };

  return (
    <Flex>
      <Flex
        className="navbar"
        align="center"
        bgColor="white"
        justify="space-between"
        w="200px"
        h="100vh"
        direction="column"
        boxShadow="xl"
        pos="fixed"
        left="0"
        zIndex="30"
        display={{ base: "none", lg: "flex" }}
      >
        <Flex direction="column" w="100%" align="center" h="100%">
          <Flex
            align="center"
            justify="center"
            fontSize="lg"
            m={4}
            borderRadius={8}
            h="75px"
          >
            <Link to="/">
              <Image
                src="icon.png"
                alt="mm-icon"
                fit="contain"
                h="45px"
                w="45px"
                mr="10px"
              />
            </Link>
            <Link to="/">
              <Heading as="h3" size="xs">
                Money Manager
              </Heading>
            </Link>
          </Flex>
          <Divider w="70%" my="10px" />
          <Flex direction="column" w="100%" h="100%" justify="flex-start">
            <Flex direction="column" w="100%">
              <Link to="/">
                <Flex
                  p="15px"
                  mx={4}
                  // borderRadius={8}
                  h="3rem"
                  align="center"
                  justify="flex-start"
                >
                  <Heading as="h3" size="sm">
                    Home
                  </Heading>
                </Flex>
              </Link>
            </Flex>
            <Flex direction="column" w="100%">
              <Link to="/cashflow">
                <Flex
                  p="15px"
                  mx={4}
                  // borderRadius={8}
                  h="3rem"
                  align="center"
                  justify="flex-start"
                >
                  <Heading as="h3" size="sm">
                    Cashflow
                  </Heading>
                </Flex>
              </Link>
            </Flex>
            <Flex direction="column" w="100%">
              <Link to="/profile">
                <Flex
                  p="15px"
                  mx={4}
                  // borderRadius={8}
                  h="3rem"
                  align="center"
                  justify="flex-start"
                >
                  <Heading as="h3" size="sm">
                    Profile
                  </Heading>
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Flex direction="column" w="100%" h="100%" justify="flex-end">
            {/* <Link to="/login"> */}
            <Flex
              as="button"
              p="15px"
              m={4}
              // borderRadius={8}
              h="3rem"
              align="center"
              justify="flex-start"
              onClick={logout}
            >
              <Heading as="h3" size="sm">
                Logout
              </Heading>
            </Flex>
            {/* </Link> */}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bgColor="gray.100"
        align="center"
        justify="space-between"
        h="75px"
        p="25px"
        w="100%"
        pos="fixed"
        pl="230px"
      >
        <Flex fontSize="xl" fontWeight="bold">
          Hello, {user.firstName + " " + user.lastName}
        </Flex>
        <Flex align="center">
          <Flex
            mr="15px"
            h="45px"
            w="45px"
            borderRadius="8px"
            bgColor="white"
            align="center"
            justify="center"
          >
            <BellIcon w="25px" h="25px" />
          </Flex>
          <Flex mr="15px">{user.firstName + " " + user.lastName}</Flex>
          <Flex>
            <Avatar
              name={user.firstName + " " + user.lastName}
              // src="https://bit.ly/dan-abramov"
              borderRadius="8px"
              h="45px"
              w="45px"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
