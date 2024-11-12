import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const ListingPage = lazy(() => import('./main/index'));

const LightConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'traffic-light',
          element: <ListingPage />,
        },
        {
          path: 'traffic-light',
          element: <Navigate to="traffic-light" />,
        }
    ]
}

export default LightConfig;