import {
  Button,
  FormControl,
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
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const EditProfileModal = () => {
  const [isModalOpen, setIsModalOpen, user, getUserData] = //token, getUserData] =
    useOutletContext();
  const handleModalOpenChange = (value) => {
    setIsModalOpen(value);
  };

  const initialUserState = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: user.token,
  };

  const [inputState, setInputState] = useState(
    // username: user.username,
    // firstName: user.firstName,
    // lastName: user.lastName,
    // email: user.email,
    initialUserState
  );

  const handleChange = (e) => {
    const value = e.target.value;
    // console.log(user);
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
    await editProfile();
    getUserData();
    handleModalOpenChange(false);
    // setIsLoading(false);
  };

  const editProfile = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: inputState.email,
      username: inputState.username,
      firstName: inputState.firstName,
      lastName: inputState.lastName,
      token: inputState.token,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://localhost:4001/edit", requestOptions);

    try {
      let data = await response.json();
      // console.log(data)
      // // data = JSON.stringify(data);
      // console.log(data)
      // data = JSON.parse(data);
      // console.log('a')
      // setUser(data);
      return data;
      // setIsLoggedIn(true);
      // localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  // useEffect(() => {
  //   if (isModalOpen === true) {
  //     setInputState(initialUserState);
  //   }
  // }, [isModalOpen, setInputState, initialUserState]);

  // const intialUserState = useMemo(() => {
  //   if (isModalOpen === true) {
  //     setInputState(initialUserState);
  //   }
  // }, [isModalOpen, setInputState, initialUserState]);

  // useMemo;

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => handleModalOpenChange(false)}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={inputState.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={inputState.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={inputState.lastName}
                  onChange={handleChange}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={inputState.email}
                  onChange={handleChange}
                />
              </FormControl> */}
              {/* <Flex mt={4} gap={4}>
                
              </Flex> */}
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
    </>
  );
};

export default EditProfileModal;
