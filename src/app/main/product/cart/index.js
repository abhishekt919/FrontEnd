import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import CartTable from "./cartTable";
import CartHeader from "./cartHeader";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FusePageCarded
      header={<CartHeader />}
      content={<CartTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer('productModule', reducer)(ListingPage);