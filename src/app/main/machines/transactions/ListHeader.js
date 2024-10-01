import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

function ListHeader(props) {
  const { t } = useTranslation('Translation');
  const theme = useTheme();
  const onPrintRecord = () => {
    window.print();
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
              {t('TRANSACTIONS')} - {props?.machine?.programSerialNumber}
            </Typography>
            <Typography
              component={Link}
              role="link"
              to={`/machines/stats/${props.machineId}`}
              color="inherit"
            >
              <span className="flex font-medium">{t('GO_TO_STATS')}</span>
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {hasModuleAccess(USER_PERMISSIONS_CODES.MACHINES, ACCESS_PERMISSIONS.PRINT) && (
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
      </motion.div>
    </div>
  );
}

export default ListHeader;
