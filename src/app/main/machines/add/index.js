import { Button, Typography } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { userSession } from 'app/store/userSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";
import { NoAccessPage } from 'app/shared-components/index';
import { getMachineById, newMachine, resetMachineForm, selectMachine } from '../store/machineSlice';
import { selectCountries, getCountries } from '../../../store/countriesSlice';
import reducer from '../store';
import AddHeader from './AddHeader';
import AddForm from './AddForm';

// Form Validation Schema
const schema = yup.object().shape({
  machineType: yup.string().required('This field is required.'),
  cabinetSerialNumber: yup.string().max(100, 'Not more than 50 characters.'),
  programSerialNumber: yup.string().required('This field is required.').max(100, 'Not more than 50 characters.'),
  sentry: yup.boolean(),
  atm: yup.boolean(),
  tito: yup.boolean(),
  locationName: yup.string().max(100, 'Not more than 100 characters.'),
  addressLine1: yup.string().max(100, 'Not more than 100 characters.'),
  addressLine2: yup.string().max(100, 'Not more than 50 characters.'),
  city: yup.string().max(50, 'Not more than 50 characters.'),
  state: yup.string().max(50, 'Not more than 50 characters.'),
  country: yup.string(),
  zipcode: yup.string().max(10, 'Not more than 10 characters.'),
  managerName: yup.string().max(50, 'Not more than 50 characters.'),
  email: yup.string().email('Email address is not valid.'),
  countryCode: yup.string(),
  mobilePhone: yup.string().max(10, 'Invalid mobile phone number.'),
});

function AddPage() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const machine = useSelector(selectMachine);
  const signInUser = useSelector(userSession);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [noRecord, setNoRecord] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewRecord, setPreviewRecord] = useState(false);
  const [hasPageAccess, setHasPageAccess] = useState(null);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();

  useEffect(() => {
    if (Cookies.get("_SuperMyMachineOnline")) {
      setHasPageAccess(true);
    } else {
      if (signInUser) {
        const hasPermission = hasModuleAccess(
          USER_PERMISSIONS_CODES.MACHINES,
          ACCESS_PERMISSIONS.CREATE
        )
        setHasPageAccess(hasPermission);
      }
    }
  }, [dispatch]);

  useDeepCompareEffect(() => {
    function updatePageState() {
      const { id } = routeParams;
      setEditId(id);
      if (id === 'new') {
        //Create New Record
        dispatch(newMachine());
      } else {
        //Get Data
        const { preview } = routeParams;
        if (preview) {
          setPreviewRecord(true);
        }
        dispatch(getMachineById(id)).then((action) => {

          //If the requested record does not exist show message
          if (!action.payload) {
            setNoRecord(true);
          }
        });
      }
    }

    updatePageState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!machine) {
      return;
    }

    //  Reset the form on state changes
    reset(machine);
  }, [machine, reset]);

  useEffect(() => {
    return () => {

      // Reset on component unload
      dispatch(resetMachineForm());
      setNoRecord(false);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  // Show Message if the requested Record does not exists
  if (noRecord) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such record!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/machines"
          color="inherit"
        >
          Go to Machines Page
        </Button>
      </motion.div>
    );
  }

  // Wait while data is loading and form is being set
  if (
    _.isEmpty(form) ||
    (machine && routeParams.id !== machine._id && routeParams.id !== 'new') || !countries
  ) {
    return <FuseLoading />;
  }

    /**
 * Show Message if the page has not access
 */
    if (hasPageAccess) return <NoAccessPage />;

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<AddHeader editId={editId} machineData={machine} previewRecord={previewRecord}/>}
        content={
          <div className="p-16 sm:p-24">
            <AddForm editId={editId} machineData={machine} previewRecord={previewRecord} />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('machineModule', reducer)(AddPage);
  