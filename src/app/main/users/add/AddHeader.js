import { Button, DialogActions, DialogTitle, DialogContent, DialogContentText, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { deleteUser, updateUser } from '../store/userSlice';
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES,
} from "app/configs/constants";
import { hasModuleAccess } from "src/app/utils/helperFunctions";

function AddHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { t } = useTranslation('Translation');
  const { watch } = methods;
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const theme = useTheme();
  const navigate = useNavigate();

  function handleDeleteRecord() {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{t('DELETE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('DELETE_MESSAGE')} {firstName} {lastName} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteUser()).then((result) => {
                  if (result.payload.messageId === 200) {
                    dispatch(showMessage({ message: result.payload.message }));
                  } else {
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                  navigate('/users');
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
              {t('RESTORE_MESSAGE')} {firstName} {lastName} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onCLick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                let inputJson = {
                  _id: props.userData._id,
                  isDeleted: false,
                  isActive: true
                }
                dispatch(updateUser(inputJson)).then((result) => {
                  if (result.payload.messageId === 200) {
                    dispatch(showMessage({ message: result.payload.message }));
                  } else {
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                  navigate('/users');
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
            to="/users"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">{t('USERS')}</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {props.editId !== 'new' ? firstName + ' ' + lastName : t("NEW_USER")}
            </Typography>
            <Typography variant="caption">
              {t('USER_DETAILS')}
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
            {hasModuleAccess(USER_PERMISSIONS_CODES.USERS, ACCESS_PERMISSIONS.DELETE) && (
              <>
                {props.editId !== 'new' && (props.userData && !props.userData.isAccountOwner) && (props.userData && !props.userData.isDeleted) && (
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
                {(props.userData && props.userData.isDeleted) && (
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
          </>
        )}
      </motion.div>
    </div>
  );
}

export default AddHeader;
