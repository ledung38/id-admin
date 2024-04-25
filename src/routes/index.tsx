import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));

// types

// render - landing page

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <UserTabPersonal />
        }
      ]
    },
    LoginRoutes,
    MainRoutes
  ],
  { basename: process.env.REACT_APP_BASE_NAME }
);

export default router;
