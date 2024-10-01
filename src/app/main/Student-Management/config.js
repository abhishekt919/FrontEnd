import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const ListingPage = lazy(() => import('./list/index'));
const FormPage = lazy(() => import('./add/index'));

const ProductConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'student',
          element: <ListingPage />,
        },
        {path:'student/new',
          element: <FormPage/>
        },
        {
          path: 'student',
          element: <Navigate to="student" />,
        }
    ]
}

export default ProductConfig;