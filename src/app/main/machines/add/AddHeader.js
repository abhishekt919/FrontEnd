import { Button, DialogActions, DialogTitle, DialogContent, DialogContentText, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import _ from '@lodash';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { userSession } from 'app/store/userSlice';
import { selectCountries } from 'app/store/countriesSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { createMachine, deleteMachine, updateMachine } from '../store/machineSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

function AddHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const signInUser = useSelector(userSession);
  const countries = useSelector(selectCountries);
  const { t } = useTranslation('Translation');
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const programSerialNumber = watch('programSerialNumber');
  const theme = useTheme();
  const navigate = useNavigate();

  function handleCreateRecord() {
    let inputJson = getValues();
    if (inputJson.mobilePhone) {
      let countryData = _.filter(countries, { iso: inputJson.countryCode }).map(v => v);
      inputJson.mobilePhone = countryData[0].code + inputJson.mobilePhone;
    }

    let inputData = {
      company: signInUser.company,
      machineType: inputJson.machineType,
      cabinetSerialNumber: inputJson.cabinetSerialNumber,
      programSerialNumber: inputJson.programSerialNumber,
      sentry: inputJson.sentry,
      atm: inputJson.atm,
      tito: inputJson.tito,
      locationName: inputJson.locationName,
      locationAddress: {
        line1: inputJson.addressLine1 ? inputJson.addressLine1 : "",
        line2: inputJson.addressLine2 ? inputJson.addressLine2 : "",
        city: inputJson.city ? inputJson.city : "",
        state: inputJson.state ? inputJson.state : "",
        country: inputJson.country ? inputJson.country : "",
        zipcode: inputJson.zipcode ? inputJson.zipcode : ""
      },
      locationManager: {
        name: inputJson.managerName ? inputJson.managerName : "",
        email: inputJson.email ? inputJson.email : "",
        countryCode: inputJson.countryCode,
        mobilePhone: inputJson.mobilePhone ? inputJson.mobilePhone : "",
      }
    }
    if (inputJson._id) {
      inputData._id = inputJson._id;
      inputData.updatedBy = signInUser._id;
      addUpdateMachine(inputData, 'UPDATE');
    } else {
      inputData.createdBy = signInUser._id;
      inputData.updatedBy = signInUser._id;
      addMachine(inputData, 'ADD');
    }
  }

  function addMachine(inputData, type) {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{t('ADD_MACHINE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Adding this machine will be billed at the rate of X per day. Do you accept? If you do not want to accept, click cancel to exit and cancel adding this machine.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('CANCEL')}
            </Button>
            <Button
              onClick={() => {
                addUpdateMachine(inputData, type);
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              {t('ACCEPT')}
            </Button>
          </DialogActions>
        </>
      ),
    }));
  }

  function addUpdateMachine(inputData, type) {
    dispatch(createMachine(inputData)).then((result) => {
      if (result.payload.messageId === 200) {
        if (type === 'UPDATE') {
          dispatch(showMessage({ message: result.payload.message }));
          navigate('/machines');
        } else {
          dispatch(openDialog({
            children: (
              <>
                <DialogTitle id="alert-dialog-title">{t('ADD_MACHINE')}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {result.payload.message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      dispatch(closeDialog());
                      navigate('/machines');
                    }}
                    color="error"
                    autoFocus
                  >
                    {t('OK')}
                  </Button>
                </DialogActions>
              </>
            ),
          }));
        }
      } else {
        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
      }
    });
  }

  function handleDeleteRecord() {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{t('DELETE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('DELETE_MESSAGE')} {programSerialNumber} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteMachine()).then((result) => {
                  if (result.payload.messageId === 200) {
                    dispatch(showMessage({ message: result.payload.message }));
                  } else {
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                  navigate('/machines');
                });
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              {t('DELETE')}
            </Button>
          </DialogActions>
        </>
      ),
    }));
  }

  function handleRestoreRecord() {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{t('RESTORE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('RESTORE_MESSAGE')} {programSerialNumber} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                let inputJson = {
                  _id: props.machineData._id
                }
                dispatch(updateMachine(inputJson)).then((result) => {
                  if (result.payload.messageId === 200) {
                    dispatch(showMessage({ message: result.payload.message }));
                  } else {
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                  navigate('/machines');
                });
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              {t('RESTORE')}
            </Button>
          </DialogActions>
        </>
      ),
    }));

  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="link"
            to="/machines"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">{t('MACHINES')}</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {props.editId !== 'new' ? programSerialNumber : t("NEW_MACHINE")}
            </Typography>
            <Typography variant="caption">
              {t('MACHINE_DETAILS')}
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {!props.previewRecord && (
          <>
            {hasModuleAccess(USER_PERMISSIONS_CODES.MACHINES, ACCESS_PERMISSIONS.DELETE) && (
              <>
                {props.editId !== 'new' && (props.machineData && !props.machineData.isDeleted) && (
                  <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="error"
                    onClick={handleDeleteRecord}
                    startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
                  >
                    {t('DELETE')}
                  </Button>
                )}
                {(props.machineData && props.machineData.isDeleted) && (
                  <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="info"
                    onClick={handleRestoreRecord}
                    startIcon={<FuseSvgIcon className="hidden sm:flex">material-outline:restore_from_trash</FuseSvgIcon>}
                  >
                    {t('RESTORE')}
                  </Button>
                )}
              </>
            )}
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleCreateRecord}
            >
              {props.editId !== 'new' ? t('UPDATE') : t('SAVE')}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default AddHeader;
