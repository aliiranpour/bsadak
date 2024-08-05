// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import routes from 'routes.js';
import { RtlProvider } from 'components/rtlProvider/RtlProvider.js';

export default function Dashboard(props) {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const location = useLocation();

  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };

  const getRoutes = (routes) => {
    return routes.map((route, idx) => {
      if (route.subRoutes) {
        return route.subRoutes.map((subRoute, subIdx) => (
          <Route
            path={`${route.layout}${subRoute.path}`}
            element={<subRoute.component />}
            key={`${idx}-${subIdx}`}
          />
        ));
      }
      return (
        <Route
          path={`${route.layout}${route.path}`}
          element={<route.component />}
          exact
          key={idx}
        />
      );
    });
  };

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    const currentPath = location.pathname;

    for (let i = 0; i < routes.length; i++) {
      if (routes[i].subRoutes && routes[i].subRoutes.length > 0) {
        for (let j = 0; j < routes[i].subRoutes.length; j++) {
          const fullPath = routes[i].layout + routes[i].layout + routes[i].subRoutes[j].path;
          if (currentPath.startsWith(fullPath)) {
            return routes[i].subRoutes[j].name;
          }
        }
      }
      const fullPath = routes[i].layout + routes[i].layout + routes[i].path;
      if (currentPath.startsWith(fullPath)) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  document.documentElement.dir = 'rtl';

  return (
    <RtlProvider>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar
        }}>
        <Sidebar routes={routes} display='none' {...rest} />
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'sepand UI Dashboard'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px' mt={20}>
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<div>صفحه مورد نظر یافت نشد</div>} />
              </Routes>
            </Box>
          ) : null}
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </RtlProvider>
  );
}
