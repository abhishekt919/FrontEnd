import i18next from 'i18next';
import en from './../i18n/en';
import es from './../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

import Dashboard from './index';

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;
