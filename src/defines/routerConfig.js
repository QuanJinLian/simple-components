import { NavigationPage, ToastPage, TooltipPage, ESCTestPage } from '../pages';

export const routesConfig = [
  {
    name: 'toast',
    path: '/toast',
    component: ToastPage,
  },
  {
    name: 'tooltip',
    path: '/tooltip',
    component: TooltipPage,
  },
  {
    name: 'esc',
    path: '/esc',
    component: ESCTestPage,
  },
  {
    name: 'navigation',
    path: '/navigation',
    component: NavigationPage,
  },
];
