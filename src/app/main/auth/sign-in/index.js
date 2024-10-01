import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AppLogo from 'app/shared-components/AppLogo';
import AuthService from './../../../auth/services/AuthService';
import { APP_CONSTANTS } from '../../../configs/constants';
import { selectCountries, getCountries } from '../../../store/countriesSlice';
import CountryCodeSelector from './../../../theme-layouts/shared-components/countries/CountryCodeSelector';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  countryCode: yup.string(),
  password: yup.string().max(16, "Invalid input."),
  userNameEmail: yup.string()
    .when("mobilePhone", {
      is: (val) => val == true,
      then: yup.string().required("Username or email is required."),
      otherwise: yup.string()
    }),
  mobilePhone: yup.string()
    .when("userNameEmail", {
      is: (val) => val == true,
      then: yup.string().required("Mobile phone number is required.").min(10, "Invalid mobile phone number.").max(10, "Invalid mobile phone number."),
      otherwise: yup.string()
    })
}, ["userNameEmail", "mobilePhone"]);

const defaultValues = {
  userNameEmail: '',
  password: '',
  countryCode: 'US',
  mobilePhone: ''
};

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showUserNameSignin, setShowUserNameSignin] = useState(false);
  const [showPhoneSignin, setShowPhoneSignin] = useState(true);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailPasswordError, setEmailPasswordError] = useState(null);
  const [mobilePasswordError, setMobilePasswordError] = useState(null);

  const { control, formState, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function onSubmit(data) {
    if (data.userNameEmail !== '') {
      // Sign in With Username or Email
      setLoading(true);
      let inputJson = {
        userNameEmail: data.userNameEmail
      }
      if(data.password !== ''){
        inputJson.password = data.password;
      }
      AuthService
        .signInWithUserNameEmail(inputJson)
        .then((result) => {
          setLoading(false);
          if (result?.data) {
            // Send To Verification Code
            navigate(`/confirmation-required/${result.data.email}`);
          }
          if (result?.user) {
            // Existing User, Complete Account
            navigate(`/complete-account/${result?.user?._id}`);
          }
          if (result?.password) {
            // Enter Password
            setShowPasswordField(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setEmailPasswordError(error);
        });
    } else {
      // Sign in With Mobile Phone
      let countryData = _.filter(countries, { iso: data.countryCode }).map(v => v);
      let mobilePhone = countryData[0].code + data.mobilePhone;
      let inputJson = {
        mobilePhone: mobilePhone
      }
      if(data.password !== ''){
        inputJson.password = data.password;
      }
      setLoading(true);
      AuthService
        .signInWithMobilePhone(inputJson)
        .then((result) => {
          setLoading(false);
          if (result?.data) {
            // Send To Verification Code
            navigate(`/confirmation-required-mobile/${result.data.mobilePhone}`);
          }
          if (result?.user) {
            // Existing User, Complete Account
            navigate(`/complete-account/${result?.user?._id}`);
          }
          if (result?.password) {
            // Enter Password
            setShowPasswordField(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setMobilePasswordError(error);
        });
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <AppLogo type="bg" />

          <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            {showPhoneSignin && (
              <Controller
                name="userNameEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Username or Email"
                    placeholder="Username or Email"
                    autoFocus
                    type="text"
                    error={!!errors.userNameEmail}
                    helperText={errors.userNameEmail?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            )}

            {showUserNameSignin && (
              <Controller
                control={control}
                name="mobilePhone"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Mobile Phone"
                    placeholder="Mobile Phone"
                    variant="outlined"
                    type="number"
                    fullWidth
                    error={!!errors.mobilePhone}
                    helperText={errors?.mobilePhone?.message}
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
            )}

            {showPasswordField && (
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
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
              />)}

            {emailPasswordError ?
              <Alert severity="warning" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setEmailPasswordError(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
                sx={{ mb: 2 }}>
                {emailPasswordError}
              </Alert> : null}

            {mobilePasswordError ?
              <Alert severity="warning" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setMobilePasswordError(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
                sx={{ mb: 2 }}>
                {mobilePasswordError}
              </Alert> : null}

            <div className="flex flex-col items-end">
              <Link className="text-md font-medium" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <LoadingButton
              variant="contained"
              color="secondary"
              className="w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isLoading}
            >
              {showPasswordField ? "Sign in" : "Continue"}
            </LoadingButton>
            {showPhoneSignin && (
              <a className="text-lg font-medium mt-20 cursor-pointer"
                onClick={() => {
                  setValue('userNameEmail', '');
                  setShowPhoneSignin(false);
                  setShowPasswordField(false);
                  setShowUserNameSignin(true);
                }}
              >
                Sign with Mobile Phone
              </a>
            )}
            {showUserNameSignin && (
              <a className="text-lg font-medium mt-20 cursor-pointer"
                onClick={() => {
                  setValue('mobilePhone', '');
                  setShowPhoneSignin(true);
                  setShowPasswordField(false);
                  setShowUserNameSignin(false);
                }}
              >
                Sign with Username or Email
              </a>
            )}
          </form>
          <div className="flex items-baseline mt-20 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4 text-lg" to="/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </Paper>

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
            <div>Welcome to <AppLogo type="white" className="mt-10" /></div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            {APP_CONSTANTS.SiteDescription}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
