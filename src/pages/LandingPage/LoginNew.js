import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  FormErrorMessage,
  FormControl,
  Input,
  FormLabel,
  Button,
  CircularProgress,
  Link,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(true);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  // const [isNavigated, setIsNavigated] = useState(false)

  const initialInputState = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const [inputState, setInputState] = useState(initialInputState);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const location = useLocation();
  // console.log(location.state)
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const register = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputState.username,
      firstName: inputState.firstName,
      lastName: inputState.lastName,
      email: inputState.email,
      password: inputState.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:4001/register",
      requestOptions
    );

    try {
      let data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      setIsError(true);
    }
  };

  const login = async () => {
    // console.log(e)
    // const email = email;
    // const password = password;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: inputState.email,
      password: inputState.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://localhost:4001/login", requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));

    // const data = async () => {
    try {
      let data = await response.json();
      // console.log('data:', data)
      // console.log(JSON.stringify(data))
      // console.log(data.token)
      // // data = JSON.stringify(data);
      // console.log(data)
      // data = JSON.parse(data);
      // console.log('a')
      // setUser(data);
      // console.log(isLoggedIn)
      // // return data;
      // setIsLoggedIn(true);
      // console.log(isLoggedIn)

      localStorage.setItem("user", JSON.stringify(data));
      return data;
      // localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      // console.log(error);
      setIsError(true);
    }
    // };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      const data = await login();
      setUser(data);
      setIsLoading(false);
      return;
    }
    const data = await register();
    setUser(data);
    // console.log('isLoggedIn before:', isLoggedIn);
    // return data;
    // setIsLoggedIn(true);
    // console.log('isLoggedIn after:', isLoggedIn);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isError) {
      <FormErrorMessage>Wrong Email / Password</FormErrorMessage>;
    }

    if (!user) {
      //|| !token) {
      // console.log('no user')
    }

    if (
      // isLoggedIn ||
      user
    ) {
      //&& token) {
      // console.log('ada user')
      //|| user) {
      navigate(from, { replace: true });
    }

    // console.log(user);
  }, [isError, user, navigate, from]); //, token]);

  return (
    <Flex bgColor="blue.100" h="100vh" align="center" justify="center" >
      <Flex
        bgColor="white"
        maxWidth="1000px"
        p="50px"
        maxH="500px"
        // h="100%"
        borderRadius="8px"
      >
        <Flex mr="50px">
          <Image
            src="frontpage.jpg"
            alt="money-manager"
            maxW="400px"
            fit="contain"
          />
        </Flex>
        <Divider orientation="vertical" mr="50px" />
        <Flex p="8px" align="center" justify="center" direction="column">
          <Box
            p="8px"
            mb="8px"
            align="center"
            justify="center"
            display={isLogin ? "block" : "none"}
          >
            <Image src="icon.png" alt="icon-mm" maxH="50px" />
            <Heading size="md">Money Manager</Heading>
          </Box>
          {/* {(!from) ? <Box textColor='red.400' mb='8px' w=''>You need to login first to access this page</Box> : null   }  */}
          <Box display={isLogin ? "block" : "none"} className="login-form">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={inputState.email}
                  placeholder="test@test.com"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={6} isRequired isInvalid={isError}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={inputState.password}
                  placeholder="*******"
                  onChange={handleChange}
                />
                <FormErrorMessage>Wrong Email / Password</FormErrorMessage>
              </FormControl>
              <Button
                width="full"
                type="submit"
                mt={4}
                bgColor="indigo"
                color="white"
                _hover={{ bg: "blue.500" }}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Box>

          <Box display={isLogin ? "none" : "block"} className="register-form">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={inputState.email}
                  placeholder="test@test.com"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={inputState.username}
                  placeholder="username"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={inputState.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={inputState.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired isInvalid={isError}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={inputState.password}
                  placeholder="*******"
                  onChange={handleChange}
                />
                <FormErrorMessage>Wrong Email / Password</FormErrorMessage>
              </FormControl>
              <Button
                width="full"
                type="submit"
                mt={4}
                bgColor="indigo"
                color="white"
                _hover={{ bg: "blue.500" }}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Box>

          <Box mt="8px" hidden={isLogin ? false : true}>
            Don't have an account?&nbsp;
            <Link
              textColor="blue.400"
              onClick={() => {
                setIsLogin(false);
                setInputState(initialInputState);
              }}
            >
              Register
            </Link>
            &nbsp;here
          </Box>
          <Box mt={2} hidden={isLogin ? true : false}>
            Have an account?&nbsp;
            <Link
              textColor="blue.400"
              onClick={() => {
                setIsLogin(true);
                setInputState(initialInputState);
              }}
            >
              Login
            </Link>
            &nbsp;here
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginNew;
