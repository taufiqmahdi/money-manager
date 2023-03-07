import { Flex, Heading, Button, Avatar } from "@chakra-ui/react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import React from "react";
import { useState } from "react";
import EditProfileModal from "../../Component/Modal/EditProfileModal";
import EditPasswordModal from "../../Component/Modal/EditPasswordModal";
import {
  AtSignIcon,
  ChatIcon,
  EditIcon,
  EmailIcon,
  LockIcon,
} from "@chakra-ui/icons";

const Profile = () => {
  const [user, getUserData] = useOutletContext();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const handleEditProfileModalChange = () => {
    setIsEditProfileModalOpen((prevState) => ({
      isEditProfileModalOpen: !prevState.isEditProfileModalOpen,
    }));
  };

  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const handleEditPasswordModalChange = () => {
    setIsEditPasswordModalOpen((prevState) => ({
      isEditPasswordModalOpen: !prevState.isEditPasswordModalOpen,
    }));
  };

  return (
    <Flex direction="column">
      <Flex mb="25px">
        <Heading as="h2" size="md">
          Profile
        </Heading>
      </Flex>
      <Flex
        w="fit-content"
        bgColor="white"
        boxShadow="lg"
        p="25px"
        borderRadius="8px"
        direction="column"
      >
        <Flex mb="25px">
          <Avatar size="2xl" borderRadius="8px" mr="25px" />
          <Flex direction="column" gap="10px" mr="25px">
            <Flex align="center" gap="5px">
              <AtSignIcon />
              Username
            </Flex>
            <Flex align="center" gap="5px">
              <ChatIcon />
              Full Name
            </Flex>
            <Flex align="center" gap="5px">
              <EmailIcon />
              Email
            </Flex>
          </Flex>
          <Flex direction="column" gap="10px" mr="25px">
            <Flex>:</Flex>
            <Flex>:</Flex>
            <Flex>:</Flex>
          </Flex>
          <Flex direction="column" gap="10px" fontWeight="bold">
            <Flex>{user.username}</Flex>
            <Flex>{user.firstName + " " + user.lastName}</Flex>
            <Flex>{user.email}</Flex>
          </Flex>
        </Flex>
        <Flex gap="16px">
          {/* <Link to="/profile/edit-profile"> */}
          <Button
            leftIcon={<EditIcon />}
            onClick={handleEditProfileModalChange}
          >
            Edit Profile
          </Button>
          {/* </Link> */}
          {/* <Link to="/profile/edit-password"> */}
          <Button
            leftIcon={<LockIcon />}
            onClick={handleEditPasswordModalChange}
          >
            Edit Password
          </Button>
          {/* </Link> */}
        </Flex>
      </Flex>
      <Outlet
        context={[
          isEditProfileModalOpen,
          setIsEditProfileModalOpen,
          isEditPasswordModalOpen,
          setIsEditPasswordModalOpen,
          user,
          // token,
          getUserData,
        ]}
      />
      <EditProfileModal
        isModalOpen={isEditProfileModalOpen}
        setIsModalOpen={setIsEditProfileModalOpen}
        user={user}
        getUserData={getUserData}
      />
      <EditPasswordModal
        isModalOpen={isEditPasswordModalOpen}
        setIsModalOpen={setIsEditPasswordModalOpen}
        user={user}
        getUserData={getUserData}
      />
    </Flex>
  );
};

export default Profile;
