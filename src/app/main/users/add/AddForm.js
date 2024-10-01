import {
  Button, Checkbox, FormControlLabel,
  Grid, InputAdornment, MenuItem, 
  TableCell, TableRow,
  TextField, Typography
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CountryCodeSelector from './../../../theme-layouts/shared-components/countries/CountryCodeSelector';
import AuthService from './../../../auth/services/AuthService';
import { userSession } from 'app/store/userSlice';
import { selectCountries } from 'app/store/countriesSlice';
import { createUser } from '../store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
  CustomTooltip
} from "app/shared-components/index";

const container = {
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const authRoles = [{
  name: 'Director',
  value: 'director'
}, {
  name: 'Manager',
  value: 'manager'
}, {
  name: 'Employee',
  value: 'employee'
}];

function AddForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { t } = useTranslation('Translation');
  const signInUser = useSelector(userSession);
  const countries = useSelector(selectCountries);
  const navigate = useNavigate();

  const { control, formState, getValues, watch } = methods;
  const selectedRole = watch('role');
  const { errors, isValid, dirtyFields } = formState;
  const formValues = getValues();
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [mobilePhoneAvailable, setMobilePhoneAvailable] = useState(false);
  const [mobilePhoneError, setMobilePhoneError] = useState(null);
  const [defaultPermissions, setDefaultPermissions] = useState([]);

  useEffect(() => {
    if (selectedRole) {
      axios.get(`/users/permissions/default/${selectedRole}`).then((result) => {
        console.log("result", result.data.data);
        setDefaultPermissions(result.data.data);
      });
    }
  }, [selectedRole]);

  function handleCreateRecord() {
    let inputJson = getValues();
    let countryData = _.filter(countries, { iso: inputJson.countryCode }).map(v => v);
    inputJson.company = signInUser.company;
    inputJson.country = countryData[0].name;
    inputJson.mobilePhone = countryData[0].code + inputJson.mobilePhone;
    inputJson.isSuperAdminSubmitting = false;
    if (inputJson._id) {
      inputJson.updatedBy = signInUser._id;
    } else {
      inputJson.createdBy = signInUser._id;
      inputJson.updatedBy = signInUser._id;
    }
    inputJson.isRoleUpdated = props.userData.role !== inputJson.role ? true : false;
    if (Cookies.get("_SuperMyMachineOnline")) {
      inputJson.isSuperAdminSubmitting = true;
    }
    dispatch(createUser(inputJson)).then((result) => {
      setUsernameAvailable(false);
      if (result.payload.messageId === 200) {
        dispatch(showMessage({ message: result.payload.message }));
        navigate('/users');
      } else {
        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
      }
    });
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 w-full min-w-0 p-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="firstName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  error={!!errors.firstName}
                  required
                  helperText={errors?.firstName?.message}
                  label={t('FIRST_NAME')}
                  id="firstName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="lastName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  error={!!errors.lastName}
                  required
                  helperText={errors.lastName?.message}
                  label={t('LAST_NAME')}
                  id="lastName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onBlur={(e) => {
                    if (e.target.value) {
                      const inputJson = {
                        email: e.target.value
                      }
                      AuthService.checkEmail(inputJson)
                        .then((result) => {
                          setEmailError(null);
                          setEmailAvailable(true);
                        })
                        .catch((error) => {
                          setEmailError(error);
                          setEmailAvailable(false);
                        });
                    }
                  }}
                  className="mb-16"
                  id="email"
                  label={t('EMAIL')}
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email || emailError}
                  required
                  helperText={errors?.email?.message || emailError}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        {emailAvailable && (<CheckCircleIcon color="success" />)}
                      </InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <TextField
                  {...field}
                  onBlur={(e) => {
                    if (e.target.value) {
                      const inputJson = {
                        username: e.target.value
                      }
                      AuthService.checkUserName(inputJson)
                        .then((result) => {
                          setUsernameError(null);
                          setUsernameAvailable(true);
                        })
                        .catch((error) => {
                          setUsernameError(error);
                          setUsernameAvailable(false);
                        });
                    }
                  }}
                  label={t('USERNAME')}
                  placeholder={t('USERNAME')}
                  error={!!errors.username || usernameError}
                  helperText={errors.username?.message || usernameError}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        {usernameAvailable && (<CheckCircleIcon color="success" />)}
                      </InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              defaultValue=""
              name="mobilePhone"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  label={t('MOBILE_PHONE')}
                  placeholder="9876543210"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onBlur={(e) => {
                    if (e.target.value) {
                      let countryData = _.filter(countries, { iso: getValues("countryCode") }).map(v => v);
                      const inputJson = {
                        mobilePhone: countryData[0].code + e.target.value
                      }
                      AuthService.checkMobilePhone(inputJson)
                        .then((result) => {
                          setMobilePhoneError(null);
                          setMobilePhoneAvailable(true);
                        })
                        .catch((error) => {
                          setMobilePhoneError(error);
                          setMobilePhoneAvailable(false);
                        });
                    }
                  }}
                  error={!!errors.mobilePhone || mobilePhoneError}
                  helperText={errors?.mobilePhone?.message || mobilePhoneError}
                  required
                  InputProps={{
                    startAdornment: (
                      <Controller
                        control={control}
                        name="countryCode"
                        defaultValue="US"
                        render={({ field: _field }) => (
                          <InputAdornment position="start">
                            <CountryCodeSelector {..._field} />
                          </InputAdornment>
                        )}
                      />
                    ),
                    endAdornment:
                      <InputAdornment position="end">
                        {mobilePhoneAvailable && (<CheckCircleIcon color="success" />)}
                      </InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              defaultvalue=""
              name="role"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label={t('ROLE')}
                  variant="outlined"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors?.role?.message}
                  required
                >
                  {authRoles.map((option) => (
                    <MenuItem key={option.name} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="lastLoginEnabled"
              defaultValue={formValues.lastLoginEnabled}
              render={({ field }) => (
                <FormControlLabel
                  label={t("LOGIN_LOG")}
                  control={<Checkbox size="small" {...field} checked={formValues.lastLoginEnabled} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid || usernameError}
              onClick={handleCreateRecord}
            >
              {props.editId !== 'new' ? t('UPDATE') : t('SUBMIT')}
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="mx-20">
        {defaultPermissions.length > 0 && (
          <>
            <Typography color="text.secondary" className="mb-20" variant="body">
              Default permissions for <span className="font-bold uppercase">{selectedRole}</span>
            </Typography>
            {defaultPermissions.map((n) => {
              return (
                <TableRow
                  className="h-20 cursor-pointer"
                  hover
                  tabIndex={-1}
                  key={n.moduleCode}
                >
                  <TableCell className="p-8" component="th" scope="row">
                    <CustomTooltip title={n?.description}>
                      <span className="font-bold">{n?.moduleName}:</span>
                    </CustomTooltip>
                  </TableCell>
                  {n?.permissions.map((m, i) => {
                    return (
                      <TableCell key={i} className="p-8" component="th" scope="row">
                        {m ? <span>{m}</span> : 'HERE'}
                      </TableCell>
                    )
                  })}
                  {n?.permissions.length === 0 && (
                    <TableCell className="p-8" component="th" scope="row">
                      <span>No Permissions</span>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </>
        )}
      </div>
    </motion.div>
  );
}
export default AddForm;