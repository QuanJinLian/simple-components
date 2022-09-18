import { NavigationPage, ToastPage, TooltipPage } from '../pages';

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
    name: 'navigation',
    path: '/navigation',
    component: NavigationPage,
  },
];
