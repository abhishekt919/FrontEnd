import { Avatar, Button, Card, CardContent, Checkbox, DialogActions, DialogTitle, DialogContent, DialogContentText, FormGroup, FormControlLabel, Typography } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useState } from 'react';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from '@lodash';
import VerifyMobile from "./VerifyMobile";
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';
import BackButton from 'app/theme-layouts/shared-components/BackButton';
import { userProfile, updateProfile, sendMobileVerifyCode } from 'app/store/userProfileSlice';
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import CustomTooltip from 'app/shared-components/CustomTooltip';
import { DATE_FORMAT_DD_MMM_YYYY } from 'app/configs/constants';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

function UserProfile() {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const profile = useSelector(userProfile);
  const { t } = useTranslation('Translation');
  const [isLoading, setLoading] = useState(false);
  const [openVerifyMobileModal, setVerifyMobileModal] = useState(false);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const closeVerifyMobileModal = () => {
    setVerifyMobileModal(false);
  };

  const sendMobileVerificationCode = () => {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{t('VERIFY')} {t('MOBILE_PHONE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('SEND_MOBILE_CODE')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                let inputJson = {
                  mobilePhone: profile?.mobilePhoneNumber
                }
                setLoading(true);
                dispatch(sendMobileVerifyCode(inputJson)).then((result) => {
                  setLoading(false);
                  if (result.payload.messageId === 200) {
                    setVerifyMobileModal(true);
                  }
                });
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              {t('CONTINUE')}
            </Button>
          </DialogActions>
        </>
      ),
    }));
  }

  const handleEmailNotifChange = (event) => {
    setLoading(true);
    let inputJson = {
      _id: profile._id,
      notifications: {
        email: event.target.checked
      }
    }
    dispatch(updateProfile(inputJson)).then(() => {
      setLoading(false);
    });
  };

  const handleMobileNotifChange = (event) => {
    setLoading(true);
    let inputJson = {
      _id: profile._id,
      notifications: {
        mobile: event.target.checked
      }
    }
    dispatch(updateProfile(inputJson)).then(() => {
      setLoading(false);
    });
  };

  // Wait while data is loading and form is being set
  if (!profile || isLoading) {
    return <FuseLoading />;
  }

  return (
    <Root
      header={
        <div className="flex flex-col">
          <div className="p-24">
            <BackButton />
          </div>

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72" style={{ marginTop: '100px' }}>
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                {profile.profilePic ? (
                  <Avatar sx={{ borderColor: 'background.paper' }} className="w-128 h-128 border-4" alt="User Photo" src={profile.profilePic} />
                ) : (
                  <Avatar sx={{ borderColor: 'background.paper' }} className="w-128 h-128 border-4">{profile.firstName.charAt(0)}</Avatar>
                )}
              </motion.div>
            </div>
            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">{profile.firstName} {profile.lastName}</Typography>
              <Typography color="text.secondary">{profile.role.toUpperCase()}</Typography>
            </div>

            <div className="hidden lg:flex h-32 mx-32 border-l-2" />

            <div className="flex items-center mt-24 lg:mt-0 space-x-24">
              <div className="flex flex-col items-center">
                <Typography className="font-bold">{moment(profile.createdAt).format(DATE_FORMAT_DD_MMM_YYYY)}</Typography>
                <Typography className="text-sm font-medium" color="text.secondary">
                  {t('MEMBER_SINCE')}
                </Typography>
              </div>
            </div>
            <div className="flex flex-1 justify-end my-16 lg:my-0">
              <CustomTooltip title={t('EDIT_PROFILE')}>
                <Button variant="contained" color="secondary" component={NavLinkAdapter} to="/edit-profile">
                  <FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
                  <span className="mx-8">{t('EDIT_PROFILE')}</span>
                </Button>
              </CustomTooltip>
              <CustomTooltip title={t('CHANGE_PASSWORD')}>
                <Button className="ml-10" variant="contained" color="secondary" component={NavLinkAdapter} to="/change-password">
                  <FuseSvgIcon size={20}>heroicons-outline:key</FuseSvgIcon>
                  <span className="mx-8">{t('CHANGE_PASSWORD')}</span>
                </Button>
              </CustomTooltip>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <motion.div variants={container} initial="hidden" animate="show" className="w-full">
            <div className="md:flex">
              <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
                <Card component={motion.div} variants={item} className="w-full mb-32">
                  <div className="flex items-center px-32 pt-24">
                    <Typography className="flex flex-1 text-2xl font-semibold leading-tight">{t('GENERAL_INFORMATION')}</Typography>
                  </div>

                  <CardContent className="px-32 py-24">
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('USERNAME')}</Typography>
                      <Typography>{profile?.username}</Typography>
                    </div>

                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('EMAIL')}</Typography>
                      <div className="flex items-center">
                        <Typography className="mr-20">{profile.email}</Typography>
                        <RecordStatus name={profile.emailVerified ? 'VERIFIED' : 'UNVERIFIED'} />
                      </div>
                    </div>

                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('MOBILE_PHONE')}</Typography>
                      <div className="flex items-center">
                        <Typography className="mr-20">{profile.mobilePhone}</Typography>
                        {profile.mobileVerified && (
                          <RecordStatus name='VERIFIED' />
                        )}
                        {!profile.mobileVerified && (
                          <Button color="secondary" variant="outlined" size="small" onClick={sendMobileVerificationCode}>Verify Now</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card component={motion.div} variants={item} className="w-full mb-32">
                  <div className="flex items-center px-32 pt-24">
                    <Typography className="flex flex-1 text-2xl font-semibold leading-tight">{t('LOCATION')}</Typography>
                  </div>

                  <CardContent className="px-32 py-24">
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('ADDRESS')}</Typography>
                      <Typography component={'span'}>{profile.addressLine1 ? profile.addressLine1 : 'NA'}</Typography>
                      {profile.addressLine2 ? <Typography component={'span'}>, {profile.addressLine2}</Typography> : null}
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('CITY')}</Typography>
                      <Typography>{profile.city ? profile.city : 'NA'}</Typography>
                    </div>

                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('STATE')}</Typography>
                      <Typography>{profile.state ? profile.state : 'NA'}</Typography>
                    </div>

                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('ZIPCODE')}</Typography>
                      <Typography>{profile.zipcode ? profile.zipcode : 'NA'}</Typography>
                    </div>

                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('COUNTRY')}</Typography>
                      <Typography>{profile.country ? profile.country : 'NA'}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col md:w-320">
                <Card component={motion.div} variants={item} className="w-full mb-32">
                  <div className="flex items-center px-32 pt-24">
                    <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                      {t('TIMEZONE_INFO')}
                    </Typography>
                  </div>

                  <CardContent className="px-32 py-24">
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">{t('LOCAL')}</Typography>
                      <Typography>{profile?.timezone}</Typography>
                    </div>
                  </CardContent>
                </Card>

                <Card component={motion.div} variants={item} className="w-full mb-32">
                  <div className="flex items-center px-32 pt-24">
                    <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                      {t('OPT_IN_NOTIF')}
                    </Typography>
                  </div>

                  <CardContent className="px-32 py-24">
                    <div className="mb-24">
                      <FormControlLabel control={<Checkbox checked={profile?.notifications?.email} onChange={handleEmailNotifChange} />} label={t('EMAIL_NOTIFICATION')} />
                      <FormControlLabel control={<Checkbox checked={profile?.notifications?.mobile} onChange={handleMobileNotifChange} />} label={t('MOBILE_NOTIFICATION')} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
          {openVerifyMobileModal ? (
            <VerifyMobile profileData={profile} openVerifyMobileModal={openVerifyMobileModal} closeVerifyMobileModal={closeVerifyMobileModal} />
          ) : null}
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default UserProfile;
