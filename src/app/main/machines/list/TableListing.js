import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import {
  Badge,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Cookies from 'js-cookie';
import _ from "@lodash";
import moment from "moment";
import withRouter from "@fuse/core/withRouter";
import TableHeader from "./TableHeader";
import PreviewPage from "../preview";
import SearchFilter from "./SearchFilter";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { CustomActionMenu, CustomTooltip, LoadingView, NoRecordsView } from "app/shared-components/index";
import { getMyCompanyList } from 'app/store/companySlice';
import { userSession } from 'app/store/userSlice';
import { getMachines, searchMachines, selectMachines, verifyMachine, downloadMachines } from "./../store/machinesSlice";
import { DATE_FORMAT_DD_MMM_YYYY, TIME_FORMAT_HH_MM_a } from "./../../../configs/constants";
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
// import {
//   ACCESS_PERMISSIONS,
//   USER_PERMISSIONS_CODES
// } from "app/configs/constants";

const StyledBadge = styled(Badge)(({ theme, ...props }) => ({
  width: 40,
  '& .MuiAvatar-root': {
    fontSize: 'inherit',
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  '& .MuiBadge-badge': {
    backgroundColor: props.statuscolor,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  },
}));

function TableListing(props) {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const machines = useSelector(selectMachines);
  const { t } = useTranslation('Translation');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [status, setStatus] = useState(2);
  const [filterData, setFilterData] = useState({
    company: undefined,
    searchText: ""
  });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortOrder, setSortOrder] = useState({
    direction: "desc",
    column: "updatedAt",
  });

  useEffect(() => {
    if (signInUser?.company) {
      dispatch(getMyCompanyList(signInUser?.company)).then((result) => {
        setCompanyList(result.payload.data);
      })
    }
  }, []);

  useEffect(() => {
    getData();
  }, [dispatch, pagination, status]);

  const getData = () => {
    setLoading(true);
    if (filterData?.searchText || filterData?.company) {
      const inputJson = {
        company: filterData?.company,
        page: pagination.page + 1,
        perPage: pagination.rowsPerPage,
        searchText: filterData?.searchText,
        status: status,
        isDeleted: false
      };
      dispatch(searchMachines(inputJson)).then((result) => {
        setCount(result.payload.totalRecords);
        setSearchResult(true);
        setLoading(false);
      });
    } else {
      const inputJson = {
        companyId: signInUser.company,
        page: pagination.page,
        perPage: pagination.rowsPerPage,
        status: status
      };
      dispatch(getMachines(inputJson)).then((result) => {
        setCount(result.payload?.totalRecords);
        setLoading(false);
      });
    }
  };

  const onDownloadRecord = () => {
    setLoading(true);
    const inputJson = {
      companyId: signInUser.company,
      page: pagination.page,
      perPage: pagination.rowsPerPage
    };
    dispatch(downloadMachines(inputJson)).then((result) => {
      if (result.payload.messageId === 200) {
        window.open(result.payload.data);
      }
      setLoading(false);
    });
  }

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

  function handleEdit(item) {
    props.navigate(`/machines/${item._id}`);
  }

  function handleStatsClick(item) {
    props.navigate(`/machines/stats/${item._id}`);
  }

  function handleTransactionsClick(item) {
    props.navigate(`/machines/transactions/${item._id}`);
  }

  function handleChangePage(event, newPage) {
    setPagination({
      ...pagination,
      page: newPage,
    });
  }

  function handleChangeRowsPerPage(event) {
    setPagination({
      ...pagination,
      rowsPerPage: event.target.value,
      page: 0,
    });
  }

  const onOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const clearSearch = (data) => {
    setFilterData(data);
    setSearchResult(false);
    setPagination({ page: 0, rowsPerPage: 10 });
  };

  const onSubmitFilter = (data) => {
    setFilterData(data);
    setSearchResult(true);
    setPagination({ page: 0, rowsPerPage: 10 });
  };

  const onVerifyMachine = (item, type, status) => {
    dispatch(openDialog({
      children: (
        <>
          <DialogTitle id="alert-dialog-title">{type} {item?.programSerialNumber}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('CONFIRM_WARNING')} {type} {item?.programSerialNumber} - {item?.company?.name} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeDialog())} color="primary">
              {t('BACK')}
            </Button>
            <Button
              onClick={() => {
                setLoading(true);
                let inputJson = {
                  _id: item._id,
                  companyId: item?.company._id,
                  machineNo: item.programSerialNumber,
                  isVerified: !status,
                  verifiedBy: {
                    user: signInUser._id,
                    datetime: new Date()
                  },
                  userFirstName: item?.createdBy?.firstName,
                  email: item?.createdBy?.email
                }
                dispatch(verifyMachine(inputJson)).then((result) => {
                  if (result.payload.messageId === 200) {
                    dispatch(showMessage({ message: result.payload.message }));
                    getData();
                  } else {
                    setLoading(false);
                    dispatch(showMessage({ message: result.payload.message, variant: 'error' }));
                  }
                });
                dispatch(closeDialog());
              }}
              color="error"
              autoFocus
            >
              {type}
            </Button>
          </DialogActions>
        </>
      ),
    }));
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      <SearchFilter
        searchResult={searchResult}
        filterData={filterData}
        companyList={companyList}
        onSubmitFilter={onSubmitFilter}
        onClearFilter={clearSearch}
        onDownloadRecord={onDownloadRecord}
      />
      <div className="flex items-center pl-14 py-8">
        <span className="font-600 mr-10">{t("FILTER_BY_INDICATOR")}:</span>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus(2)} className={status === 2 ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>{t("ALL")}</Link>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus(1)} className={status === 1 ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>{t("ONLINE")}</Link>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus(0)} className={status === 0 ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>{t("OFFLINE")}</Link>
      </div>
      {machines?.length === 0 ? (
        <NoRecordsView message={t('NO_RECORD')} />
      ) : (
        <div className="w-full flex flex-col min-h-full px-10">
          <Typography variant="body2" className="mb-10 text-16 font-bold">
            {t('TOTAL_MACHINES')}: {count}
          </Typography>
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <TableHeader
              sortOrder={sortOrder}
              onRequestSort={handleRequestSort}
              rowCount={machines?.length}
            />

            <TableBody>
              {_.orderBy(
                machines,
                [
                  (o) => {
                    return o[sortOrder.column];
                  },
                ],
                [sortOrder.direction]
              ).map((n) => {
                return (
                  <TableRow
                    className="h-20 cursor-pointer"
                    hover
                    tabIndex={-1}
                    key={n._id}
                  >
                    <TableCell
                      className="pl-8 py-0 md:pl-8 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.company?.name}
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.machineType?.name}
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8"
                      component="th"
                      scope="row"
                    >
                      <CustomTooltip title={n?.machineStatus ? t('ONLINE') : t('OFFLINE')}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          variant="dot"
                          statuscolor={n?.machineStatus ? 'rgb(76, 175, 80)' : 'rgb(255,0,0)'}
                        >
                          {n?.programSerialNumber}
                        </StyledBadge>
                      </CustomTooltip>
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8"
                      component="th"
                      scope="row"
                    >
                      {n?.locationName}
                    </TableCell>
                    <TableCell className="p-8" component="th" scope="row">
                      {moment(n.updatedAt).format(DATE_FORMAT_DD_MMM_YYYY)}
                      <Typography color="text.secondary" variant="body2">
                        {moment(n.updatedAt).format(TIME_FORMAT_HH_MM_a)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8 truncate"
                      component="th"
                      scope="row"
                    >
                      <RecordStatus name={n.isVerified ? 'VERIFIED' : 'UNVERIFIED'} />
                    </TableCell>
                    <TableCell
                      className="pl-8 py-0 md:pl-8 no-print"
                      component="th"
                      scope="row"
                    >
                      {Cookies.get("_SuperMyMachineOnline") ?
                        <CustomActionMenu
                          actions={[
                            {
                              name: t('CLICK_TO_VIEW'),
                              iconName: "heroicons-outline:eye",
                              isVisible: true,
                              onClick: () => {
                                onOpenModal(n);
                              }
                            },
                            {
                              name: t('CLICK_TO_EDIT'),
                              iconName: "heroicons-outline:pencil-alt",
                              isVisible: true,
                              onClick: () => handleEdit(n)
                            },
                            {
                              name: t('STATS'),
                              iconName: "heroicons-outline:newspaper",
                              isVisible: true,
                              onClick: () => handleStatsClick(n)
                            },
                            {
                              name: t('TRANSACTIONS'),
                              iconName: "heroicons-outline:clipboard-list",
                              isVisible: true,
                              onClick: () => handleTransactionsClick(n)
                            },
                            {
                              name: t('CLICK_TO_VERIFY'),
                              iconName: "heroicons-outline:check-circle",
                              isVisible: !n.isVerified,
                              onClick: () => onVerifyMachine(n, t('VERIFY'), n.isVerified)
                            },
                            {
                              name: t('CLICK_TO_UNVERIFY'),
                              iconName: "heroicons-outline:ban",
                              isVisible: n.isVerified,
                              onClick: () => onVerifyMachine(n, t('UNVERIFY'), n.isVerified)
                            },
                          ]}
                        /> :
                        <CustomActionMenu
                          actions={[
                            {
                              name: t('CLICK_TO_VIEW'),
                              iconName: "heroicons-outline:eye",
                              isVisible:true,
                              onClick: () => {
                                onOpenModal(n);
                              }
                            },
                            {
                              name: t('CLICK_TO_EDIT'),
                              iconName: "heroicons-outline:pencil-alt",
                              isVisible: true,
                              onClick: () => handleEdit(n)
                            },
                            {
                              name: t('STATS'),
                              iconName: "heroicons-outline:newspaper",
                              isVisible: true,
                              onClick: () => handleStatsClick(n)
                            },
                            {
                              name: t('TRANSACTIONS'),
                              iconName: "heroicons-outline:clipboard-list",
                              isVisible:true,
                              onClick: () => handleTransactionsClick(n)
                            },
                            {
                              name: t('CLICK_TO_VERIFY'),
                              iconName: "heroicons-outline:check-circle",
                              isVisible: true,
                              onClick: () => onVerifyMachine(n, t('VERIFY'), n.isVerified)
                            },
                            {
                              name: t('CLICK_TO_UNVERIFY'),
                              iconName: "heroicons-outline:ban",
                              isVisible: true,
                              onClick: () => onVerifyMachine(n, t('UNVERIFY'), n.isVerified)
                            },
                          ]}
                        />
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TablePagination
            className="shrink-0 border-t-1 no-print"
            component="div"
            count={count}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            backIconButtonProps={{
              "aria-label": "Previous",
            }}
            nextIconButtonProps={{
              "aria-label": "Next",
            }}
            showFirstButton
            showLastButton
          />
        </div>
      )}
      {openModal ? (
        <PreviewPage
          previewData={modalData}
          openModal={openModal}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
}

export default withRouter(TableListing);
