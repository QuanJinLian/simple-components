import { NavigationPage, ToastPage, TooltipPage, ESCTestPage, FormTest, GlobalStatePage } from '../pages';

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
    name: 'useForm',
    path: '/useForm',
    component: FormTest,
  },
  {
    name: 'navigation',
    path: '/navigation',
    component: NavigationPage,
  },
  {
    name: 'useGlobalState',
    path: '/useGlobalState',
    component: GlobalStatePage,
  },
];
