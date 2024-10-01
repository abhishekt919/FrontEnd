import i18next from 'i18next';

import en from './../i18n/en';
import es from './../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

import SettingsPage from './index';
import authRoles from '../../auth/authRoles';

const AccountSettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.employee,
  routes: [
    {
      path: 'settings',
      element: <SettingsPage />,
    }
  ],
};

export default AccountSettingsConfig;
