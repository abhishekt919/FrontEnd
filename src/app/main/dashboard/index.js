import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { LoadingView } from 'app/shared-components/index';
import DashboardHeader from './header';
import MachineWidget from './widgets/MachineWidget';
import UsersWidget from './widgets/UsersWidget';
import { userSession } from 'app/store/userSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "../../configs/constants";
import { getUsersCount, selectUsersCount, getMachinesCount, selectMachinesCount } from './store/dashboardSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function DashboardPage() {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const usersCount = useSelector(selectUsersCount);
  const machinesCount = useSelector(selectMachinesCount);
  const [isLoading, setLoading] = useState(false);
  const [hasUserAccess, setUserAccess] = useState(null);
  const [hasMachineAccess, setMachineAccess] = useState(null);

  // useEffect(() => {
  //   if (Cookies.get("_SuperMyMachineOnline")) {
  //     setUserAccess(true);
  //     setMachineAccess(true);
  //   } else {
  //     if (signInUser) {
  //       setLoading(true);
  //       const hasPermission = hasModuleAccess(
  //         USER_PERMISSIONS_CODES.USERS,
  //         ACCESS_PERMISSIONS.VIEW
  //       )
  //       setUserAccess(hasPermission);
  //       const hasMachinePermission = hasModuleAccess(
  //         USER_PERMISSIONS_CODES.MACHINES,
  //         ACCESS_PERMISSIONS.VIEW
  //       )
  //       setMachineAccess(hasMachinePermission);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getUsersCount(signInUser.company)).then((result) => {
      dispatch(getMachinesCount(signInUser.company)).then((result) => {
        setLoading(false);
      });
    });
  }, [dispatch]);

  return (
    <Root
      header={<DashboardHeader />}
      content={
        isLoading ? (<LoadingView />) :
          (<motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <MachineWidget machineCount={machinesCount} />
            </motion.div>
            <motion.div variants={item}>
              <UsersWidget usersCount={usersCount} />
            </motion.div>
          </motion.div>)
      }
      scroll="page"
    />
  );
}

export default withReducer('dashboardApp', reducer)(DashboardPage);
