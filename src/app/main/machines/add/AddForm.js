import { Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userSession } from 'app/store/userSlice';
import { getAffiliateMachineTypes, selectCompanyMachineTypes } from 'app/store/shared/machineTypesSlice';
import CountryCodeSelector from 'app/theme-layouts/shared-components/countries/CountryCodeSelector';
import { selectCountries, getCountries } from 'app/store/countriesSlice';

function AddForm() {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { t } = useTranslation('Translation');
  const signInUser = useSelector(userSession);
  const countries = useSelector(selectCountries);
  const machineTypes = useSelector(selectCompanyMachineTypes);
  const { control, formState, getValues } = methods;
  const { errors } = formState;
  const formValues = getValues();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAffiliateMachineTypes(signInUser?.company));
  }, [dispatch]);

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-14 truncate font-semibold border-b-2 border-dashed pb-10">
          {t('MACHINE_INFO')}
        </Typography>
      </Grid>
      <Grid container spacing={2} className="mt-10">
        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            defaultValue=""
            name="machineType"
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={t('MACHINE_TYPE')}
                variant="outlined"
                className="mb-16"
                fullWidth
                error={!!errors.machineType}
                helperText={errors?.machineType?.message}
                required
              >
                {machineTypes.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="programSerialNumber"
            defaultvalue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                error={!!errors.programSerialNumber}
                required
                helperText={errors.programSerialNumber?.message}
                label={t('KIOSK_ID_NUMBER')}
                id="programSerialNumber"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="cabinetSerialNumber"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                error={!!errors.cabinetSerialNumber}
                helperText={errors.cabnietSerialnumber?.message}
                label={t('CABINET_SERIAL_NUMBER')}
                id="cabinetSerialNumber"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Controller
            control={control}
            name="sentry"
            defaultValue={formValues.sentry}
            render={({ field }) => (
              <FormControlLabel
                label={t("SENTRY")}
                control={<Checkbox size="small" {...field} checked={formValues.sentry} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Controller
            control={control}
            name="atm"
            defaultValue={formValues.atm}
            render={({ field }) => (
              <FormControlLabel
                label={t("ATM")}
                control={<Checkbox size="small" {...field} checked={formValues.atm} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Controller
            control={control}
            name="tito"
            defaultValue={formValues.tito}
            render={({ field }) => (
              <FormControlLabel
                label={t("TITO")}
                control={<Checkbox size="small" {...field} checked={formValues.tito} />}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className="mt-20">
        <Typography className="text-14 truncate font-semibold border-b-2 border-dashed pb-10">
          {t('LOCATION_DETAILS')}
        </Typography>
      </Grid>
      <Grid container spacing={2} className="mt-10">
        <Grid item xs={12} sm={3}>
          <Controller
            name="locationName"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                error={!!errors.loactionName}
                helperText={errors?.locationName?.message}
                label={t('LOCATION_NAME')}
                id="locationName"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
                error={!!errors.addressLine1}
                helperText={errors?.addressLine1?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
                error={!!errors.zipcode}
                helperText={errors?.zipcode?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} className="mt-20">
        <Typography className="text-14 truncate font-semibold border-b-2 border-dashed pb-10">
          {t('LOCATION_MANAGER')}
        </Typography>
      </Grid>
      <Grid container spacing={2} className="mt-10">
        <Grid item xs={12} sm={3}>
          <Controller
            name="managerName"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                error={!!errors.manageName}
                helperText={errors.manageName?.message}
                label={t('NAME')}
                id="manageName"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                id="email"
                label={t('EMAIL')}
                type="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            control={control}
            defaultValue=""
            name="mobilePhone"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label={t('MOBILE_PHONE')}
                placeholder={t('MOBILE_PHONE')}
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
                      defaultValue="US"
                      render={({ field: _field }) => (
                        <InputAdornment position="start">
                          <CountryCodeSelector {..._field} disabled={false} />
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
    </div>
  );
}
export default AddForm;