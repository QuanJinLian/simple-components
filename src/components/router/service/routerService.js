import { matchPath } from 'react-router-dom';

export const routerService = (() => {
  let routes_main;
  let routes_flat;

  /** 초기 값 저장 및 세팅 */
  const setInitRoutes = (initialRoutes, defaultRoute) => {
    uiViewService.defaultRoute = defaultRoute;
    routes_flat = [];
    routes_main = [];
    setFlatRoutes(initialRoutes);
  };

  /** 초기 셋팅할때 중첩 배열을 1차원으로 풀어주는 작업
   *  중첩 된 path 를 full path 로 풀어서 저장해 줌
   * */
  const setFlatRoutes = (initialRoutes, parentPath = '') => {
    for (let i = 0; i < initialRoutes?.length; i++) {
      const route = { ...initialRoutes[i] };
      if (parentPath !== '') {
        route.parentPath = parentPath;
        route.path = parentPath + route.path;
      } else {
        routes_main.push(route);
      }
      routes_flat.push(route);
      if (route.childRoutes) {
        setFlatRoutes(route.childRoutes, route.path);
      }
    }
  };

  /** UiView 에서 1차 Route 컴포넌트 렌더링 시 필요함 */
  const getMainRoutes = () => {
    return routes_main;
  };

  /** UiView 에서 2차 혹은 n차 Route 컴포넌트 렌더링 시 필요함 */
  const getSubRoutes = parentPath => {
    let new_routes = [];
    for (let i = 0; i < routes_flat?.length; i++) {
      const route = routes_flat[i];
      if (route.parentPath === parentPath) {
        new_routes.push(route);
      }
    }
    return new_routes;
  };

  /** 네비게이션에서 pathname 으로 메뉴 셋팅 시 필요 함 */
  const getMatchPathByPathname = pathname => {
    for (let i = 0; i < routes_flat?.length; i++) {
      const route = routes_flat[i];
      const match = matchPath(pathname, { path: route.path, exact: true, strict: true });
      if (match) {
        const parentPath = route.parentPath;
        match.parentPath = parentPath;
        match.parentUrl = getParentUrl(parentPath, match.params);
        return match;
      }
    }
    return null;
  };

  const uiViewService = {
    getMainRoutes: getMainRoutes,
    setInitRoutes: setInitRoutes,
    getSubRoutes: getSubRoutes,
    getMatchPathByPathname: getMatchPathByPathname,
  };

  return uiViewService;
})();

const getParentUrl = (path, params = {}) => {
  let url = path;

  for (let [key, value] of Object.entries(params)) {
    url = url?.replaceAll(`:${key}`, value);
  }

  return url;
};
