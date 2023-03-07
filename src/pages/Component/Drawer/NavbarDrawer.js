import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Image,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavbarDrawer = ({ isSidebarOpen, onSidebarChange, onLogout }) => {
  const btnRef = React.useRef();

  const handleSidebarOpen = () => {
    onSidebarChange((prevState) => !prevState);
  };

  return (
    <Drawer
      isOpen={isSidebarOpen}
      placement="left"
      onClose={onSidebarChange}
      finalFocusRef={btnRef}
      size={'xs'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Link to="/">
            <Flex
              align="center"
              justify="center"
              fontSize="lg"
              m={4}
              borderRadius={8}
              h="75px"
              direction="column"
            >
              <Image
                src="icon.png"
                alt="mm-icon"
                fit="contain"
                h="45px"
                w="45px"
                mr="10px"
              />
              <Heading as="h3" size="xs">
                Money Manager
              </Heading>
            </Flex>
          </Link>
          <Divider my="10px" />
        </DrawerHeader>

        <DrawerBody>
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
        </DrawerBody>

        <DrawerFooter>
          <Flex direction="column" w="100%" h="100%" justify="flex-end">
            <Flex
              as="button"
              p="15px"
              m={4}
              // borderRadius={8}
              h="3rem"
              align="center"
              justify="flex-start"
              onClick={onLogout}
            >
              <Heading as="h3" size="sm">
                Logout
              </Heading>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavbarDrawer;
