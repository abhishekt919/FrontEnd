import { Fragment } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, lighten, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import RecordStatus from 'app/theme-layouts/shared-components/RecordStatus';
import { LoadingView } from 'app/shared-components/index';
import { DATETIME_FORMAT_MM_DD_YYYY } from '../../../../app/configs/constants';

export default function UserPreview(props) {
    const { t } = useTranslation('Translation');

    if (!props.userData) {
        return <LoadingView />;
    }

    return (
        <div className="w-full max-w-7xl">
            <Dialog disableEscapeKeyDown open={props.openModal} onClose={props.closeModal} maxWidth="lg" fullWidth >
                <Box display="flex" justifyContent="space-between" className='bg-[#f1f5f9]'>
                    <DialogTitle>{t('USER_DETAILS')}</DialogTitle>
                    <DialogActions sx={{ paddingRight: '16px' }}>
                        <Button onClick={props.closeModal} color='error'><CloseIcon /></Button>
                    </DialogActions>
                </Box>
                <DialogContent dividers>
                    <div className="grid grid-cols-1 gap-x-10 lg:gap-y-16  sm:grid-cols-2 lg:grid-cols-3 lg:gap-64 w-full my-0" >
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('NAME')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.userData.firstName} {props.userData.lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('USERNAME')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.userData?.username}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('EMAIL')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.userData.email}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t("MOBILE_PHONE")} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.userData?.mobilePhone}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('CREATED_BY')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.userData?.createdBy?.firstName} {props.userData?.createdBy?.lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('CREATED_AT')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {moment(props.userData.createdAt).format(DATETIME_FORMAT_MM_DD_YYYY)}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('UPDATED_BY')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.userData?.updatedBy?.firstName} {props.userData?.updatedBy?.lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                {t('UPDATED_AT')} :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {moment(props.userData.updatedAt).format(DATETIME_FORMAT_MM_DD_YYYY)}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold mr-8">
                                {t('STATUS')} :
                            </Typography>
                            <RecordStatus name={props.userData?.isActive ? 'ACTIVE' : 'INACTIVE'} />
                        </div>
                    </div>
                    {props.userData?.lastLoginEnabled && props.userData?.lastLogin?.length ? (
                        <>
                            <div className="mt-20 mb-10">
                                <Typography variant="body1" display="inline" className="font-semibold">
                                    {t('LOGIN_LOG')}
                                </Typography>
                            </div>
                            <div className="table-responsive rounded-md border-solid border-2">
                                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                                    <TableHead>
                                        <TableRow className="h-20">
                                            <TableCell className="p-16 pl-8">
                                                <Typography className="font-semibold">{t('BROWSER')}</Typography>
                                            </TableCell>
                                            <TableCell className="p-16 pl-8">
                                                <Typography className="font-semibold">{t('OS')}</Typography>
                                            </TableCell>
                                            <TableCell className="p-0">
                                                <Typography className="font-semibold">IP</Typography>
                                            </TableCell>
                                            <TableCell className="p-0">
                                                <Typography className="font-semibold">{t('DATE_TIME')}</Typography>
                                            </TableCell>
                                            <TableCell className="p-0">
                                                <Typography className="font-semibold">{t('TIMEZONE_INFO')}</Typography>
                                            </TableCell>
                                            <TableCell className="p-0">
                                                <Typography className="font-semibold">{t('LOCATION')}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.userData?.lastLoginEnabled && props.userData?.lastLogin.map((lastLoginLog, idx) => (
                                            <Fragment key={idx}>
                                                <TableRow
                                                    className="h-20 cursor-pointer"
                                                    hover
                                                    tabIndex={-1}
                                                    sx={{
                                                        backgroundColor: (theme) =>
                                                            theme.palette.mode === 'light'
                                                                ? lighten(theme.palette.background.default, 0.4)
                                                                : lighten(theme.palette.background.default, 0.02),
                                                    }}>
                                                    <TableCell className="pl-8 py-10" component="th" scope="row">{lastLoginLog?.browser || 'N/A'}</TableCell>
                                                    <TableCell className="pl-8 py-10" component="th" scope="row">{lastLoginLog?.osName || 'N/A'}</TableCell>
                                                    <TableCell className="p-0" component="th" scope="row">{lastLoginLog?.ip}</TableCell>
                                                    <TableCell className="p-0" component="th" scope="row">{moment(lastLoginLog?.dateTime).format(DATETIME_FORMAT_MM_DD_YYYY)}</TableCell>
                                                    <TableCell className="p-0" component="th" scope="row">{lastLoginLog?.timezone}</TableCell>
                                                    <TableCell className="p-0" component="th" scope="row">{lastLoginLog?.location?.city}, {lastLoginLog?.location?.region}, {lastLoginLog?.location?.country}</TableCell>
                                                </TableRow>
                                            </Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}