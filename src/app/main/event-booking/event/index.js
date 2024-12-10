import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import EventList from "./event";
// import ListHeader from "./header";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FusePageCarded
    //   header={<ListHeader />}
      content={<EventList />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default ListingPage;
// export default withReducer('productModule', reducer)(ListingPage);