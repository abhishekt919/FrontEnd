import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, TextField, Typography, Alert, IconButton } from '@mui/material';
import * as yup from 'yup';
import _ from '@lodash';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppLogo from 'app/shared-components/AppLogo';
import AuthService from './../../../auth/services/AuthService';
import { APP_CONSTANTS } from '../../../configs/constants';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup.string()
    .required(APP_CONSTANTS.StrongPasswordMessage)
    .min(8, APP_CONSTANTS.StrongPasswordMessage)
    .max(16, APP_CONSTANTS.StrongPasswordMessage)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      APP_CONSTANTS.StrongPasswordMessage
    ),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

const defaultValues = {
  password: '',
  passwordConfirm: '',
};

function ResetPasswordPage() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit({ password }) {
    const { token } = routeParams;
    if (token) {
      setLoading(true);
      AuthService
        .resetPassword(token, password)
        .then((message) => {
          setSuccessMessage(message);
          setLoading(false);
          setTimeout(() => {
            navigate('/sign-in');
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error);
        });
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <AppLogo type="bg" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Reset your password
          </Typography>
          <Typography className="font-medium">Create a new password for your account</Typography>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                      <InputAdornment position="end" >
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

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end" >
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

            {errorMessage ?
              <Alert severity="warning" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorMessage(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
                sx={{ mb: 2 }}>
                {errorMessage}
              </Alert> : null}

            {successMessage ?
              <Alert severity="success" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccessMessage(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
                sx={{ mb: 2 }}>
                {successMessage}
              </Alert> : null}

            <LoadingButton
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isLoading}
            >
              Reset your password
            </LoadingButton>

            <Typography className="mt-32 text-md font-medium" color="text.secondary">
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ResetPasswordPage;
