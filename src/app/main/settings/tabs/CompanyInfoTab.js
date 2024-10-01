import { Button, Checkbox, Grid, InputAdornment, FormControl, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CountryCodeSelector from 'app/theme-layouts/shared-components/countries/CountryCodeSelector';
import { selectCountries, getCountries } from 'app/store/countriesSlice';
import { selectCompany, updateCompany } from 'app/store/companySlice';
import { userSession } from 'app/store/userSlice';
import { LoadingView } from 'app/shared-components/index';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Company name is required.')
    .min(5, 'Company name must be at least 5 characters.')
    .max(100, 'Company name should not be greater than 100 characters.'),
  email: yup.string().email('Company email address is not valid.').required('Please enter company email address.'),
  dotNumber: yup
    .string()
    .max(100, 'Company DOT should not be greater than 100 characters.'),
  currency: yup.string().required('Currency is required.'),
  countryCode: yup.string(),
  phone: yup.string().required('Please enter billing phone.').min(10, 'Invalid billing phone number.').max(10, 'Invalid billing phone number.'),
  addressLine1: yup.string().required('Required.').max(50, 'Address line 1 should not be greater than 50 characters.'),
  addressLine2: yup.string().max(50, 'Address line 2 should not be greater than 50 characters.'),
  city: yup.string().required('Required.').max(50, 'City should not be greater than 50 characters.'),
  state: yup.string().required('Required.').max(50, 'State should not be greater than 50 characters.'),
  country: yup.string().required('Required.'),
  zipcode: yup.string().required('Required.').max(10, 'Zipcode should not be greater than 50 characters.'),
  shippingAddressLine1: yup.string().required('Required.').max(50, 'Address line 1 should not be greater than 50 characters.'),
  shippingAddressLine2: yup.string().max(50, 'Address line 2 should not be greater than 50 characters.'),
  shippingCity: yup.string().required('Required.').max(50, 'City should not be greater than 50 characters.'),
  shippingState: yup.string().required('Required.').max(50, 'State should not be greater than 50 characters.'),
  shippingCountry: yup.string().required('Required.'),
  shippingZipcode: yup.string().required('Required.').max(10, 'Zipcode should not be greater than 50 characters.')
});

const currencyUnits = [{
  name: 'United States Dollar',
  value: 'USD'
}];

function CompanyInfoTab(props) {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const company = useSelector(selectCompany);
  const { t } = useTranslation('Translation');
  const [formEdit, setFormEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const countries = useSelector(selectCountries);
  const { control, handleSubmit, formState, reset, setValue, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    dispatch(getCountries());
    if (!Cookies.get("_SuperMyMachineOnline")) {
      if (!hasModuleAccess(USER_PERMISSIONS_CODES.SETTINGS, ACCESS_PERMISSIONS.CREATE) && !hasModuleAccess(USER_PERMISSIONS_CODES.SETTINGS, ACCESS_PERMISSIONS.UPDATE)) {
        setCanEdit(false);
      } else {
        setCanEdit(true);
      }
    } else {
      setCanEdit(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!company) {
      return;
    }
    /**
     * Reset the form on company state changes
     */

    if (company.sameAsBillingAddress) {
      setChecked(true);
    }
    reset(company);
  }, [company, reset]);

  const onSameAsBillingAddress = (event) => {
    if (event.target.checked) {
      setChecked(true);
      setValue("shippingAddressLine1", getValues("addressLine1"));
      setValue("shippingAddressLine2", getValues("addressLine2"));
      setValue("shippingCity", getValues("city"));
      setValue("shippingState", getValues("state"));
      setValue("shippingCountry", getValues("country"));
      setValue("shippingZipcode", getValues("zipcode"), { shouldDirty: true, shouldTouch: true });
    } else {
      setChecked(false);
      setValue("shippingAddressLine1", "");
      setValue("shippingAddressLine2", "");
      setValue("shippingCity", "");
      setValue("shippingState", "");
      setValue("shippingCountry", "");
      setValue("shippingZipcode", "");
    }
  }
  /**
 * Form Submit
 */
  function onSubmit(data) {
    setLoading(true);
    let country = countries.find((country) => country.iso === data.countryCode);
    let inputJson = {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      countryCode: country.iso,
      currency: data.currency,
      dotNumber: data.dotNumber,
      sameAsBillingAddress: checked,
      billingAddress: {
        line1: data.addressLine1 ? data.addressLine1 : '',
        line2: data.addressLine2 ? data.addressLine2 : '',
        city: data.city ? data.city : '',
        state: data.state ? data.state : '',
        zipcode: data.zipcode ? data.zipcode : '',
        country: data.country ? data.country : ''
      },
      shippingAddress: {
        line1: data.shippingAddressLine1 ? data.shippingAddressLine1 : '',
        line2: data.shippingAddressLine2 ? data.shippingAddressLine2 : '',
        city: data.shippingCity ? data.shippingCity : '',
        state: data.shippingState ? data.shippingState : '',
        zipcode: data.shippingZipcode ? data.shippingZipcode : '',
        country: data.shippingCountry ? data.shippingCountry : ''
      },
      customerId: data.customerId ? data.customerId : null,
      stripeCustomerObj: {
        name: data.name,
        email: data.email,
        address: {
          city: data.city ? data.city : '',
          country: data.country ? data.country : '',
          line1: data.addressLine1 ? data.addressLine1 : '',
          line2: data.addressLine2 ? data.addressLine2 : '',
          state: data.state ? data.state : '',
          postal_code: data.zipcode ? data.zipcode : '',
        }
      }
    }
    dispatch(updateCompany(inputJson)).then(() => {
      setLoading(false);
    });
  }

  if ((!countries && !company) || isLoading) {
    return <LoadingView />;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} className="flex justify-end">
          {canEdit && !formEdit && (
            <Button
              onClick={() => setFormEdit(true)}
              variant="outlined"
              color="secondary"
              size="small"
              className="ml-10"
              startIcon={<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>}
            >
              {t("EDIT")}
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-10"
                error={!!errors.name}
                required
                helperText={errors?.name?.message}
                label={t('COMPANY_NAME')}
                placeholder={t('COMPANY_NAME')}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                label={t("COMPANY_EMAIL")}
                placeholder={t("COMPANY_EMAIL")}
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dotNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-10"
                id="dotNumber"
                label={t('DOT_NUMBER')}
                placeholder={t('DOT_NUMBER')}
                type="text"
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="currency"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-10"
                select
                label={t('CURRENCY')}
                variant="outlined"
                fullWidth
                error={!!errors.currency}
                helperText={errors?.currency?.message}
                required
                disabled={!formEdit}
              >
                {currencyUnits.map((option) => (
                  <MenuItem key={option.name} value={option.value}>
                    {option.value} ({option.name})
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label={t('COMPANY_PHONE')}
                placeholder={t('COMPANY_PHONE')}
                variant="outlined"
                type="number"
                fullWidth
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                required
                disabled={!formEdit}
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
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Typography className="text-14 truncate font-semibold border-b-2 border-dashed pb-10">
          {t('BILLING_ADDRESS')}
        </Typography>
      </Grid>
      <Grid container spacing={2} className="mt-20">
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="addressLine1"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('ADDRESS_LINE') + ('1')}
                placeholder={t('ADDRESS_LINE') + ('1')}
                required
                error={!!errors.addressLine1}
                helperText={errors?.addressLine1?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                label={t('ADDRESS_LINE') + ('2')}
                placeholder={t('ADDRESS_LINE') + ('2')}
                error={!!errors.addressLine2}
                helperText={errors?.addressLine2?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                required
                error={!!errors.city}
                helperText={errors?.city?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                required
                error={!!errors.state}
                helperText={errors?.state?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                label={t("ZIPCODE")}
                placeholder={t("ZIPCODE")}
                required
                error={!!errors.zipcode}
                helperText={errors?.zipcode?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
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
                label={t('COUNTRY')}
                variant="outlined"
                fullWidth
                required
                error={!!errors.country}
                helperText={errors?.country?.message}
                disabled={!formEdit}
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
      <Grid item xs={12} className="mt-20 border-b-2 border-dashed pb-10 flex items-center">
        <Typography className="text-14 truncate font-semibold mr-20">

          {t('SHIPPING_ADDRESS')}
        </Typography>
        <FormControlLabel control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={onSameAsBillingAddress}
            disabled={!formEdit}
          />
        }
          label={t('SAME_AS_BILLING_ADDRESS')}
        />
      </Grid>
      <Grid container spacing={2} className="mt-20">
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingAddressLine1"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('ADDRESS_LINE') + ('1')}
                placeholder={t('ADDRESS_LINE') + ('1')}
                required
                error={!!errors.shippingAddressLine1}
                helperText={errors?.shippingAddressLine1?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingAddressLine2"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('ADDRESS_LINE') + ('2')}
                placeholder={t('ADDRESS_LINE') + ('2')}
                error={!!errors.shippingAddressLine2}
                helperText={errors?.shippingAddressLine2?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingCity"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('CITY')}
                placeholder={t('CITY')}
                required
                error={!!errors.shippingCity}
                helperText={errors?.shippingCity?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingState"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('STATE')}
                placeholder={t('STATE')}
                required
                error={!!errors.shippingState}
                helperText={errors?.shippingState?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingZipcode"
            render={({ field }) => (
              <TextField
                className="mb-10"
                {...field}
                label={t('ZIPCODE')}
                placeholder={t('ZIPCODE')}
                required
                error={!!errors.shippingZipcode}
                helperText={errors?.shippingZipcode?.message}
                variant="outlined"
                fullWidth
                disabled={!formEdit}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="shippingCountry"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-10"
                select
                label={t('COUNTRY')}
                variant="outlined"
                fullWidth
                required
                error={!!errors.shippingCountry}
                helperText={errors?.shippingCountry?.message}
                disabled={!formEdit}
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
      {canEdit && formEdit && (
        <Grid container spacing={2} className="mt-10">
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmit(onSubmit)}
            >
              {t('UPDATE')}
            </Button>
            <Button
              onClick={() => setFormEdit(false)}
              variant="contained"
              color="error"
              className="ml-10"
            >
              {t("CANCEL")}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default CompanyInfoTab;
