import { lazy } from 'react';

const CompleteAccountPage = lazy(() => import('./index'));
import authRoles from '../../../auth/authRoles';
import authPagesSettings from './../authPagesSettings';

const CompleteAccountConfig = {
  settings: authPagesSettings,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'complete-account/:token',
      element: <CompleteAccountPage />,
    },
  ],
};

export default CompleteAccountConfig;
