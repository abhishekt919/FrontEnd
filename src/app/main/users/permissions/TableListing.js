import { Checkbox, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import TableHeader from "./TableHeader";
import {
  CustomTooltip,
  LoadingView,
  NoRecordsView,
} from "app/shared-components/index";
import {
  getUserPermissionsByUserId,
  selectUser,
  updateUserPermissionsByUserId,
} from "../store/userSlice";
import { ACCESS_PERMISSIONS } from "app/configs/constants";
import { userSession } from "app/store/userSlice";

function TableListing() {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    direction: "desc",
    column: "createdAt",
  });

  useEffect(() => {
    console.log(user?.permissions);
    setData(user?.permissions || []);
  }, [user]);

  useEffect(() => {
    dispatch(getUserPermissionsByUserId(routeParams.id)).then(() =>
      setLoading(false)
    );
  }, [dispatch]);

  const handleToggle = (item, permission) => {
    const isExists = _.includes(item.permissions, permission);
    dispatch(
      updateUserPermissionsByUserId({
        action: isExists ? "removePermission" : "addPermission",
        userId: routeParams.id,
        moduleCode: item.moduleCode,
        permission: permission,
        updatedBy: signInUser._id
      })
    ).then(() => setLoading(false));
  };

  const handleSelectAllClick = (permission, action) => {
    const inputJson = {
      action,
      permission,
      userId: routeParams.id,
      updatedBy: signInUser._id
    };

    dispatch(updateUserPermissionsByUserId(inputJson)).then(() =>
      setLoading(false)
    );
  };

  if (loading) return <LoadingView />;

  if (data.length === 0)
    return <NoRecordsView message="There are no records!" />;

  return (
    <div className="w-full flex flex-col min-h-full">
      <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
        <TableHeader
          sortOrder={sortOrder}
          onSelectAllClick={handleSelectAllClick}
          data={data}
        />

        <TableBody>
          {_.orderBy(
            data,
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
                key={n.moduleCode}
              >
                <TableCell className="p-8" component="th" scope="row">
                  <CustomTooltip title={n?.description}>
                    <span>{n?.moduleName}</span>
                  </CustomTooltip>
                </TableCell>

                <TableCell className="p-8 px-20" component="th" scope="row">
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(n, ACCESS_PERMISSIONS.VIEW)}
                    checked={_.includes(
                      n.permissions,
                      ACCESS_PERMISSIONS.VIEW
                    )}
                  />
                </TableCell>

                <TableCell className="p-8 px-20" component="th" scope="row">
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(n, ACCESS_PERMISSIONS.CREATE)}
                    checked={_.includes(
                      n.permissions,
                      ACCESS_PERMISSIONS.CREATE
                    )}
                  />
                </TableCell>

                <TableCell className="p-8 px-20" component="th" scope="row">
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(n, ACCESS_PERMISSIONS.UPDATE)}
                    checked={_.includes(
                      n.permissions,
                      ACCESS_PERMISSIONS.UPDATE
                    )}
                  />
                </TableCell>

                <TableCell className="p-8 px-20" component="th" scope="row">
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(n, ACCESS_PERMISSIONS.DELETE)}
                    checked={_.includes(
                      n.permissions,
                      ACCESS_PERMISSIONS.DELETE
                    )}
                  />
                </TableCell>
                {(n?.moduleCode === "XBSOX" || n?.moduleCode === "KSZQQ") && (
                  <TableCell className="p-8 px-20" component="th" scope="row">
                    <Checkbox
                      edge="start"
                      onChange={() => handleToggle(n, ACCESS_PERMISSIONS.DOWNLOAD)}
                      checked={_.includes(
                        n.permissions,
                        ACCESS_PERMISSIONS.DOWNLOAD
                      )}
                    />
                  </TableCell>
                )}

                {(n?.moduleCode === "XBSOX" || n?.moduleCode === "KSZQQ") && (
                  <TableCell className="p-8 px-20" component="th" scope="row">
                    <Checkbox
                      edge="start"
                      onChange={() => handleToggle(n, ACCESS_PERMISSIONS.PRINT)}
                      checked={_.includes(
                        n.permissions,
                        ACCESS_PERMISSIONS.PRINT
                      )}
                    />
                  </TableCell>
                )}

                {n?.moduleCode === "XBSOX" && (
                  <TableCell className="p-8 px-20" component="th" scope="row">
                    <Checkbox
                      edge="start"
                      onChange={() => handleToggle(n, ACCESS_PERMISSIONS.LOGIN_AS)}
                      checked={_.includes(
                        n.permissions,
                        ACCESS_PERMISSIONS.LOGIN_AS
                      )}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default withRouter(TableListing);
