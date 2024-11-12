import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import TrafficLight from "./TrafficLight";

function ListingPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      content={<TrafficLight />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}
export default ListingPage;
