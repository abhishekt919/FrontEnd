import { Alert, Card, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import _ from '@lodash';
import * as yup from 'yup';
import { userProfile } from 'app/store/userProfileSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import BackButton from '../../../theme-layouts/shared-components/BackButton';
import AuthService from '../../../auth/services/AuthService';
import { APP_CONSTANTS } from '../../../configs/constants';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  currentPassword: yup.string()
    .required('Please enter your current password.')
    .max(16, 'Password is too long - should be 16 characters maximum.'),
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
  currentPassword: "",
  password: "",
  passwordConfirm: ""
}

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('Translation');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const profile = useSelector(userProfile);
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // Form Submit.
  function onSubmit({ currentPassword, password }) {
    setLoading(true)
    AuthService
      .changePassword(currentPassword, password, profile._id)
      .then((message) => {
        dispatch(showMessage({ message: message }));
        setLoading(false);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error);
      });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  if (!profile || isLoading) {
    return <FuseLoading />
  }

  return (
    <Root
      header={
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-24 md:text-24 font-bold tracking-tight"
          >
            {t('CHANGE_PASSWORD')}
          </Typography>
          <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
           <BackButton/>
          </div>
        </div>
      }
      content={
        <>
          <div className="p-24">
            <Card className="w-full mb-32 p-24" variants={item}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label={t('CURRENT_PASSWORD')}
                        placeholder={t('CURRENT_PASSWORD')}
                        error={!!errors.currentPassword}
                        helperText={errors?.currentPassword?.message}
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
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label={t('NEW_PASSWORD')}
                        placeholder={t('NEW_PASSWORD')}
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
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label={t('CONFIRM_PASSWORD')}
                        placeholder={t('CONFIRM_PASSWORD')}
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
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-10">
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-10">
                <Grid item xs={12}>
                  <Button className="ml-auto" color="error" component={NavLinkAdapter} to={-1}>
                    {t('CANCEL')}
                  </Button>
                  <Button
                    className="ml-8"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {t('SUBMIT')}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </div>
        </>
      }
      scroll="content"
    />
  );
};

export default ChangePasswordPage;

