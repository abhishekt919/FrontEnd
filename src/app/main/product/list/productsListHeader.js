import { Button, Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectCartData } from "./../store/cartSlice";

function ListHeader() {
  const cartData = useSelector(selectCartData);

  console.log("cartData", cartData);

  
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography className="text-16 sm:text-20 truncate font-semibold">
        Products |
      </Typography>
      <Typography className="text-16 sm:text-20 truncate font-semibold">
        <Button to="/cart" component={Link}>
          Items in cart
        </Button>{" "}
        : {cartData?.cart?.data?.data?.items?.length}
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
