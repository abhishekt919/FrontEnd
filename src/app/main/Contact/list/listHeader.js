import { Button, Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

function ListHeader() {
  const theme = useTheme();

return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography className="text-16 sm:text-20 truncate font-semibold">
        Contact|
      </Typography>
      {/* <Typography className="text-16 sm:text-20 truncate font-semibold">
        <Button to="/cart" component={Link}>Items in cart</Button> : {cartItems.length}
      </Typography> */}
      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8 no-print">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            component={Link}
            to="/contact/add"
            variant="contained"
            color="secondary"
            className="mr-10"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add Contact
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ListHeader;