import { Flex, Heading, Button, Avatar } from "@chakra-ui/react";
import { Outlet, useOutletContext } from "react-router-dom";
import React from "react";
import { useState } from "react";

const Profile = () => {
  const [user, token, getUserData] = useOutletContext();
  
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const handleEditProfileModalChange = () => {
    setIsEditProfileModalOpen((prevState) => ({
      isEditProfileModalOpen: !prevState.isEditProfileModalOpen,
    }));

  };

  return (
    <Flex direction="column" >
      <Flex mb="25px" >
        <Heading as="h2" size="md">
          Profile
        </Heading>
      </Flex>
      <Flex
        w='fit-content'
        bgColor="white"
        boxShadow="lg"
        p="25px"
        borderRadius="8px"
        direction="column"
      >
        <Flex mb="25px">
          <Avatar size="2xl" borderRadius="8px" mr="25px" />
          <Flex direction="column" gap="10px" mr="25px">
            <Flex>Username:</Flex>
            <Flex>Full Name:</Flex>
            <Flex>Email:</Flex>
          </Flex>
          <Flex direction="column" gap="10px" fontWeight="bold">
            <Flex>{user.username}</Flex>
            <Flex>{user.firstName + ' ' + user.lastName}</Flex>
            <Flex>{user.email}</Flex>
          </Flex>
        </Flex>
        <Flex>
          <Button onClick={handleEditProfileModalChange}>Edit Profile</Button>
        </Flex>
      </Flex>
      <Outlet context={[ isEditProfileModalOpen, setIsEditProfileModalOpen, user, token, getUserData ]} />
    </Flex>
  );
};

export default Profile;
