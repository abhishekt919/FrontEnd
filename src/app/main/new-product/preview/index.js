import { Fragment } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, lighten } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import RecordStatus from 'app/theme-layouts/shared-components/RecordStatus';
import { LoadingView } from 'app/shared-components/index';
import { DATETIME_FORMAT_MM_DD_YYYY } from '../../../configs/constants';

export default function PreviewPage(props) {

    if (!props.previewData) {
        return <LoadingView />;
    }

    return (
        <div className="w-full max-w-7xl">
            <Dialog disableEscapeKeyDown open={props.openModal} onClose={props.closeModal} maxWidth="lg" fullWidth >
                <Box display="flex" justifyContent="space-between" className='bg-[#f1f5f9]'>
                    <DialogTitle>MACHINE_DETAILS</DialogTitle>
                    <DialogActions sx={{ paddingRight: '16px' }}>
                        <Button onClick={props.closeModal} color='error'><CloseIcon /></Button>
                    </DialogActions>
                </Box>
                <DialogContent dividers>
                    <div className="grid grid-cols-1 gap-x-10 lg:gap-y-16  sm:grid-cols-2 lg:grid-cols-3 lg:gap-64 w-full my-0" >
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                ProductID
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.productId}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                Title
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.title}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                Price
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.price}
                            </Typography>
                        </div>
                        {/* <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                Name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.cabinetSerialNumber}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.programSerialNumber}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.machineIP}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.locationName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.locationManager.name}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.createdBy?.firstName} {props.previewData?.createdBy?.lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                               name
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {moment(props.previewData.createdAt).format(DATETIME_FORMAT_MM_DD_YYYY)}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                anme
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {props.previewData?.updatedBy?.firstName} {props.previewData?.updatedBy?.lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" display="inline" className="font-semibold">
                                
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10">
                                {moment(props.previewData.updatedAt).format(DATETIME_FORMAT_MM_DD_YYYY)}
                            </Typography>
                        </div> */}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}