import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import CustomerList from "./customerList";
//import ListHeader from "./listHeader";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FusePageCarded
    //   header={<ListHeader />}
      content={<CustomerList />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer('customerModule', reducer)(ListingPage);