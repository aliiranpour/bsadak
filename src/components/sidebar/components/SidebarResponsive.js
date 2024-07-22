import React, { useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Box,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import { Scrollbars } from "react-custom-scrollbars-2";
import SidebarLinks from "./Links";
import SidebarBrand from "./Brand";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";

export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("green.900", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { routes } = props;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            me={5}
            mt={5}
            size="20"
            color="white"
            zIndex="3"
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Box pt="25px" px="16px" borderRadius="30px">
                <SidebarBrand />
                <SidebarLinks routes={routes} onClose={onClose} />
              </Box>
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default SidebarResponsive;
