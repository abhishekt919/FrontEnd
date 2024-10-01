import { Badge, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import reducer from './store';
import { userSession } from 'app/store/userSlice';
import { selectNotifications, markAsReadAll } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';

function NotificationPanelToggleButton(props) {
  const notifications = useSelector(selectNotifications);
  const signInUser = useSelector(userSession);
  const dispatch = useDispatch();
  const [notifBadge, setNotifBadge] = useState(true);

  useEffect(() => {
    if (notifications.length > 0) {
      let filterData = notifications.filter(function (el) {
        return !el.isRead;
      });
      if (filterData.length > 0) {
        setNotifBadge(false)
      }
    }
  }, [notifications]);

  const onToggleNotificationPanel = () => {
    dispatch(toggleNotificationPanel());
    if (notifications.length > 0) {
      let filterData = notifications.filter(function (el) {
        return !el.isRead;
      });
      if (filterData && filterData.length > 0) {
        let notifIds = [];
        for(let i = 0; i < notifications.length; i++){
          if(!notifications[i].isRead){
            notifIds.push(notifications[i]._id);
          }
        }
        let inputJson = {
          companyId: signInUser.company,
          notifIds: notifIds
        }
        dispatch(markAsReadAll(inputJson));
      }
    };
  }

  return (
    <IconButton
      className="w-40 h-40"
      onClick={onToggleNotificationPanel}
      size="large"
    >
      <Badge color="secondary" variant="dot" invisible={notifBadge}>
        {props.children}
      </Badge>
    </IconButton >
  );
}

NotificationPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>,
};

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
