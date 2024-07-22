import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import SidebarBrand from "./Brand";
import SidebarLinks from "./Links";

function SidebarContent(props) {
  const { routes, onClose } = props;
  return (
    <Flex direction="column" height="100%" pt="25px" px="16px" borderRadius="30px">
      <SidebarBrand />
      <Stack direction="column" mb="auto" mt="25px" overflowY="auto" spacing="20px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <SidebarLinks routes={routes} onClose={onClose} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
