import { Button, Input, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { userSession } from 'app/store/userSlice';
import { selectSearchText, setSearchText } from '../store/usersSlice';
import { downloadUsers } from '../store/userSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "../../../configs/constants";

function ListHeader(props) {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const searchText = useSelector(selectSearchText);
  const { t } = useTranslation('Translation');

  const onDownloadRecord = () => {
    dispatch(downloadUsers(signInUser.company)).then((result) => {
      if (result.payload.messageId === 200) {
        window.open(result.payload.data);
      }
    });
  }

  const onPrintRecord = () => {
    window.print();
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-24 font-bold tracking-tight"
      >
        {t('USERS')}
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8 no-print">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder={t('SEARCH')}
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setSearchText(ev))}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {Cookies.get("_SuperMyMachineOnline") ?
            <>
              <Button
                onClick={onDownloadRecord}
                variant="contained"
                color="primary"
                className="mr-10"
                startIcon={<FuseSvgIcon>heroicons-outline:document-download</FuseSvgIcon>}
              >
                {t('DOWNLOAD')}
              </Button>
              <Button
                onClick={onPrintRecord}
                variant="contained"
                color="success"
                className="mr-10"
                startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}
              >
                {t('PRINT')}
              </Button>
              <Button
                component={Link}
                to="/users/new"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                {t('NEW')}
              </Button>
            </>
            :
            <>
              {hasModuleAccess( USER_PERMISSIONS_CODES.USERS, ACCESS_PERMISSIONS.DOWNLOAD) && (
                <Button
                  onClick={onDownloadRecord}
                  variant="contained"
                  color="primary"
                  className="mr-10"
                  startIcon={<FuseSvgIcon>heroicons-outline:document-download</FuseSvgIcon>}
                >
                  {t('DOWNLOAD')}
                </Button>
              )}
              {hasModuleAccess( USER_PERMISSIONS_CODES.USERS, ACCESS_PERMISSIONS.PRINT) && (
                <Button
                  onClick={onPrintRecord}
                  variant="contained"
                  color="success"
                  className="mr-10"
                  startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}
                >
                  {t('PRINT')}
                </Button>
              )}
              {hasModuleAccess( USER_PERMISSIONS_CODES.USERS, ACCESS_PERMISSIONS.CREATE) && (
                <Button
                  component={Link}
                  to="/users/new"
                  variant="contained"
                  color="secondary"
                  startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                >
                  {t('NEW')}
                </Button>
              )}
            </>
          }
        </motion.div>
      </div>
    </div>
  );
}

export default ListHeader;
