import { Navigate } from "react-router-dom";
import { lazy } from "react";

const ListingPage = lazy(() => import("./list/index"));
const FormPage = lazy(() => import("./add/index"));

const ProductConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "new-product",
      element: <ListingPage />,
    },
    {
      path: "add-product",
      element: <FormPage />,
    },
  ],
};

export default ProductConfig;
