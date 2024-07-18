// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import React from "react";
import { Link } from "react-router-dom";

// FUNCTIONS

function AdminSubRoutes({ routes }) {
  const adminRoute = routes.find(route => route.name === "ادمین");
  const subRoutes = adminRoute ? adminRoute.subRoutes : [];

  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          {subRoutes.map((subRoute, index) => (
            <Link key={index} to={adminRoute.layout + adminRoute.path + subRoute.path}>
              <Box
                p="10px"
                my="5px"
                borderRadius="10px"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
              >
                {subRoute.name}
              </Box>
            </Link>
          ))}
        </Box>
      </Stack>
    </Flex>
  );
}

export default AdminSubRoutes;
