import { Button, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

function ListHeader(props) {
  const { t } = useTranslation('Translation');

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
        {t('MACHINES')}
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8 no-print">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {Cookies.get("_SuperMyMachineOnline") ?
            <>
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
                to="/machines/new"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                {t('NEW')}
              </Button>
            </>
            :
            <>
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
              {hasModuleAccess(USER_PERMISSIONS_CODES.MACHINES, ACCESS_PERMISSIONS.CREATE) && (
                <Button
                  component={Link}
                  to="/machines/new"
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
