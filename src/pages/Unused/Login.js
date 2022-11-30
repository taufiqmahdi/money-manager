import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const login = async () => {
    // console.log(e)
    // const email = email;
    // const password = password;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const abc = await fetch("http://localhost:4001/login", requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));

    // const data = async () => {
    try {
      let data = await abc.json();
      data = JSON.stringify(data);
      data = JSON.parse(data);
      setUser(data);
      // return data;
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      // console.log(error);
      setIsError(true);
    }
    // };
  };

  useEffect(() => {
    if (isError) {
      <FormErrorMessage>Wrong Email / Password</FormErrorMessage>;
    }

    if (isLoggedIn || user.id) {
      //|| user) {
      navigate("/");
    }
  }, [isLoggedIn, isError, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login();
    setIsLoading(false);
  };

  return (
    <Flex bg="gray.200" align="center" justify="center" h="100vh">
      <Box
        bg="white"
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box p={2}>
          <Heading textAlign="center">Login</Heading>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="test@test.com"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl mt={6} isRequired isInvalid={isError}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <FormErrorMessage>Wrong Email / Password</FormErrorMessage>
          </FormControl>
          <Button width="full" type="submit" mt={4}>
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
