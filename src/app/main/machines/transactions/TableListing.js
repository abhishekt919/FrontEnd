import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import moment from "moment";
import TableHeader from "./TableHeader";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { LoadingView, NoRecordsView } from "app/shared-components/index";
import { getMachineEvents } from "../store/machinesSlice";
import { showMessage } from 'app/store/fuse/messageSlice';
import { DATE_FORMAT_DD_MMM_YYYY, TIME_FORMAT_HH_MM_a } from "../../../configs/constants";

function TableListing(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('Translation');
  const [isLoading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);

  const [sortOrder, setSortOrder] = useState({
    direction: "desc",
    column: "created",
  });

  useEffect(() => {
    let endTime = new Date().getTime();
    const inputJson = {
      machineIP: props?.machine?.machineIP,
      startTime: 0,
      endTime: endTime
    }

    setLoading(true);
    dispatch(getMachineEvents(inputJson)).then((result) => {
      if (result.payload.messageId === 200) {
        setLoading(false);
        setEventData(result.payload.data?.events);
      } else {
        setLoading(false);
        setEventData([]);
        dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
      }
    })
  }, []);

  function handleRequestSort(event, column) {
    let direction = "desc";
    if (sortOrder.column === column && sortOrder.direction === "desc") {
      direction = "asc";
    }

    setSortOrder({
      direction,
      column,
    });
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <>
      {eventData?.length === 0 ? (
        <NoRecordsView message={t('NO_RECORD')} />
      ) : (
        <div className="w-full flex flex-col min-h-full px-10">
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <TableHeader
              sortOrder={sortOrder}
              onRequestSort={handleRequestSort}
              rowCount={eventData?.length}
            />

            <TableBody>
              {_.orderBy(
                eventData,
                [
                  (o) => {
                    return o[sortOrder.column];
                  },
                ],
                [sortOrder.direction]
              ).map((n, idx) => {
                return (
                  <TableRow
                    className="h-20 cursor-pointer"
                    hover
                    tabIndex={-1}
                    key={idx}
                  >
                    <TableCell
                      className="p-8"
                      component="th"
                      scope="row"
                    >
                      {moment(n.created * 1000).format(DATE_FORMAT_DD_MMM_YYYY)}
                      <Typography color="text.secondary" variant="body2">
                        {moment(n.created * 1000).format(TIME_FORMAT_HH_MM_a)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.id}
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8"
                      component="th"
                      scope="row"
                    >
                      {n?.value}
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8"
                      component="th"
                      scope="row"
                    >
                      {n?.remaining}
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8 truncate"
                      component="th"
                      scope="row"
                    >
                      <RecordStatus name={n.status} />
                    </TableCell>
                    <TableCell className="p-8 " component="th" scope="row">
                      {n.result}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default withRouter(TableListing);
