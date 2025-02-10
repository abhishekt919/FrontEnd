import { lazy } from 'react';

const ListingPage = lazy(() => import('./list/index'));
//const FormPage = lazy(() => import('./add/index'));
const CustomerConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'customer',
          element: <ListingPage />,
        }
    ]
}

export default CustomerConfig;