import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import { LoadingView, NoRecordsView } from "app/shared-components/index";
import { getMachineStats } from "../store/machinesSlice";
import { showMessage } from 'app/store/fuse/messageSlice';

const container = {
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

function ListingPage(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('Translation');
  const [isLoading, setLoading] = useState(false);
  const [statData, setStatData] = useState(null);

  useEffect(() => {
    const inputJson = {
      machineIP: props?.machine?.machineIP
    }
    setLoading(true);
    dispatch(getMachineStats(inputJson)).then((result) => {
      if(result.payload.messageId === 200){
        setLoading(false);
        setStatData(result.payload.data?.html?.children[1]?.body?.children[0]);
      } else {
        setLoading(false);
        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
      }
    })
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <>
      {!statData ? (
        <NoRecordsView message={t('NO_RECORD')} />
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 w-full min-w-0 p-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="border-solid border-1 rounded-lg">
              <div className="border-x-0 border-t-0 border-solid border-1 p-10">
                <Typography className="text-16 sm:text-20 truncate font-semibold">
                  {t('SUMMARY')}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('KIOSK_NUMBER')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[0]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('KIOSK_LOCATION')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[1]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('START_TIME')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[2]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('END_TIME')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[3]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('TOTAL_PAYOUT')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[4]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('NUMBER_OF_PAYOUT')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[5]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('AVERAGE_PAYOUT')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[6]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('FAILED_PAYOUT')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[7]?.tr?.children[1].td?.text}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('REJECTED_TICKETS')}
                </Typography>
                <Typography variant="body1" display="inline">
                  {statData?.div?.children[1]?.table?.children[0]?.tbody?.children[8]?.tr?.children[1].td?.text}
                </Typography>
              </div>
            </div>
            <div className="border-solid border-1 rounded-lg">
              <div className="border-x-0 border-t-0 border-solid border-1 p-10">
                <Typography className="text-16 sm:text-20 truncate font-semibold">
                  {t('NOTES_PAYOUT_ACTIVITY')}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('DENOM')}
                </Typography>
                <Typography variant="body1" display="inline" className="font-semibold">
                  {t('NOTES_TAKEN')}
                </Typography>
              </div>
              {_.orderBy(statData?.div?.children[2]?.div?.children[0]?.table?.children[0]?.tbody?.children).slice(2)
                .map((n, idx) => {
                  return (
                    <div key={idx} className="grid grid-cols-2 gap-4 p-10 border-x-0 border-t-0 border-dashed border-1">
                      <Typography variant="body1" display="inline">
                        {n?.tr?.children[0]?.td?.text}
                      </Typography>
                      <Typography variant="body1" display="inline">
                        {n?.tr?.children[1]?.td?.text}
                      </Typography>
                    </div>
                  )
                })
              }
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 w-full min-w-0 p-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="border-x-0 border-t-0 border-solid border-1 p-10">
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {t('CURRENT_CASSETTE_INVENTORY')}
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="Current Cassette Inventory">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{t('TRAY')}</TableCell>
                    <TableCell align="center">{t('CASS_ID')}</TableCell>
                    <TableCell align="center">{t('STATUS')}</TableCell>
                    <TableCell align="center">{t('DENOM')}</TableCell>
                    <TableCell align="center">{t('STOCK_LEVEL')}</TableCell>
                    <TableCell align="center">{t('NOTES_TAKEN')}</TableCell>
                    <TableCell align="center">{t('NOTES_REMAINING')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_.orderBy(statData?.div?.children[2]?.div?.children[1]?.table?.children[0]?.tbody?.children).slice(2)
                    .map((n, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell align="center">{n?.tr?.children[0]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[1]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[2]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[3]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[4]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[5]?.td?.text}</TableCell>
                          <TableCell align="center">{n?.tr?.children[6]?.td?.text}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="border-x-0 border-t-0 border-solid border-1 p-10">
              <Typography className="text-16 sm:text-20">
                {statData?.div?.children[2]?.div?.children[1]?.table?.children[1]?.caption?.text}
              </Typography>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default withRouter(ListingPage);
