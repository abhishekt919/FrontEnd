import { IconButton, SwipeableDrawer, Typography } from '@mui/material';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NotificationCard from './NotificationCard';
import { userSession } from 'app/store/userSlice';
import {
  deleteAll,
  deleteNotification,
  getNotifications,
  selectNotifications
} from './store/dataSlice';
import reducer from './store';
import {
  closeNotificationPanel,
  selectNotificationPanelState,
  toggleNotificationPanel,
} from './store/stateSlice';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.default,
    width: 320,
  },
}));

function NotificationPanel() {
  const { t } = useTranslation('Translation');
  const location = useLocation();
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const state = useSelector(selectNotificationPanelState);
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    if (signInUser?.company) {
      let inputJson = {
        companyId: signInUser.company
      }
      // dispatch(getNotifications(inputJson));
    }
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      // dispatch(closeNotificationPanel());
    }
  }, [location, dispatch]);

  function handleClose() {
    dispatch(closeNotificationPanel());
  }

  function handleDelete(id) {
    // dispatch(deleteNotification(id));
  }

  function handleDeleteAll() {
    let inputJson = {
      companyId: signInUser.company
    }
    // dispatch(deleteAll(inputJson));
  }

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => { }}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      <IconButton className="m-4 absolute top-0 right-0 z-999" onClick={handleClose} size="medium">
        <FuseSvgIcon color="action">heroicons-outline:x</FuseSvgIcon>
      </IconButton>
      {notifications.length > 0 ? (
        <FuseScrollbars>
          <div className="flex flex-col">
            <div className="flex justify-between items-end pt-32 mb-36 p-16">
              <Typography className="text-24 font-semibold leading-none">Notifications</Typography>
              <Typography
                className="text-12 underline cursor-pointer"
                color="secondary"
                onClick={handleDeleteAll}
              >
                delete all
              </Typography>
            </div>
            {notifications.map((item) => (
              <NotificationCard
                key={item._id}
                item={item}
                onClose={handleDelete}
              />
            ))}
          </div>
        </FuseScrollbars>
      ) : (
        <div className="flex flex-1 items-center justify-center p-16">
          <Typography className="text-24 text-center" color="text.secondary">
            {t('NO_RECORD')}
          </Typography>
        </div>
      )}
    </StyledSwipeableDrawer>
  );
}

export default withReducer('notificationPanel', reducer)(memo(NotificationPanel));
