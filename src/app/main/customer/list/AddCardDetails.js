import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Grid, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FuseLoading from '@fuse/core/FuseLoading';
import { addCreditCard } from '../../../store/shared/paymentSlice';
import { showMessage } from "app/store/fuse/messageSlice";

function AddCardDetails(props) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { t } = useTranslation('Translation');
    const [isLoading, setLoading] = useState(false);
    const [cardError, setCardError] = useState(null);
    const [nameOnCard, setNameOnCard] = useState("");
    const [cardLabel, setCardLabel] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (props?.customer?.address?.line1) {
            const payload = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: nameOnCard,
                    address: props?.customer?.address
                },
                metadata: {
                    cardLabel: cardLabel
                }
            });
            if (payload.error) {
                setCardError(payload.error.message);
            } else {
                let inputJson = {
                    customerId: props?.customer?.id,
                    paymentMethod: payload.paymentMethod.id
                }
                setLoading(true);
                dispatch(addCreditCard(inputJson)).then((result) => {
                    if (result.payload.messageId === 200) {
                        dispatch(showMessage({ message: result.payload.message }));
                        setLoading(false);
                        props.handleClose();
                    } else {
                        setLoading(false);
                        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                    }
                });
            }
        } else {
            setCardError("Please add billing address details.");
        }
    };

    if (isLoading) {
        return <FuseLoading />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        label={t('NAME_ON_CARD')}
                        placeholder={t('NAME_ON_CARD')}
                        value={nameOnCard}
                        onChange={(event) => setNameOnCard(event.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        label={t('CARD_LABEL')}
                        placeholder={t('CARD_LABEL')}
                        value={cardLabel}
                        onChange={(event) => setCardLabel(event.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>
                        {t('CARD_NUMBER')}
                        <CardNumberElement />
                    </label>
                </Grid>
                <Grid item xs={6}>
                    <label>
                        {t('EXPIRATION_DATE')}
                        <CardExpiryElement />
                    </label>
                </Grid>
                <Grid item xs={6}>
                    <label>
                        CVC
                        <CardCvcElement />
                    </label>
                </Grid>
            </Grid>
            {cardError && (
                <Alert severity="warning" className="my-10" action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setCardError(null)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    {cardError}
                </Alert>
            )}
            <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!stripe || !elements || !nameOnCard || !cardLabel}
            >
                {t('SUBMIT')}
            </Button>
        </form>
    );
}

export default AddCardDetails;
