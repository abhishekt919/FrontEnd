import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CustomTooltip from "app/shared-components/CustomTooltip";
import AddCardDialog from './../stripe/AddCardDialog';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { selectCompany } from 'app/store/companySlice';
import { listCreditCards, selectCreditCards, deleteCreditCard } from 'app/store/shared/paymentSlice'

const PaymentTab = (props) => {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const savedCards = useSelector(selectCreditCards);
  const { t } = useTranslation('Translation');

  const [addCardOpen, setAddCardOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let inputJson = {
      customerId: company?.customerId
    }
    setLoading(true);
    dispatch(listCreditCards(inputJson)).then((result) => {
      setLoading(false);
      if (result.payload.messageId === 200) {
      } else {
        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
      }
    });
  }, [dispatch]);

  const openAddCardModal = () => {
    setAddCardOpen(true);
  };

  const closeAddCardModal = () => {
    setAddCardOpen(false);
  };

  const deletecard = (item) => {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('ARE_YOU_WANT_TO_DELETE_CARD')} ••••  {item.card.last4}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                let inputJson = {
                  paymentMethod: item.id
                }
                setLoading(true);
                dispatch(deleteCreditCard(inputJson)).then((result) => {
                  if (result.payload.messageId === 200) {
                    let inputJson1 = {
                      customerId: company.customerId
                    }
                    dispatch(listCreditCards(inputJson1)).then((result1) => {
                      setLoading(false);
                      dispatch(showMessage({ message: result.payload.message }));
                    })
                  } else {
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                });
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </>
      ),
    }));
  }

  if (!company || isLoading) {
    return <FuseLoading />;
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 w-full min-w-0 p-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="border-solid border-1 rounded-lg">
          <div className="border-x-0 border-t-0 border-solid border-1 p-10">
            <Typography component={"span"} className="text-16 sm:text-20 truncate font-semibold">
              {t("SAVED_CREDIT_CARD")}
              <Button
                onClick={openAddCardModal}
                variant="outlined"
                color="secondary"
                size="small"
                className="ml-10"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                {t("ADD_CREDIT_CARD")}
              </Button>
            </Typography>
          </div>
          <div>
            <List className="py-0 mt-8 divide-y">
              {savedCards && savedCards.map((item, index) => (
                <ListItem key={index} className="px-0">
                  <ListItemText
                    className="px-8 font-medium capitalize"
                    primary={item.card.brand + " ••••" + " " + item.card.last4}
                    secondary={
                      <>
                        <Typography component="span" display="block" className="text-md" color="text.secondary">
                          Expires: {item.card.exp_month}/{item.card.exp_year}
                        </Typography>
                        <Typography component="span" display="block" className="text-md" color="text.secondary">
                          Name on card: {item.billing_details.name}
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
              ))}
            </List>
          </div>
        </div>
        <div className="border-solid border-1 rounded-lg">
          <div className="border-x-0 border-t-0 border-solid border-1 p-10">
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {t('CREDIT_CARD_FAQS')}
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
            <Typography variant="body1" display="block" className="font-semibold">
              {t('QUESTION_1')}
            </Typography>
            <Typography variant="body1" display="block">
              {t('ANSWER_1')}
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
            <Typography variant="body1" display="block" className="font-semibold">
              {t('QUESTION_2')}
            </Typography>
            <Typography variant="body1" display="block">
              {t('ANSWER_2')}
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-4 p-10">
            <Typography variant="body1" display="block" className="font-semibold">
              {t('QUESTION_3')}
            </Typography>
            <Typography variant="body1" display="block">
              {t('ANSWER_3')}
            </Typography>
          </div>
        </div>
      </motion.div>
      <AddCardDialog open={addCardOpen} handleClose={closeAddCardModal} />
    </>
  );
};

export default PaymentTab;
