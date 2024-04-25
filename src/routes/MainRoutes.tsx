import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import { OrderList } from 'pages/orders-list';
import { CustomersList } from 'pages/customer-list';
import { SalesList } from 'pages/sales-list';
import { CustomerDetails } from 'pages/customer-details';
import { CreateNewCustomer } from 'pages/create-new-customer';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));
// render - applications

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: 'apps',
      element: <DashboardLayout />,
      children: [
        {
          path: 'profiles',
          children: [
            {
              path: 'user',
              element: <UserProfile />,
              children: [
                {
                  path: 'personal',
                  element: <UserTabPersonal />
                },
                {
                  path: 'payment',
                  element: <UserTabPayment />
                },
                {
                  path: 'password',
                  element: <UserTabPassword />
                },
                {
                  path: 'settings',
                  element: <UserTabSettings />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },

    {
      path: '/orders',
      element: <DashboardLayout />,
      children: [
        {
          path: 'list',
          element: <OrderList />
        }
      ]
    },
    {
      path: '/customers',
      element: <DashboardLayout />,
      children: [
        {
          path: 'list',
          element: <CustomersList />
        },
        {
          path: 'create',
          element: <CreateNewCustomer />
        }
      ]
    },
    {
      path: '/customer/:id',
      element: <CustomerDetails />
    },
    {
      path: '/sales',
      element: <DashboardLayout />,
      children: [
        {
          path: 'list',
          element: <SalesList />
        }
      ]
    }
    // {
    //   path: '/auth',
    //   element: <PagesLayout />,
    //   children: [
    //     {
    //       path: 'login',
    //       element: <AuthLogin />
    //     },
    //     {
    //       path: 'register',
    //       element: <AuthRegister />
    //     },
    //     {
    //       path: 'forgot-password',
    //       element: <AuthForgotPassword />
    //     },
    //     {
    //       path: 'reset-password',
    //       element: <AuthResetPassword />
    //     },
    //     {
    //       path: 'check-mail',
    //       element: <AuthCheckMail />
    //     },
    //     {
    //       path: 'code-verification',
    //       element: <AuthCodeVerification />
    //     }
    //   ]
    // }
  ]
};

export default MainRoutes;
