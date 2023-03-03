import { BellIcon } from "@chakra-ui/icons";
import { Avatar, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import {
  Link,
  Outlet,
  useNavigate,
  // useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";

const Dashboard = () => {
  const API_URL = "http://localhost:4001/api/users/";
  const navigate = useNavigate();
  // const location = useLocation();
  // const [user, setUser] = useState(location.state)

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isError, setIsError] = useState(false);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  // user = user ? user : null;
  // user = user ? user : null;
  // console.log(user);
  const handleUserChange = (user) => {
    setUser(user);
  };

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

    const response = await fetch(API_URL + "user", requestOptions);

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

    if (!user) {
      //&& !token) {
      navigate("/login");
    }
  }, [user, navigate, isError]); //, token]);

  useEffect(() => {
    if (user) {
      //|| token) {
      getUserData();
    }

    document.title = "Money Manager";
    // eslint-disable-next-line
  }, []);

  return (
    <Flex
      direction="row"
      bgColor="blue.100"
      minW="100vw"
      w="100%"
      minH="100vh"
      h="100%"
    >
      <Navbar user={user} onUserChange={handleUserChange} />
      <Flex
        direction="column"
        w="100%"
        pl={{ base: "0px", lg: "200px" }}
        pt={{ base: "0px", lg: "75px" }}
      >
        <Flex className="main" p="35px" direction="column">
          <Outlet context={[user, getUserData]} /> {/*token*/}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
