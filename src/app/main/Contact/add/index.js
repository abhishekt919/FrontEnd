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
import AddHeader from "./formHeader";
import AddForm from "./contactForm";
const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters long'),
    lastName: yup
      .string()
      .required('Last name is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
      image: yup.mixed()
      .test('fileSize', 'File size is too large', (value) => {
        return value && value.size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test('fileType', 'Unsupported file format', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type); // Allowed types
      }),
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

export default withReducer('productModule', reducer)(AddPage);