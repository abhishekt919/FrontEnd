import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function ListHeader() {
  const { t } = useTranslation('Translation');
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <div className="flex flex-col flex-auto">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-24 font-bold tracking-tight"
        >
          {t('AFFILIATED_COMPANY')}
        </Typography>
      </div>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
        </motion.div>
      </div>
    </div>
  );
}

export default ListHeader;
