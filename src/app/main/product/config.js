import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const ListingPage = lazy(() => import('./list/index'));
const FormPage = lazy(() => import('./addProduct/index'));
const CartPage = lazy(() => import('./cart/index'));

const ProductConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'product',
          element: <ListingPage />,
        },
        {path:'product/new',
          element: <FormPage/>
        },
        {path:'cart',
          element: <CartPage/>
        },
        {
          path: 'product',
          element: <Navigate to="product" />,
        }
    ]
}

export default ProductConfig;