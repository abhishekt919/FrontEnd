import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch } from 'react-redux';

import { LoadingView } from "app/shared-components/index";
import { verifyMobile, updateProfile } from 'app/store/userProfileSlice';

export default function VerifyMobile(props) {
    const { t } = useTranslation('Translation');
    const dispatch = useDispatch();
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmitCode = () => {
        let inputJson = {
            mobilePhone: props?.profileData?.mobilePhoneNumber,
            verificationCode: verificationCode
        }
        setLoading(true);
        dispatch(verifyMobile(inputJson)).then((result) => {
            if (result.payload.messageId === 200) {
                let updateJson = {
                    _id: props?.profileData?._id,
                    mobileVerified: true,
                    type: "VERIFY"
                }
                dispatch(updateProfile(updateJson)).then(() => {
                    props.closeVerifyMobileModal();
                    setLoading(false);
                });
            } else {
                setLoading(false);
                setErrorMessage(result.payload.message);
            }
        });
    }

    if (!props.profileData || isLoading) {
        return <LoadingView />;
    }

    return (
        <Dialog
            disableEscapeKeyDown
            open={props.openVerifyMobileModal}
            onClose={props.closeVerifyMobileModal}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                className="bg-[#f1f5f9]"
            >
                <DialogTitle>{t('VERIFY')} {t('MOBILE_PHONE')}</DialogTitle>
                <DialogActions sx={{ paddingRight: "16px" }}>
                    <Button onClick={props.closeVerifyMobileModal} color="error">
                        <CloseIcon />
                    </Button>
                </DialogActions>
            </Box>
            <DialogContent dividers>
                <Typography className="mt-16">
                    {t("ENTER_MOBILE_CODE")}
                </Typography>
                <div className="flex items-center justify-center mt-16">
                    <ReactInputVerificationCode
                        length={6}
                        onChange={setVerificationCode}
                        value={verificationCode}
                        placeholder=""
                        passwordMask=""
                        type="text"
                    />
                </div>

                {errorMessage ?
                    <Alert severity="warning" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setErrorMessage(null);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                        sx={{ mb: 2 }} className="mt-10">
                        {errorMessage}
                    </Alert> : null
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmitCode} variant='contained' disabled={!verificationCode} color='secondary' className="ml-20">{t("SUBMIT")}</Button>
            </DialogActions>
        </Dialog>
    );
}
