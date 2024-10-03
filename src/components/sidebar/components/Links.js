import React, { useState } from "react";
import { NavLink, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, HStack, Text, useColorModeValue, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export function SidebarLinks(props) {
  const location = useLocation();
  const activeColor = useColorModeValue("yellow.300", "white");
  const inactiveColor = useColorModeValue("white", "secondaryGray.600");
  const activeIcon = useColorModeValue("yellow.300", "white");
  const textColor = useColorModeValue("white", "white");
  const brandColor = useColorModeValue("yellow.300", "brand.400");
  const subRouteBg = useColorModeValue("green.900", "gray.900");

  const { routes, onClose = () => {} } = props;
  const [openRoute, setOpenRoute] = useState(null);

  const activeRoute = (routeName) => location.pathname.includes(routeName);

  const toggleSubRoutes = (routePath) => {
    if (openRoute === routePath) {
      setOpenRoute(null); 
    } else {
      setOpenRoute(routePath); 
    }
  };

  const handleLinkClick = (route) => {
    if (route.subRoutes && route.subRoutes.length > 0) {
      toggleSubRoutes(route.path);
    } else {
      onClose();
    }
  };

  const createLinks = (routes) => {
    return routes
      .filter((route) => route.layout === "/admin")
      .map((route, index) => {
        if (route.hidden) return null
        if (route.category) {
          return (
            <React.Fragment key={index}>
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight="bold"
                mx="auto"
                ps={{ sm: "10px", xl: "16px" }}
                pt="18px"
                pb="12px"
              >
                {route.name}
              </Text>
              {createLinks(route.items)}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {route.component ? (
                <Box onClick={() => handleLinkClick(route)}>
                  <NavLink to={route.layout + route.path}>
                    <Box>
                      <HStack
                        spacing="22px"
                        py="20px"
                        ps="10px"
                        justify="space-between"
                        align="center"
                      >
                        <HStack align="center" spacing="10px">
                          <Box
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeIcon
                                : textColor
                            }
                            me="18px"
                          >
                            {route.icon}
                          </Box>
                          <Text
                            me="auto"
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeColor
                                : textColor
                            }
                            fontWeight={
                              activeRoute(route.path.toLowerCase())
                                ? "bold"
                                : "normal"
                            }
                          >
                            {route.name}
                          </Text>
                        </HStack>
                        <Box
                          h="36px"
                          w="4px"
                          bg={
                            activeRoute(route.path.toLowerCase())
                              ? brandColor
                              : "transparent"
                          }
                          borderRadius="5px"
                        />
                      </HStack>
                    </Box>
                  </NavLink>
                  <AnimatePresence>
                    {openRoute === route.path && route.subRoutes && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          pl="20px"
                          maxH="200px"
                          overflowY="auto"
                          bg={subRouteBg}
                          borderRadius="10px"
                          css={{
                            '&::-webkit-scrollbar': {
                              width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                              background: subRouteBg,
                            },
                            '&::-webkit-scrollbar-thumb': {
                              background: 'white',
                              borderRadius: '24px',
                            },
                          }}
                        >
                          {route.subRoutes.map((subRoute, subIndex) => (
                            <Link
                              as={RouterLink}
                              to={`${route.layout}${route.path}${subRoute.path}`}
                              key={subIndex}
                              _hover={{
                                textDecoration: "underline",
                                color: "teal.500",
                              }}
                              fontWeight="bold"
                              fontFamily="yekan"
                              color={
                                activeRoute(subRoute.path.toLowerCase())
                                  ? activeColor
                                  : inactiveColor
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              <HStack
                                spacing="26px"
                                py="10px"
                                ps="20px"
                                my={5}
                                ms={5}
                              >
                                <Text
                                  me="auto"
                                  color={
                                    activeRoute(subRoute.path.toLowerCase())
                                      ? activeColor
                                      : inactiveColor
                                  }
                                  fontWeight={
                                    activeRoute(subRoute.path.toLowerCase())
                                      ? "bold"
                                      : "normal"
                                  }
                                >
                                  {subRoute.name}
                                </Text>
                              </HStack>
                            </Link>
                          ))}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              ) : (
                <Box onClick={() => toggleSubRoutes(route.path)}>
                  <HStack
                    spacing="22px"
                    py="20px"
                    ps="10px"
                    justify="space-between"
                    align="center"
                  >
                    <HStack align="center" spacing="10px">
                      <Box color={textColor} me="18px">
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={textColor}
                        fontWeight="normal"
                        cursor={"pointer"}
                      >
                        {route.name}
                      </Text>
                    </HStack>
                  </HStack>
                  <AnimatePresence>
                    {openRoute === route.path && route.subRoutes && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          pl="20px"
                          maxH="200px"
                          overflowY="auto"
                          bg={subRouteBg}
                          borderRadius="10px"
                          css={{
                            '&::-webkit-scrollbar': {
                              width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                              background: subRouteBg,
                            },
                            '&::-webkit-scrollbar-thumb': {
                              background: 'white',
                              borderRadius: '24px',
                            },
                          }}
                        >
                          {route.subRoutes.map((subRoute, subIndex) => (
                            <Link
                              as={RouterLink}
                              to={`${route.layout}/admin${subRoute.path}`}
                              key={subIndex}
                              _hover={{
                                textDecoration: "underline",
                                color: "teal.500",
                              }}
                              fontWeight="bold"
                              fontFamily="yekan"
                              color={
                                activeRoute(subRoute.path.toLowerCase())
                                  ? activeColor
                                  : inactiveColor
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              <HStack
                                spacing="26px"
                                py="10px"
                                ps="10px"
                                ms={10}
                                mt={3}
                              >
                                <Text
                                  me="auto"
                                  color={
                                    activeRoute(subRoute.path.toLowerCase())
                                      ? activeColor
                                      : inactiveColor
                                  }
                                  fontWeight={
                                    activeRoute(subRoute.path.toLowerCase())
                                      ? "bold"
                                      : "normal"
                                  }
                                >
                                  {subRoute.name}
                                </Text>
                              </HStack>
                            </Link>
                          ))}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              )}
            </React.Fragment>
          );
        }
        return null;
      });
  };

  return createLinks(routes);
}

export default SidebarLinks;
