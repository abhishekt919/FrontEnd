import { lazy } from 'react';
const ForgotPasswordPage = lazy(() => import('./index'));
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';

const ForgotPasswordPageConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />
    },
  ],
};

export default ForgotPasswordPageConfig;
