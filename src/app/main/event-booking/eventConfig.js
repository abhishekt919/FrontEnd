import { Navigate } from "react-router-dom";
import { lazy } from "react";

const ListingPage = lazy(() => import("./event/index"));
//const FormPage = lazy(() => import("./add/index"));

const EventConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "event",
      element: <ListingPage />,
    }
  ]
};

export default EventConfig;
