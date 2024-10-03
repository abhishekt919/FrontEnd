import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NoRecordsView = ({ message, btnText, onButtonClick, navigateTo }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="absolute inset-0 flex flex-col items-center justify-center"
        >
            <Typography color="text.secondary" variant="h5" align="center">
                {message ? message : "There is no such record!"}
            </Typography>
            {onButtonClick && (
                <Button
                    className="mt-4"
                    variant="outlined"
                    onClick={onButtonClick}
                    color="inherit"
                >
                    {btnText}
                </Button>
            )}
            {navigateTo && (
                <Button
                    className="mt-4"
                    component={Link}
                    variant="outlined"
                    to={navigateTo}
                    color="inherit"
                >
                    {btnText ? btnText : "Go Back"}
                </Button>
            )}
        </motion.div>
    );
};

export default NoRecordsView;
