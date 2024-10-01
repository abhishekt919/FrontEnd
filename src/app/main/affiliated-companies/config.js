import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';

import en from '../i18n/en';
import es from '../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

const CompanyList = lazy(() => import('./list/index'));

const CompanyConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'affiliated-companies',
      element: <CompanyList />,
    },
    {
      path: 'affiliated-companies',
      element: <Navigate to="affiliated-companies" />,
    },
  ],
};

export default CompanyConfig;
