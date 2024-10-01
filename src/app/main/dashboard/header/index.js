import { Avatar, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { userProfile } from 'app/store/userProfileSlice';

function DashboardHeader() {
  const { t } = useTranslation('Translation');
  const profile = useSelector(userProfile);

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <Avatar className="flex-0 w-64 h-64" alt="user photo" src={profile?.profilePic}>
            {profile?.firstName[0]}
          </Avatar>
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              {t('WELCOME')}{`, ${profile?.firstName || ''}!`}
            </Typography>

            {/* <div className="flex items-center">
              <FuseSvgIcon size={20} color="action">
                heroicons-solid:bell
              </FuseSvgIcon>
              <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                You have 0 new notifications
              </Typography>
            </div> */}
          </div>
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
