import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import Cookies from 'js-cookie';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";
import { LoadingView, NoAccessPage } from 'app/shared-components/index';
import reducer from '../store';
import ListHeader from './ListHeader';
import ListingPage from './ListingPage';
import { userSession } from 'app/store/userSlice';
import { getMachineById, selectMachine } from '../store/machineSlice';

function StatisticsPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const routeParams = useParams();

  const signInUser = useSelector(userSession);
  const machine = useSelector(selectMachine);
  const [isLoading, setLoading] = useState(false);
  const [machineId, setMachineId] = useState(null);
  const [hasPageAccess, setHasPageAccess] = useState(null);

  useEffect(() => {
    if (Cookies.get("_SuperMyMachineOnline")) {
      setHasPageAccess(true);
    } else {
      if (signInUser) {
        const hasPermission = hasModuleAccess(
          USER_PERMISSIONS_CODES.MACHINES,
          ACCESS_PERMISSIONS.VIEW
        )
        setHasPageAccess(hasPermission);
      }
    }
  }, [dispatch]);

  useDeepCompareEffect(() => {
    function updatePageState() {
      const { id } = routeParams;
      setMachineId(id);
      dispatch(getMachineById(id));
    }

    updatePageState();
  }, [dispatch, routeParams]);

  if (isLoading || !machine) {
    return (
      <LoadingView />
    )
  }


  /**
 * Show Message if the page has not access
 */
  if (!hasPageAccess) return <NoAccessPage />;

  return (
    <FusePageCarded
      header={<ListHeader machine={machine} machineId={machineId} />}
      content={<ListingPage machine={machine} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('machineModule', reducer)(StatisticsPage);
