import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from "../store";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCart } from "./../store/cartSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import LoadingView from "app/shared-components/LoadingView";
import ProductList from "./productsList";
import ListHeader from "./productsListHeader";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCart())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          showMessage({ message: "Failed to load cart", variant: "error" })
        );
        console.error("Error fetching cart:", error);
      });
  }, [dispatch]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <FusePageCarded
      header={<ListHeader />}
      content={<ProductList />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer("productModule", reducer)(ListingPage);
