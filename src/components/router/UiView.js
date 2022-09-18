import React from 'react';
import { Route, Switch, Redirect, withRouter, useRouteMatch } from 'react-router-dom';
import { routerService } from './service/routerService';

function UiView({ isHighest, className, ...props }) {
  let { url } = useRouteMatch();
  const match = routerService.getMatchPathByPathname(url);
  const parentPath = isHighest ? null : match?.path;
  const defaultRoute = routerService.defaultRoute;
  const notFoundPath = parentPath ? parentPath + '/*' : '/*';
  let routes;

  if (parentPath) {
    routes = routerService.getSubRoutes(parentPath);
  } else if (isHighest || (!match && url === '/')) {
    routes = routerService.getMainRoutes();
  }

  return (
    <div className={className ?? ''}>
      <Switch>
        {routes?.map(route => (
          <Route
            key={route.name}
            path={route.path}
            render={routeProps => <route.component parentPath={route.path} {...routeProps} {...props} />}
          />
        ))}
        <Route path={notFoundPath}>
          {typeof defaultRoute === 'function' ? defaultRoute : <Redirect to={defaultRoute} />}
        </Route>
      </Switch>
    </div>
  );
}

export default React.memo(withRouter(UiView));
