import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import moment from 'moment';
import { Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import RecordStatus from '../../../theme-layouts/shared-components/RecordStatus';
import TableHeader from './TableHeader';
import { userSession } from 'app/store/userSlice';
import { getCompanyList, selectAllCompany } from '../store/companySlice';
import { DATE_FORMAT_DD_MMM_YYYY, TIME_FORMAT_HH_MM_a } from '../../../configs/constants';

function TableListing() {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const { t } = useTranslation('Translation');
  const allCompany = useSelector(selectAllCompany);

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(allCompany);
  const [count, setCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10
  });
  const [sortOrder, setSortOrder] = useState({
    direction: 'desc',
    column: 'createdAt'
  });

  useEffect(() => {
    setLoading(true);
    let inputJson = {
      companyId: signInUser?.company,
      page: pagination.page,
      perPage: pagination.rowsPerPage,
    }
    dispatch(getCompanyList(inputJson)).then((result) => {
      setData(result.payload.data);
      setCount(result.payload.totalRecords);
      setLoading(false);
    });
  }, [dispatch, pagination]);

  function handleRequestSort(event, column) {
    let direction = 'desc';
    if (sortOrder.column === column && sortOrder.direction === 'desc') {
      direction = 'asc';
    }

    setSortOrder({
      direction,
      column
    });
  }

  function handleChangePage(event, newPage) {
    setPagination({
      ...pagination,
      page: newPage
    });
  }

  function handleChangeRowsPerPage(event) {
    setPagination({
      ...pagination,
      rowsPerPage: event.target.value,
      page: 0
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t('NO_RECORD')}
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col min-h-full">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            sortOrder={sortOrder}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  return o[sortOrder.column]
                },
              ],
              [sortOrder.direction]
            ).map((n) => {
              return (
                <TableRow className="h-20 cursor-pointer" hover tabIndex={-1} key={n._id}>
                  <TableCell className="pl-8 py-0 md:pl-8" component="th" scope="row">
                    {n.name}
                  </TableCell>

                  <TableCell className="pl-8 py-0 md:pl-8" component="th" scope="row">
                    {n.createdBy?.firstName} {n.createdBy?.lastName}
                  </TableCell>

                  <TableCell className="pl-8 py-0 md:pl-8" component="th" scope="row">
                    {n.createdBy?.email}
                  </TableCell>

                  <TableCell className="p-8 " component="th" scope="row">
                    {moment(n.createdAt).format(DATE_FORMAT_DD_MMM_YYYY)}
                    <Typography color="text.secondary" variant="body2">
                      {moment(n.createdAt).format(TIME_FORMAT_HH_MM_a)}
                    </Typography>
                  </TableCell>

                  <TableCell className="pl-8 py-0 md:pl-8" component="th" scope="row">
                    <RecordStatus name={n.isActive ? 'ACTIVE' : 'INACTIVE'} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TablePagination
          className="shrink-0 border-t-1"
          component="div"
          count={count}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('ROWS_PER_PAGE')}
          backIconButtonProps={{
            'aria-label': 'Previous',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next',
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
}

export default withRouter(TableListing);
