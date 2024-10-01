import FuseLoading from '@fuse/core/FuseLoading';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LandingHeader from '../../extras/LandingHeader';
import { DATE_FORMAT_DD_MMM_YYYY } from '../../../configs/constants';

function TermsofUse() {
  const [legalData, setLegalData] = useState(null);

  useEffect(() => {
    async function updateRecordState() {
      let inputJson = {
        type: 'terms'
      }
      const response = await axios.post(`/legal/get-company`, inputJson);
      const result = await response.data;
      if (result.messageId === 200) {
        setLegalData(result.data);
      }
    }
    updateRecordState();
  }, []);

  /**
   * Wait while data is loading
   */
  if (!legalData) {
   return <FuseLoading/>
  }

  return (
    <>
      <LandingHeader />
      <div className="relative flex flex-col flex-auto min-w-0 overflow-hidden mt-20">
        <div className="flex flex-col items-center px-24 py-40 sm:px-64 sm:pt-72 sm:pb-80 app-features" sx={{ backgroundColor: 'primary.main' }}>
          <div className="w-full max-w-7xl">
            <motion.div
              className="flex flex-col w-full mb-20"
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                Terms of use
              </Typography>
              {legalData && legalData.updatedAt ?
                <Typography
                  className="font-medium tracking-tight"
                  color="text.secondary"
                >
                 Last Updated: {moment(legalData.updatedAt).format(DATE_FORMAT_DD_MMM_YYYY)}
                </Typography>
                : null
              }
           </motion.div>
            <div dangerouslySetInnerHTML={{ __html: legalData.data }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsofUse;
