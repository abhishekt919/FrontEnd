import FusePageCarded from "@fuse/core/FusePageCarded";
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import ContactList from "./contactList";
import ListHeader from "./listHeader";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FusePageCarded
      header={<ListHeader />}
      content={<ContactList />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default withReducer('productModule', reducer)(ListingPage);