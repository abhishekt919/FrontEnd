import { memo } from 'react';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';

function RightSideLayout(props) {
  return (
    <NotificationPanel />
  );
}

export default memo(RightSideLayout);
