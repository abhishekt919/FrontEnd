import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AppLogo from 'app/shared-components/AppLogo';
import { selectCountries, getCountries } from '../../../store/countriesSlice';
import CountryCodeSelector from './../../../theme-layouts/shared-components/countries/CountryCodeSelector';
import AuthService from './../../../auth/services/AuthService';
import { APP_CONSTANTS } from '../../../configs/constants';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required('Please enter your first name.').max(50, 'First name should not be greater than 50 characters.'),
  lastName: yup.string().required('Please enter your last name.').max(50, 'Last name should not be greater than 50 characters.'),
  email: yup.string().email('Email address is not valid.').required('Please enter your email address.'),
  countryCode: yup.string(),
  mobilePhone: yup.string().required('Please enter your mobile phone.').min(10, 'Invalid mobile phone number.').max(10, 'Invalid mobile phone number.'),
  password: yup
    .string()
    .required('Please choose your password.')
    .min(3, 'Password is too short - should be 3 chars minimum.')
    .max(16, 'Password is should not be greater than 16 characters.'),
  companyName: yup.string().required('Please enter company name.').max(100, 'Company name should not be greater than 100 characters.'),
  referralCode: yup.string().max(10, 'Referral Code should not be greater than 10 characters.'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'Terms of use and privacy policy must be accepted.'),
  verifyUsing: yup.mixed().oneOf(['Email', 'Mobile Phone'], 'This field is required')
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  countryCode: 'US',
  mobilePhone: '',
  companyName: '',
  referralCode: '',
  acceptTermsConditions: false,
  verifyUsing: 'Email'
};

function CompleteAccountPage() {
  const routeParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const { control, formState, handleSubmit, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const formValues  = getValues();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function onSubmit(data) {
    const { token } = routeParams;
    if (token) {
      let countryData = _.filter(countries, { iso: data.countryCode }).map(v => v);
      let inputJson = {
        _id: token,
        firstName: data.firstName,
        lastName: data.lastName,
        mobilePhone: countryData[0].code + data.mobilePhone,
        password: data.password,
        email: data.email,
        country: countryData[0].iso.toUpperCase(),
        companyName: data.companyName,
        referralCode: data.referralCode,
        verifyUsing: data.verifyUsing,
        createdBy: token,
        updatedBy: token
      }
      setLoading(true);
      AuthService
        .completeYourAccount(inputJson)
        .then((result) => {
          // if (result.data?.email) {
          //   navigate(`/confirmation-required/${result.data.email}`);
          // } else {
          //   navigate(`/confirmation-required-mobile/${result.data.mobilePhone}`);
          // }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setEmailError(error);
        });
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome To <AppLogo type="white" className="mt-10" /></div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            {APP_CONSTANTS.SiteDescription}
          </div>
        </div>
      </Box>

      <Paper className="h-full sm:h-auto md:flex md:items-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none rtl:border-r-1 ltr:border-l-1">
        <div className="w-full mx-auto sm:mx-0">
          <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
            Complete Account
          </Typography>
          <Typography variant="body2">
            Please Complete all required fields
          </Typography>
          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      placeholder="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      placeholder="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="mobilePhone"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mobile Phone"
                      placeholder="Mobile Phone"
                      variant="outlined"
                      type="number"
                      fullWidth
                      error={!!errors.mobilePhone}
                      helperText={errors?.mobilePhone?.message}
                      required
                      InputProps={{
                        startAdornment: (
                          <Controller
                            control={control}
                            name="countryCode"
                            render={({ field: _field }) => (
                              <InputAdornment position="start">
                                <CountryCodeSelector {..._field} />
                              </InputAdornment>
                            )}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        endAdornment:
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company Name"
                      type="text"
                      error={!!errors.companyName}
                      helperText={errors?.companyName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="referralCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Referral Code (Optional)"
                      type="text"
                      error={!!errors.referralCode}
                      helperText={errors?.referralCode?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl className="mt-10" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="I agree to the Terms of use and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="verifyUsing"
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel id="radio-buttons-group-label">Verify Account Using</FormLabel>
                    <RadioGroup row {...field} aria-label="verifyUsing" value={formValues.verifyUsing}>
                      <FormControlLabel value="Email" control={<Radio />} label="Email" />
                      <FormControlLabel value="Mobile Phone" control={<Radio />} label="Mobile Phone" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            {emailError ?
              <Alert severity="warning" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setEmailError(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
                sx={{ mb: 2 }}>
                {emailError}
              </Alert> : null}

            <LoadingButton
              variant="contained"
              color="secondary"
              className="sm:w-1/2 xs:w-full mt-16"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isLoading}
            >
              Complete your account
            </LoadingButton>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default CompleteAccountPage;
