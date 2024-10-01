import { memo } from 'react';
import { Button, Paper, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function UsersWidget(props) {
  const { t } = useTranslation('Translation');
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10">
      <div className="text-center mt-8">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500">
          {props.usersCount}
        </Typography>
      </div>
      <div className="flex flex-col flex-auto items-center justify-between px-8 pt-12">
        <Tooltip
          title={t('CLICK_TO_VIEW')}
          enterDelay={300}
          placement="bottom"
          arrow
        >
          <Button
            component={Link}
            to="/users"
            variant="text"
            color="secondary"
            startIcon={<FuseSvgIcon>material-outline:person</FuseSvgIcon>}
          >
            {t('USERS')}
          </Button>
        </Tooltip>
      </div>
    </Paper>
  );
}

export default memo(UsersWidget);
