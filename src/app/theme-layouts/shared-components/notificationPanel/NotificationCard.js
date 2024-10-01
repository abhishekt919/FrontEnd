import { Card, IconButton, Typography } from '@mui/material';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function NotificationCard(props) {
  const { item, className } = props;

  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (props.onClose) {
      props.onClose(item._id);
    }
  };

  return (
    <Card
      className={clsx(
        'flex items-center relative w-full p-10 min-h-64 rounded-none mb-5',
        className
      )}
      elevation={0}
      component={item.useRouter ? NavLinkAdapter : 'div'}
      to={item.data?.link || ''}
      role={item.data?.link && 'button'}
    >

      <div className="flex flex-col flex-auto">
        {item.data.title && <Typography className="font-semibold line-clamp-1">{item.data.title}</Typography>}

        {item.data.message && (
          <div className="line-clamp-2">{item.data.message}</div>
        )}

        {item.createdAt && (
          <Typography className="mt-8 text-sm leading-none " color="text.secondary">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </Typography>
        )}
      </div>

      <IconButton
        disableRipple
        className="top-0 right-5 absolute p-8"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <FuseSvgIcon size={14} className="opacity-75" color="inherit">
          heroicons-solid:x
        </FuseSvgIcon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;
