import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import ProductList from "./productsList";
import ListHeader from "./productsListHeader";

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