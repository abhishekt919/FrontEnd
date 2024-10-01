import { lazy } from 'react';
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';
const ResetPasswordPage = lazy(() => import('./index'));

const ResetPasswordPageConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'reset-password/:token',
      element: <ResetPasswordPage />
    },
  ],
};

export default ResetPasswordPageConfig;
