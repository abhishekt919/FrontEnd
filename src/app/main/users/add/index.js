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
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES,
  REGEX_CONSTANTS
} from './../../../configs/constants';
import { NoAccessPage } from 'app/shared-components/index';
import { userSession } from 'app/store/userSlice';
import { getUserById, newUser, resetUserForm, selectUser } from '../store/userSlice';
import { selectCountries, getCountries } from '../../../store/countriesSlice';
import reducer from '../store';
import AddHeader from './AddHeader';
import AddForm from './AddForm';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
// Form Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required('Please enter first name.').max(50, 'First name should not be greater than 50 characters.'),
  lastName: yup.string().required('Please enter last name.').max(50, 'Last name should not be greater than 50 characters.'),
  email: yup.string().required('Please enter email address.').email('Email address is not valid.'),
  username: yup.string().required('Username is required.')
    .matches(REGEX_CONSTANTS.USER_NAME_REGEX, 'Username may consist of lowercase and uppercase letters, digits, or underscore characters, with a length requirement of 3 to 20 characters.'),
  countryCode: yup.string(),
  mobilePhone: yup.string().required('Please enter mobile phone.').min(10, 'Invalid mobile phone number.').max(10, 'Invalid mobile phone number.'),
  role: yup.string().required('Please select user role.'),
  lastLoginEnabled: yup.boolean()
});

function AddUser() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const user = useSelector(selectUser);
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
          USER_PERMISSIONS_CODES.USERS,
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
        dispatch(newUser());
      } else {
        //Get Data
        const { preview } = routeParams;
        if (preview) {
          setPreviewRecord(true);
        }
        dispatch(getUserById(id)).then((action) => {

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
    if (!user) {
      return;
    }

    //  Reset the form on state changes
    reset(user);
  }, [user, reset]);

  useEffect(() => {
    return () => {

      // Reset on component unload
      dispatch(resetUserForm());
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
          to="/users"
          color="inherit"
        >
          Go to Users Page
        </Button>
      </motion.div>
    );
  }

  // Wait while data is loading and form is being set
  if (
    _.isEmpty(form) ||
    (user && routeParams.id !== user._id && routeParams.id !== 'new') || !countries
  ) {
    return <FuseLoading />;
  }

    /**
 * Show Message if the page has not access
 */
    if (!hasPageAccess) return <NoAccessPage />;

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<AddHeader editId={editId} userData={user} previewRecord={previewRecord} />}
        content={
          <div className="p-16">
            <AddForm editId={editId} userData={user} previewRecord={previewRecord} />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('userStore', reducer)(AddUser);
