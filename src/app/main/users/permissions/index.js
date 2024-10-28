import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import withReducer from 'app/store/withReducer';
import {
  LoadingView,
  NoAccessPage,
  NoRecordsView,
} from "app/shared-components/index";
import reducer from '../store';
import ListHeader from "./ListHeader";
import TableListing from "./TableListing";
import { getUserPermissionsByUserId, selectUser } from "../store/userSlice";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES,
} from "app/configs/constants";
import { hasModuleAccess } from "src/app/utils/helperFunctions";


function UserPermissions() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const user = useSelector(selectUser);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [noRecord, setNoRecord] = useState(false);
  const [hasPageAccess, setHasPageAccess] = useState(null);

  // useEffect(() => {
  //   if (!Cookies.get("_SuperMyMachineOnline")) {
  //     const updateAccess = hasModuleAccess(
  //       USER_PERMISSIONS_CODES.USERS,
  //       ACCESS_PERMISSIONS.UPDATE
  //     );
  //     setHasPageAccess(updateAccess);
  //   } else  {
  //     setHasPageAccess(true);
  //   }
  // }, []);

  useDeepCompareEffect(() => {
    function updatePageState() {
      const { id } = routeParams;
      /**
       * Get data
       */
      dispatch(getUserPermissionsByUserId(id)).then((action) => {
        /**
         * If the requested record does not exist show message
         */
        if (!action.payload) {
          setNoRecord(true);
        }
      });
    }

    if (hasPageAccess) updatePageState();
  }, [dispatch, routeParams, hasPageAccess]);

  /**
   * Show Message if the page has not access
   */
  // if (!hasPageAccess) return <NoAccessPage />;

  /**
   * Show Message if the requested Record does not exists
   */
  if (noRecord)
    return <NoRecordsView btnText="Go to Users Page" navigateTo="/users" />;

  /**
   * Wait while data is loading
   */
  if (user && routeParams.id !== user._id) return <LoadingView />;

  return (
    <FusePageCarded
      header={<ListHeader userData={user} />}
      content={<TableListing />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('userStore', reducer)(UserPermissions);
