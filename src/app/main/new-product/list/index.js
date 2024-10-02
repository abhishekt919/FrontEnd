import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import ProductList from "./productList";
import ListHeader from "./header";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FusePageCarded
      header={<ListHeader />}
      content={<ProductList />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer('productModule', reducer)(ListingPage);