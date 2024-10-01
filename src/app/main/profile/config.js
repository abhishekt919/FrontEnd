import { lazy } from 'react';
import i18next from 'i18next';
import en from './../i18n/en';
import es from './../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePassword'));

const ProfileConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'edit-profile',
      element: <EditProfile />,
    },
    {
      path: 'change-password',
      element: <ChangePasswordPage />,
    }
  ],
};

export default ProfileConfig;
