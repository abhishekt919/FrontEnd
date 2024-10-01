import { lazy } from 'react';
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';
const ForgotPasswordEmailPage = lazy(() => import('./index'));

const ForgotPasswordEmailPageConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password/:success',
      element: <ForgotPasswordEmailPage />
    }
  ]
};

export default ForgotPasswordEmailPageConfig;
