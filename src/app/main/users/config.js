import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';
import en from './../i18n/en';
import es from './../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

import authRoles from '../../auth/authRoles';

const AddUser = lazy(() => import('./add/index'));
const UsersList = lazy(() => import('./list/index'));
const UserPermissions = lazy(() => import('./permissions/index'));

const UsersConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.employee,
  routes: [
    {
      path: 'users',
      element: <UsersList />,
    },
    {
      path: 'users/:id',
      element: <AddUser />,
    },
    {
      path: 'users/permissions/:id',
      element: <UserPermissions />,
    },
    {
      path: 'users',
      element: <Navigate to="users" />,
    },
  ],
};

export default UsersConfig;
