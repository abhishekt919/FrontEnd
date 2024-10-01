import { lazy } from 'react';
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';

const ConfirmationRequiredPage = lazy(() => import('./index'));
const VerifyMobilePhonePage = lazy(() => import('./VerifyMobilePhone'));

const ConfirmationRequiredPageConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'confirmation-required/:token',
      element: <ConfirmationRequiredPage />
    },
    {
      path: 'confirmation-required-mobile/:token',
      element: <VerifyMobilePhonePage />
    }
  ]
};

export default ConfirmationRequiredPageConfig;
