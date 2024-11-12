import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { IconButton, Link, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import Cookies from 'js-cookie';
import RecordStatus from '../../../theme-layouts/shared-components/RecordStatus';
import TableHeader from './TableHeader';
import UserPreview from '../preview/index';
import { userSession } from 'app/store/userSlice';
import { userProfile } from 'app/store/userProfileSlice';
import { getUsers, selectUsers, selectSearchText } from '../store/usersSlice';
import AuthService from './../../../auth/services/AuthService';
import { DATE_FORMAT_DD_MMM_YYYY, TIME_FORMAT_HH_MM_a } from '../../../configs/constants';
import { CustomActionMenu, CustomTooltip } from 'app/shared-components/index';
import { showMessage } from 'app/store/fuse/messageSlice';
import { hasModuleAccess } from "src/app/utils/helperFunctions";
// import {
//   ACCESS_PERMISSIONS,
//   USER_PERMISSIONS_CODES
// } from "../../../configs/constants";

function TableListing(props) {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const users = useSelector(selectUsers);
  const profile = useSelector(userProfile);
  const searchText = useSelector(selectSearchText);
  const { t } = useTranslation('Translation');
  const [loading, setLoading] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState('ALL');
  const [sortOrder, setSortOrder] = useState({
    direction: 'desc',
    column: 'createdAt'
  });

  useEffect(() => {
    setLoading(true)
    let inputJson = {
      companyId: signInUser.company,
      status: status
    }
    dispatch(getUsers(inputJson)).then(() => setLoading(false));
  }, [dispatch, status]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(users, (item) => item.firstName.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(users);
    }
  }, [users, searchText]);

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

  function handleEdit(item) {
    props.navigate(`/users/${item._id}`);
  }

  function handlePermissionClick(item) {
    props.navigate(`/users/permissions/${item._id}`);
  }

  function handleLoginAs(item) {
    let switchUserEmail = profile?.email;
    setLoading(true);
    AuthService
      .loginInAsUser(item.email, switchUserEmail)
      .then((result) => {
        setLoading(false);
        props.navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        dispatch(showMessage({ message: error, variant: 'error' }));
      });
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function onOpenModal(item) {
    setUserData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center py-10 mx-16">
        <span className="font-600 mr-10">{t("FILTER_BY_STATUS")}:</span>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus('ALL')} className={status === 'ALL' ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>ALL</Link>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus('ACTIVE')} className={status === 'ACTIVE' ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>ACTIVE</Link>
        <Link component="button" variant="body2" underline="hover" onClick={() => setStatus('INACTIVE')} className={status === 'INACTIVE' ? 'mr-10 text-white bg-blue-800 rounded-full text-12 font-semibold py-4 px-12' : 'mr-10'}>INACTIVE</Link>
      </div>
      {data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="flex flex-1 items-center justify-center h-full"
        >
          <Typography color="text.secondary" variant="h5">
            {t('NO_RECORD')}
          </Typography>
        </motion.div>
      ) : (
        <div className="w-full flex flex-col min-h-full px-10">
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
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  return (
                    <TableRow
                      className="h-20 cursor-pointer"
                      hover
                      tabIndex={-1}
                      key={n._id}
                    >
                      <TableCell className="p-8" component="th" scope="row">
                        {n.firstName} {n.lastName}
                      </TableCell>

                      <TableCell className="p-8" component="th" scope="row">
                        {n.email}
                      </TableCell>

                      <TableCell className="p-8 capitalize font-semibold" component="th" scope="row">
                        {n.role}
                      </TableCell>

                      <TableCell className="p-8" component="th" scope="row">
                        {moment(n.createdAt).format(DATE_FORMAT_DD_MMM_YYYY)}
                        <Typography color="text.secondary" variant="body2">
                          {moment(n.createdAt).format(TIME_FORMAT_HH_MM_a)}
                        </Typography>
                      </TableCell>

                      <TableCell className="p-8" component="th" scope="row">
                        {moment(n.updatedAt).format(DATE_FORMAT_DD_MMM_YYYY)}
                        <Typography color="text.secondary" variant="body2">
                          {moment(n.updatedAt).format(TIME_FORMAT_HH_MM_a)}
                        </Typography>
                      </TableCell>

                      <TableCell className="p-0 md:p-0" component="th" scope="row">
                        <RecordStatus name={n.isActive ? 'ACTIVE' : 'INACTIVE'} />
                      </TableCell>
                      <TableCell className="pl-8 py-0 md:pl-8 no-print" component="th" scope="row">
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
                                onClick: () => {
                                  handleEdit(n);
                                }
                              },
                              {
                                name: t('EDIT_PERMISSIONS'),
                                iconName: "material-outline:security",
                                isVisible: true,
                                onClick: () => {
                                  handlePermissionClick(n);
                                }
                              }
                            ]}
                          />
                          :
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
                                  isVisible:true,
                                  onClick: () => {
                                    handleEdit(n);
                                  }
                                },
                                {
                                  name: t('EDIT_PERMISSIONS'),
                                  iconName: "material-outline:security",
                                  isVisible: true,
                                  onClick: () => {
                                    handlePermissionClick(n);
                                  }
                                }
                              ]}
                            />
                        }
                      </TableCell>
                      {/* <TableCell className="pl-8 py-0 md:pl-8 no-print" component="th" scope="row">
                        {Cookies.get("_SuperMyMachineOnline") && signInUser?._id !== n?._id ?
                          <CustomTooltip title={t('LOGIN_AS') + ' ' + n.firstName + " " + n.lastName}>
                            <IconButton
                              aria-owns="view-record"
                              aria-haspopup="true"
                              onClick={() => handleLoginAs(n)}
                              size="large"
                            >
                              <FuseSvgIcon>material-outline:login</FuseSvgIcon>
                            </IconButton>
                          </CustomTooltip>
                          :
                          <>
                            {(n?.role != 'director' && signInUser?._id !== n?._id && hasModuleAccess(USER_PERMISSIONS_CODES.USERS, ACCESS_PERMISSIONS.LOGIN_AS)) && (
                              <CustomTooltip title={t('LOGIN_AS') + ' ' + n.firstName + " " + n.lastName}>
                                <IconButton
                                  aria-owns="view-record"
                                  aria-haspopup="true"
                                  onClick={() => handleLoginAs(n)}
                                  size="large"
                                >
                                  <FuseSvgIcon>material-outline:login</FuseSvgIcon>
                                </IconButton>
                              </CustomTooltip>
                            )}
                          </>
                        }
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            className="shrink-0 border-t-1 no-print"
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('ROWS_PER_PAGE')}
          />
        </div>
      )}
      {openModal ?
        <UserPreview userData={userData} openModal={openModal} closeModal={closeModal} />
        : null
      }
    </>
  );
}

export default withRouter(TableListing);
