import { lazy } from 'react';
const SignUpPage = lazy(() => import('./index'));
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';

const SignUpConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-up',
      element: <SignUpPage />,
    },
  ],
};

export default SignUpConfig;
