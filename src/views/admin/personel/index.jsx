// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';
// import routes from 'routes';
// import { Link as RouterLink } from 'react-router-dom';
// import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

// function Personel() {
//   const bg = useColorModeValue('gray.100', 'gray.900');
//   const location = useLocation();

//   const getRoutes = (routes) => {
//     return routes.map((route, idx) => {
//       if (route.subRoutes) {
//         return route.subRoutes.map((subRoute, subIdx) => (
//           <Route
//             path={`${route.layout}${route.path}${subRoute.path}`}
//             element={<subRoute.component />}
//             key={`${idx}-${subIdx}`}
//           />
//         ));
//       }
//       return (
//         <Route
//           path={`${route.layout}${route.path}`}
//           element={<route.component />}
//           exact
//           key={idx}
//         />
//       );
//     });
//   };

//   const bgColors = [
//     "rgba(255, 0, 0, 0.8)",      // red
//     "rgba(65, 105, 225, 0.8)",   // blue
//     "rgba(0, 255, 0, 0.8)",      // green
//     "rgba(255, 105, 180, 0.8)",  // pink
//     "rgba(255, 165, 0, 0.8)",    // orange
//   ];

//   const renderSubRoutes = (routes) => {
//     return (
//       <Flex wrap="wrap" gap={4} marginTop={4}>
//         {routes.map((route, idx) => {
//           if (route.name === "پرسنل" && route.subRoutes) {
//             return route.subRoutes.map((subRoute, subIdx) => (
//               <Box
//                 key={`${idx}-${subIdx}`}
//                 pt={{ base: "20px", md: "25px", xl: "25px" }}
//                 p={4}
//                 bg={bgColors[subIdx % bgColors.length]}
//                 borderRadius="xl"
//                 mb={5}
//                 height="130px"
//                 flexBasis={{ base: "45%", md: "30%", xl: "20%" }}
//                 backdropFilter="blur(10px)" 
//                 color="white" 
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 boxShadow="xl"
//               >
//                 <Link
//                   as={RouterLink}
//                   to={`${route.layout}${route.path}${subRoute.path}`}
//                   _hover={{ textDecoration: "underline", color: "teal.500" }}
//                   fontWeight="bold" 
//                   fontFamily={yekan}
//                 >
//                   {subRoute.name}
//                 </Link>
//               </Box>
//             ));
//           }
//           return null;
//         })}
//       </Flex>
//     );
//   };

//   return (
//     <Box>
//       <Box as="header" width="100%" bg={bg} p={10} boxShadow="md" />
//       <Box
//         mt={4}
//         minHeight="calc(100vh - 100px)"
//         display="flex"
//         flexDirection="column"
//       >
//         {location.pathname === "/admin/personel" && renderSubRoutes(routes)}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="/admin" element={<Navigate to="/admin/personel" />} />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// export default Personel;
