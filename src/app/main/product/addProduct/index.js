import { useEffect, useState } from 'react';
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom';
import withReducer from "app/store/withReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeepCompareEffect } from '@fuse/hooks';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import * as yup from "yup";
import reducer from "../store";
import AddHeader from "./addFormHeader";
import AddForm from "./addForm";
const schema = yup.object().shape({
  title: yup
    .string()
    .required("This field is required.")
    .max(50, "Not more than 50 characters."),
  name: yup.string().required('This field is required').min(2,'Minimum 2 character are required'),
  price: yup.number().required("Please enter a price to your product"),
  description: yup.string().required("Enter your product description"),
  country: yup.string("This filed is required").required("This filed is required"),
  state: yup.string("This filed is required").required("This filed is required"),
  district: yup.string("This filed is required").required("This filed is required")
});

function AddPage() {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const [editId, setEditId] = useState(null);

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

export default withReducer('productModule', reducer)(AddPage);