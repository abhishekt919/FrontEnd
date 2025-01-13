import { useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import withReducer from "app/store/withReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeepCompareEffect } from "@fuse/hooks";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import * as yup from "yup";
import reducer from "../store";
import AddHeader from "./eventHeader";
import AddForm from "./eventForm";
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters long"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("time is required"),
  venue: yup.string().required("Venue is required"),
  totalSeats: yup.number().required("This filed is requred"),
  price: yup.number().required("This filed is requred"),
});

function AddPage() {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<AddHeader />}
        content={<AddForm />}
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("productModule", reducer)(AddPage);
