import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTranslation } from 'react-i18next';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import AddCardContainer from "./AddCardContainer";

function AddCardDialog(props) {
    const { t } = useTranslation('Translation');
    const options = {
        appearance: {
            theme: 'stripe',
            labels: 'floating',
            variables: {
                colorPrimary: '#0570de',
                colorBackground: '#ffffff',
                colorText: '#30313d',
                colorDanger: '#df1b41',
                fontFamily: 'Inter var,Roboto,"Helvetica",Arial,sans-serif',
                spacingUnit: '2px',
                borderRadius: '5px'
            }
        }
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <Box display="flex" justifyContent="space-between" className='bg-[#f1f5f9]'>
                    <DialogTitle>{t('ADD_CREDIT_CARD')}</DialogTitle>
                    <DialogActions sx={{ paddingRight: '16px' }}>
                        <Button onClick={props.handleClose} color='error'><CloseIcon /></Button>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <DialogContentText className="mb-20">
                        {t('ADD_CARD_DESCRIPTION')}
                    </DialogContentText>
                    <Elements stripe={stripePromise} options={options}>
                        <AddCardContainer handleClose={props.handleClose} />
                    </Elements>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddCardDialog;