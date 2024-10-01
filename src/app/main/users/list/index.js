import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NoAccessPage } from 'app/shared-components/index';
import reducer from '../store';
import ListHeader from './ListHeader';
import TableListing from './TableListing';
import Cookies from 'js-cookie';
import { userSession } from 'app/store/userSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

function UsersList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const [hasPageAccess, setHasPageAccess] = useState(null);

  useEffect(() => {
    if (Cookies.get("_SuperMyMachineOnline")) {
      setHasPageAccess(true);
    } else {
      if (signInUser) {
        const hasPermission = hasModuleAccess(
          USER_PERMISSIONS_CODES.USERS,
          ACCESS_PERMISSIONS.VIEW
        )
        setHasPageAccess(hasPermission);
      }
    }
  }, [dispatch]);

  /**
 * Show Message if the page has not access
 */
  if (!hasPageAccess) return <NoAccessPage />;

  return (
    <FusePageCarded
      header={<ListHeader />}
      content={<TableListing />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('userStore', reducer)(UsersList);
