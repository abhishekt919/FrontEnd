import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';
import en from '../i18n/en';
import es from '../i18n/es';

i18next.addResourceBundle('en', 'Translation', en);
i18next.addResourceBundle('es', 'Translation', es);

import authRoles from '../../auth/authRoles';

const AddPage = lazy(() => import('./add/index'));
const ListingPage = lazy(() => import('./list/index'));
const StatisticsPage = lazy(() => import('./stats/index'));
const TransactionsPage = lazy(() => import('./transactions/index'));

const MachineConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.employee,
  routes: [
    {
      path: 'machines',
      element: <ListingPage />,
    },
    {
      path: 'machines/:id',
      element: <AddPage />,
    },
    {
      path: 'machines/stats/:id',
      element: <StatisticsPage />,
    },
    {
      path: 'machines/transactions/:id',
      element: <TransactionsPage />,
    },
    {
      path: 'machines',
      element: <Navigate to="machines" />,
    },
  ],
};

export default MachineConfig;
