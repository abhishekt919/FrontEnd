import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, TextField, Typography, Alert, IconButton } from '@mui/material';
import * as yup from 'yup';
import _ from '@lodash';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AppLogo from 'app/shared-components/AppLogo';
import AuthService from './../../../auth/services/AuthService';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('Email address is not valid.').required('Please enter your email address.'),
});

const defaultValues = {
  email: '',
};

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit({ email }) {
    setLoading(true);
    AuthService
      .forgotPassword(email)
      .then((message) => {
        navigate('/forgot-password/email-sent');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error);
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <AppLogo type="bg" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Forgot password?
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Fill the form to reset your password</Typography>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
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

            <LoadingButton
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Forgot Password"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isLoading}
            >
              Send reset link
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

export default ForgotPasswordPage;
