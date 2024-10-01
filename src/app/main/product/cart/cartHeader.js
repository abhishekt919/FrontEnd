import { Button, Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCart } from "./../store/cartSlice";
function ListHeader() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCart())
      .then((result) => {
        setCartItems(result.payload.cart.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, [dispatch]);
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography className="text-16 sm:text-20 truncate font-semibold">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="link"
            to="/product"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Products</span>
          </Typography>
        </motion.div>
        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography
              variant="caption"
              className="text-16 sm:text-20 truncate font-semibold"
            >
              Cart Items | <Button>Items in cart</Button> : {cartItems?.length || 0}
            </Typography>
          </motion.div>
        </div>
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8 no-print">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            component={Link}
            to="/product/new"
            variant="contained"
            color="secondary"
            className="mr-10"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add Product
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
export default ListHeader;
