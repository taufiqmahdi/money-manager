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
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const API_URL = "http://localhost:4001/api/users/";
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordNotSame, setIsPasswordNotSame] = useState(false);

  const initialInputState = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  };

  const [inputState, setInputState] = useState(initialInputState);

  const handleChange = (e) => {
    setIsError(false);
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

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

    const response = await fetch(API_URL, requestOptions);

    try {
      let data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      setIsError(true);
    }
  };

  const login = async () => {
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

    const response = await fetch(API_URL + "login", requestOptions);

    try {
      let data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      setIsError(true);
    }
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
    if (isPasswordNotSame) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const data = await register();
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = "Log In - Money Manager";
  }, []);

  useEffect(() => {
    if (isError) {
      if (isLogin) {
        <FormErrorMessage>Wrong Email / Password</FormErrorMessage>;
        return;
      }
      <FormErrorMessage>Email already exists</FormErrorMessage>;
    }

    if (isPasswordNotSame) {
      <FormErrorMessage>Password doesn't match</FormErrorMessage>;
    }

    if (!user) {
    }

    if (user) {
      navigate(from, { replace: true });
    }

    if (inputState.password !== inputState.repeatPassword) {
      setIsPasswordNotSame(true);
    } else {
      setIsPasswordNotSame(false);
    }
  }, [isError, user, navigate, from, inputState, isPasswordNotSame, isLogin]);

  return (
    <Flex bgColor="blue.100" h="100vh" align="center" justify="center">
      <Flex bgColor="white" maxWidth="1000px" p="50px" borderRadius="8px">
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
          <Box p="8px" mb="8px" align="center" justify="center">
            <Image src="icon.png" alt="icon-mm" maxH="50px" />
            <Heading size="md" mb="12px">
              Money Manager
            </Heading>
            <Heading size="sm" display={isLogin ? "block" : "none"}>
              Login
            </Heading>
            <Heading size="sm" display={isLogin ? "none" : "block"}>
              Register
            </Heading>
          </Box>
          <Box display={isLogin ? "block" : "none"} className="login-form">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired isInvalid={isError}>
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
                width="100%"
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

          <form onSubmit={handleSubmit}>
            <SimpleGrid
              columns={2}
              spacing={6}
              display={isLogin ? "none" : "grid"}
              className="register-form"
            >
              <GridItem colSpan={2}>
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={inputState.email}
                    placeholder="test@test.com"
                    onChange={handleChange}
                  />
                  <FormErrorMessage>Email already exists</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
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
              </GridItem>
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
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={inputState.password}
                  placeholder="*******"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired isInvalid={isPasswordNotSame}>
                <FormLabel>Repeat Password</FormLabel>
                <Input
                  type="password"
                  name="repeatPassword"
                  value={inputState.repeatPassword}
                  placeholder="*******"
                  onChange={handleChange}
                />
                {!isPasswordNotSame ? null : (
                  <FormErrorMessage>Password doesn't match</FormErrorMessage>
                )}
              </FormControl>
              <GridItem colSpan={2}>
                <Button
                  width="100%"
                  type="submit"
                  bgColor="indigo"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>

          <Box mt="8px" hidden={isLogin ? false : true}>
            Don't have an account?&nbsp;
            <Link
              textColor="blue.400"
              onClick={() => {
                setIsLogin(false);
                setIsError(false);
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
                setIsError(false);
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

export default Login;
