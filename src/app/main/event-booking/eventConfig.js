import { Navigate } from "react-router-dom";
import { lazy } from "react";

const ListingPage = lazy(() => import("./event/index"));
const FormPage = lazy(() => import("./add-event/index"));

const EventConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "event",
      element: <ListingPage />,
    },
    {
      path: "add-event",
      element: <FormPage />,
    }
  ]
};

export default EventConfig;
