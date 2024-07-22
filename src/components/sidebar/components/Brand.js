import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <Text fontSize='3xl' fontWeight='bold' mb='25px' color='#fff' >
        سپند
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
  