import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditPasswordModal = ({
  isModalOpen,
  setIsModalOpen,
  user,
  getUserData,
}) => {
  const API_URL = "http://localhost:4001/api/users/";
  const handleModalOpenChange = (value) => {
    if (value === false) {
      setInputState(initialUserState);
    }
    setIsModalOpen(value);
  };

  const initialUserState = {
    email: user.email,
    password: "",
    newPassword: "",
    repeatNewPassword: "",
    token: user.token,
  };

  const [inputState, setInputState] = useState(initialUserState);
  const [isError, setIsError] = useState(false);
  const [isPasswordNotSame, setIsPasswordNotSame] = useState(false);

  const handleChange = (e) => {
    setIsError(false);
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.username.value)
    // console.log(inputState.username)
    // setIsLoading(true);
    if (isPasswordNotSame) {
      setIsError(true);
      // setIsLoading(false);
      return;
    }
    await editPassword();
  };

  const editPassword = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: inputState.email,
      password: inputState.password,
      newPassword: inputState.newPassword,
      token: inputState.token,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(API_URL + "edit-pass", requestOptions);

    try {
      // let data = await response.json();
      await response.json();
      // console.log(data)
      // // data = JSON.stringify(data);
      // console.log(data)
      // data = JSON.parse(data);
      // console.log('a')
      // setUser(data);
      // return data;
      getUserData();
      handleModalOpenChange(false);
      return;
      // setIsLoggedIn(true);
      // localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isError) {
      <FormErrorMessage>Wrong Password</FormErrorMessage>;
    }

    if (isPasswordNotSame) {
      <FormErrorMessage>Password doesn't match</FormErrorMessage>;
    }

    if (inputState.newPassword !== inputState.repeatNewPassword) {
      setIsPasswordNotSame(true);
    } else {
      setIsPasswordNotSame(false);
    }
  }, [isError, isPasswordNotSame, inputState]);

  return (
    <Modal isOpen={isModalOpen} onClose={() => handleModalOpenChange(false)}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={inputState.password}
                onChange={handleChange}
              />
              <FormErrorMessage>Wrong Password</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isRequired isInvalid={isPasswordNotSame}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={inputState.newPassword}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired isInvalid={isPasswordNotSame}>
              <FormLabel>Repeat New Password</FormLabel>
              <Input
                type="password"
                name="repeatNewPassword"
                placeholder="Repeat New Password"
                value={inputState.repeatNewPassword}
                onChange={handleChange}
              />
              {!isPasswordNotSame ? null : (
                <FormErrorMessage>Password doesn't match</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={4}>
              {/* {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : ( */}
              Save Changes
              {/* )} */}
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleModalOpenChange(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditPasswordModal;
