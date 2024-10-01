import { Alert, AlertTitle } from "@mui/material";
import { motion } from "framer-motion";

import { APP_CONSTANTS } from "../configs/constants";

const NoAccessPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-col flex-1 items-center justify-center h-full"
        >
            <Alert severity="warning">
                <AlertTitle>{APP_CONSTANTS.NoAccessTitle}</AlertTitle>
                {APP_CONSTANTS.NoAccessToPage}
            </Alert>
        </motion.div>
    );
};

export default NoAccessPage;
