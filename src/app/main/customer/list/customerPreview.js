import { Fragment } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    lighten,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useTranslation } from "react-i18next";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { LoadingView } from "app/shared-components/index";
import { DATETIME_FORMAT_MM_DD_YYYY } from "../../../configs/constants";

export default function PreviewPage(props) {
    const { t } = useTranslation("Translation");

    if (!props.previewData) {
        return <LoadingView />;
    }

    return (
        <div className="w-full max-w-7xl">
            <Dialog
                disableEscapeKeyDown
                open={props.openModal}
                onClose={props.closeModal}
                maxWidth="lg"
                fullWidth
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    className="bg-[#f1f5f9]"
                >
                    <DialogTitle>{t("Customer Details")}</DialogTitle>
                    <DialogActions sx={{ paddingRight: "16px" }}>
                        <Button onClick={props.closeModal} color="error">
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </Box>
                <DialogContent dividers>
                    <div className="grid grid-cols-1 gap-x-10 lg:gap-y-16  sm:grid-cols-2 lg:grid-cols-3 lg:gap-64 w-full my-0">
                        <div>
                            <Typography
                                variant="body1"
                                display="inline"
                                className="font-semibold"
                            >
                                Name :
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.name}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="body1"
                                display="inline"
                                className="font-semibold"
                            >
                                email:
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.email}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="body1"
                                display="inline"
                                className="font-semibold"
                            >
                                Line 1:
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.address.line1}
                            </Typography>
                        </div>
                        <div>  <Typography
                            variant="body1"
                            display="inline"
                            className="font-semibold"
                        >
                            Line 2:
                        </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.address.line2}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="body1"
                                display="inline"
                                className="font-semibold"
                            >
                                City:
                            </Typography>
                            <Typography variant="body1" display="inline" className="ml-10 ">
                                {props.previewData?.address.city}
                            </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="body1"
                                    display="inline"
                                    className="font-semibold"
                                >
                                    state:
                                </Typography>
                                <Typography variant="body1" display="inline" className="ml-10 ">
                                    {props.previewData?.address.country}
                                </Typography>
                            </div>

                            <div>
                                <Typography
                                    variant="body1"
                                    display="inline"
                                    className="font-semibold"
                                >
                                    PostalCode:
                                </Typography>
                                <Typography variant="body1" display="inline" className="ml-10 ">
                                    {props.previewData?.address.postal_code}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="body1"
                                    display="inline"
                                    className="font-semibold"
                                >
                                    country:
                                </Typography>
                                <Typography variant="body1" display="inline" className="ml-10 ">
                                    {props.previewData?.address.country}
                                </Typography>
                            </div>
                        </div>

                </DialogContent >
            </Dialog >
        </div >
    );
}
