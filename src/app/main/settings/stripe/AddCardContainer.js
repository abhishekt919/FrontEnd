import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import { Alert, Button, Grid, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectCompany } from 'app/store/companySlice';
import { addCreditCard, listCreditCards } from 'app/store/shared/paymentSlice';

function AddCardContainer(props) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const company = useSelector(selectCompany);
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

        if (company?.billingAddress?.line1) {
            const payload = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: nameOnCard,
                    address: {
                        city: company?.billingAddress?.city,
                        country: company?.billingAddress?.country,
                        line1: company?.billingAddress?.line1,
                        line2: company?.billingAddress?.line2,
                        state: company?.billingAddress?.state,
                        postal_code: company?.billingAddress?.zipcode,
                    }
                },
                metadata: {
                    cardLabel: cardLabel
                }
            });
            if (payload.error) {
                setCardError(payload.error.message);
            } else {
                let inputJson = {
                    customerId: company.customerId,
                    paymentMethod: payload.paymentMethod.id
                }
                setLoading(true);
                dispatch(addCreditCard(inputJson)).then((result) => {
                    if (result.payload.messageId === 200) {
                        let inputJson1 = {
                            customerId: company.customerId
                        }
                        dispatch(listCreditCards(inputJson1)).then((result1) => {
                            setLoading(false);
                            props.handleClose();
                            dispatch(showMessage({ message: result.payload.message }));
                        })
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

    if (!company || isLoading) {
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
                        label={t('THIS_CARD_FOR_FUTURE_USE')}
                        placeholder={t('THIS_CARD_FOR_FUTURE_USE')}
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
            {cardError ?
                <Alert severity="warning" className="my-10" action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setCardError(null);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    {cardError}
                </Alert>
                :
                null
            }
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
};

export default AddCardContainer;
