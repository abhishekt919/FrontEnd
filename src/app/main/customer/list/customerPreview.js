import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "app/store/fuse/messageSlice";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CustomTooltip from "app/shared-components/CustomTooltip";
import { selectCreditCards, listCreditCards } from 'app/store/shared/paymentSlice';
import { LoadingView } from "app/shared-components/index";

export default function PreviewPage(props) {
    const { t } = useTranslation("Translation");
    const dispatch = useDispatch();
    //const savedCards = useSelector(selectCreditCards);
    const [savedCards, setSavedCards] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let inputJson = {
            customerId: props?.previewData?.id
        }
        dispatch(listCreditCards(inputJson))
            .then((result) => {
                console.log("Data: ", result)
                setSavedCards(result.payload.data || []);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                dispatch(showMessage({ message: "Failed to load customer cards", variant: "error" }));
                console.error("Error fetching customer:", error);
            });
    }, [dispatch]);

    if (!props.previewData || isLoading) {
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
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Name:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.name || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Email:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.email || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Address Line 1:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.line1 || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Address Line 2:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.line2 || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                City:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.city || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                State:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.state || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Postal Code:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.postal_code || "N/A"}
                            </Typography>
                        </div>

                        <div className="flex items-center">
                            <Typography variant="subtitle1" className="font-semibold">
                                Country:
                            </Typography>
                            <Typography variant="body1" className="ml-4">
                                {props.previewData?.address?.country || "N/A"}
                            </Typography>
                        </div>

                        <div className="col-span-full">
                            <Typography variant="h6" className="font-bold mb-4">
                                Saved Cards
                            </Typography>
                            <List className="divide-y bg-white rounded-lg shadow">
                                {savedCards && savedCards.length > 0 ? (
                                    savedCards.map((item, index) => {
                                        // Function to get the logo based on card brand
                                        const getCardLogo = (brand) => {
                                            switch (brand.toLowerCase()) {
                                                case "visa":
                                                    return "/assets/images/logo/visa.png";
                                                case "mastercard":
                                                    return "/assets/images/logo/master card.png";
                                                case "amex":
                                                    return "/assets/images/logo/amex.png";
                                                case "discover":
                                                    return "/assets/images/logo/discover.png";
                                                default:
                                                    return "../logo/default-card.png"; 
                                            }
                                        };

                                        return (
                                            <ListItem key={index} className="flex items-center px-4 py-3">
                                                <img
                                                    src={getCardLogo(item.card.brand)}
                                                    alt={`${item.card.brand} logo`}
                                                    className="w-28 h-24 mr-6 object-contain"
                                                />
                                                <ListItemText
                                                    className="flex-1"
                                                    primary={`${item.card.brand} •••• ${item.card.last4}`}
                                                    secondary={
                                                        <>
                                                            <Typography component="span" display="block" color="textSecondary">
                                                                Expires: {item.card.exp_month}/{item.card.exp_year}
                                                            </Typography>
                                                            <Typography component="span" display="block" color="textSecondary">
                                                                Name on Card: {item.billing_details.name}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                                <ListItemSecondaryAction>
                                                    <CustomTooltip title="Delete">
                                                        <IconButton aria-label="delete" size="medium" onClick={() => deletecard(item)}>
                                                            <FuseSvgIcon color="error">feather:trash</FuseSvgIcon>
                                                        </IconButton>
                                                    </CustomTooltip>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })
                                ) : (
                                    <Typography variant="body2" color="textSecondary" className="p-4">
                                        No saved cards available.
                                    </Typography>
                                )}
                            </List>
                        </div>

                    </div>
                </DialogContent >
            </Dialog >
        </div >
    );
}
