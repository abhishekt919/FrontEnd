import BackButton from 'app/theme-layouts/shared-components/BackButton';
import { Button, Card, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import CountryCodeSelector from 'app/theme-layouts/shared-components/countries/CountryCodeSelector';
import { Controller, useForm } from 'react-hook-form';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { selectCountries, getCountries } from 'app/store/countriesSlice';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfile, updateProfile } from 'app/store/userProfileSlice';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import _ from '@lodash';
import * as yup from 'yup';

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
  firstName: yup.string().required('Please enter your first name.').max(50, 'First name should not be greater than 50 characters.'),
  lastName: yup.string().required('Please enter your last name.').max(50, 'Last name should not be greater than 50 characters.'),
  email: yup.string().email('Email address is not valid.').required('Please enter your email address.'),
  countryCode: yup.string(),
  mobilePhone: yup.string().required('Please enter your mobile phone.').min(10, 'Invalid mobile phone number.').max(10, 'Invalid mobile phone number.'),
  addressLine1: yup.string().max(50, 'Address line 1 should not be greater than 50 characters.'),
  addressLine2: yup.string().max(50, 'Address line 2 should not be greater than 50 characters.'),
  city: yup.string().max(50, 'City should not be greater than 50 characters.'),
  state: yup.string().max(50, 'State should not be greater than 50 characters.'),
  country: yup.string(),
  zipcode: yup.string().max(10, 'Zipcode should not be greater than 50 characters.')
});

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('Translation');
  const [isLoading, setLoading] = useState(false);
  const profile = useSelector(userProfile);
  const countries = useSelector(selectCountries);
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    /**
     * Reset the form on profile state changes
     */
    reset(profile);
  }, [profile, reset]);

  /**
   * Form Submit
   */
  function onSubmit(data) {
    setLoading(true);
    let countryCode = _.filter(countries, { iso: data.countryCode }).map(v => v.code);
    let inputJson = {
      _id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      mobilePhone: countryCode[0] + data.mobilePhone,
      address: {
        line1: data.addressLine1 ? data.addressLine1 : '',
        line2: data.addressLine2 ? data.addressLine2 : '',
        city: data.city ? data.city : '',
        state: data.state ? data.state : '',
        zipcode: data.zipcode ? data.zipcode : '',
        country: data.country ? data.country : ''
      }
    }
    dispatch(updateProfile(inputJson)).then(() => {
      setLoading(false);
      navigate('/profile');
    });
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  if ((!countries && !profile) || isLoading) {
    return <FuseLoading />;
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
           {t('EDIT_PROFILE')}
          </Typography>
          <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
            <BackButton/>
          </div>
        </div>
      }
      content={
        <div className="p-24">
          <Card className="w-full mb-32 p-24" variants={item}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="firstName"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('FIRST_NAME')}
                      placeholder={t('FIRST_NAME')}
                      error={!!errors.firstName}
                      helperText={errors?.firstName?.message}
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
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('LAST_NAME')}
                      placeholder={t('LAST_NAME')}
                      error={!!errors.lastName}
                      helperText={errors?.lastName?.message}
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
                  name="email"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('Email')}
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                      disabled
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="mobilePhone"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-10"
                      label={t('MOBILE_PHONE')}
                      placeholder="9876543210"
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
                  control={control}
                  defaultValue=""
                  name="addressLine1"
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('ADDRESS_LINE')+ ('1')}
                      placeholder={t('ADDRESS_LINE')+ ('1')}
                      error={!!errors.addressLine1}
                      helperText={errors?.addressLine1?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="addressLine2"
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('ADDRESS_LINE')+ ('2')}
                      placeholder={t('ADDRESS_LINE')+ ('2')}
                      error={!!errors.addressLine2}
                      helperText={errors?.addressLine2?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="city"
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('CITY')}
                      placeholder={t('CITY')}
                      error={!!errors.city}
                      helperText={errors?.city?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="state"
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('STATE')}
                      placeholder={t('STATE')}
                      error={!!errors.state}
                      helperText={errors?.state?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="zipcode"
                  render={({ field }) => (
                    <TextField
                      className="mb-10"
                      {...field}
                      label={t('ZIPCODE')}
                      placeholder={t('ZIPCODE')}
                      error={!!errors.zipcode}
                      helperText={errors?.zipcode?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="country"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-10"
                      select
                      label= {t('COUNTRY')}
                      variant="outlined"
                      fullWidth
                      error={!!errors.country}
                      helperText={errors?.country?.message}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.name} value={option.iso}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
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
                  {t('UPDATE')}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </div>
      }
      scroll="content"
    />
  );
};

export default EditProfile; 
