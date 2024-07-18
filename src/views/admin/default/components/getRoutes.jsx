import React from 'react';
import { Route } from 'react-router-dom';

const getRoutes = (routes) => {
  return routes.map((route, key) => {
    if (route.layout === '/admin') {
      return (
        <React.Fragment key={key}>
          <Route
            path={route.layout + route.path}
            component={route.component}
          />
          {route.subRoutes && route.subRoutes.length > 0 && getRoutes(route.subRoutes)}
        </React.Fragment>
      );
    }
    if (route.collapse) {
      return getRoutes(route.items);
    }
    if (route.category) {
      return getRoutes(route.items);
    } else {
      return null;
    }
  });
};

export default getRoutes;
