import { BellIcon } from "@chakra-ui/icons";
import { Avatar, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import {
  Link,
  Outlet,
  useNavigate,
  // useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [user, setUser] = useState(location.state)

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isError, setIsError] = useState(false);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  // user = user ? user : null;
  // user = user ? user : null;
  // console.log(user);

  const getUserData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: user.email,
      token: user.token,
    });

    var requestOptions = {
      // credentials: "include",
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://localhost:4001/me", requestOptions);

    try {
      let data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      // setIsLoggedIn(true);
    } catch (error) {
      setIsError(true);
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }

    if (!user) { //&& !token) {
      navigate("/login");
    }
  }, [user, navigate, isError]); //, token]);

  useEffect(() => {
    if (user) { //|| token) {
      getUserData();
    }
  }, []);

  return (
    <Flex direction="row" bgColor="blue.100">
      <Flex
        className="navbar"
        align="center"
        bgColor="white"
        justify="space-between"
        maxW="200px"
        h="100vh"
        direction="column"
        boxShadow="lg"
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
      <Flex direction="column" w="100%">
        <Flex
          bgColor="gray.100"
          align="center"
          justify="space-between"
          h="75px"
          p="25px"
        >
          <Flex fontSize="xl" fontWeight="bold">
            Hello, {user.firstName + ' ' + user.lastName}
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
            <Flex mr="15px">{user.firstName + ' ' + user.lastName}</Flex>
            <Flex>
              <Avatar
                name={user.firstName + ' ' + user.lastName}
                // src="https://bit.ly/dan-abramov"
                borderRadius="8px"
                h="45px"
                w="45px"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="main" p="25px" direction="column">
          <Outlet context={[user, getUserData]} /> {/*token*/}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
