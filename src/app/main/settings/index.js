import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import { Tab, Tabs, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NoRecordsView } from "app/shared-components/index";
import CompanyInfoTab from './tabs/CompanyInfoTab';
import PaymentTab from './tabs/PaymentTab';
import { userSession } from 'app/store/userSlice';
import { getCompany } from 'app/store/companySlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

function SettingsPage() {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { state } = useLocation();
  const { t } = useTranslation('Translation');
  const [tabValue, setTabValue] = useState(state?.selectedTabValue ? state.selectedTabValue : 0);
  const [isLoading, setLoading] = useState(false);
  const [settingsView, setSettingsView] = useState(true);
  const [paymentView, setPaymentView] = useState(true);
  const [hasPageAccess, setHasPageAccess] = useState(null);

  useEffect(() => {
    dispatch(getCompany(signInUser.company));
    if (!Cookies.get("_SuperMyMachineOnline")) {
      const hasSettingsPermission = hasModuleAccess(
        USER_PERMISSIONS_CODES.SETTINGS,
        ACCESS_PERMISSIONS.VIEW
      )
      setSettingsView(hasSettingsPermission);
      const hasPermission = hasModuleAccess(
        USER_PERMISSIONS_CODES.PAYMENT,
        ACCESS_PERMISSIONS.VIEW
      )
      setPaymentView(hasPermission);
    }
  }, [dispatch]);
  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-24 md:text-24 font-bold tracking-tight"
          >
            {t('SETTINGS')}
          </Typography>
        </div>
      }
      content={settingsView && paymentView ?
        <NoRecordsView message={t('NO_ACCESS')} />
        :
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64 border-b-1' }}>

            {settingsView && (<Tab className="h-64" label={t('COMPANY_DETAILS')} />)}
            {paymentView && (<Tab className="h-64" label={t('PAYMENT_DETAILS')} />)}
          </Tabs>
          <div className="p-16 sm:p-24">
            {(tabValue === 0 && settingsView) && (<CompanyInfoTab />)}
            {((tabValue === 1 && paymentView) || !settingsView) && (<PaymentTab />)}
          </div>
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default SettingsPage;
