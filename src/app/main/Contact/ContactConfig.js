import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const ListingPage = lazy(() => import('./list/index'));
const FormPage = lazy(() => import('./add/index'));
const ContactConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'contact',
          element: <ListingPage />,
        },
        {
          path: 'contact/add',
          element: <FormPage />,
        },

    ]
}

export default ContactConfig;