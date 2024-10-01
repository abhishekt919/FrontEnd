import {
  Checkbox,
  lighten,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import _ from "lodash";
import { useTranslation } from 'react-i18next';

import { ACCESS_PERMISSIONS } from "app/configs/constants";
import { CustomTooltip } from "app/shared-components/index";

function TableHeader(props) {
  const { t } = useTranslation('Translation');
  const { data, sortOrder, onSelectAllClick } = props;
  const totalLength = data.length;
  const rows = [
    {
      id: 'moduleName',
      align: 'left',
      label: t('MODULE_NAME'),
      tooltip: t('NAME_OF_MODULE')
    },
    {
      id: 'view',
      align: 'left',
      label: t('VIEW'),
      tooltip: t('PERMISSION_VIEW')
    },
    {
      id: 'create',
      align: 'left',
      label: t('CREATE'),
      tooltip: t('PERMISSION_CREATE')
    },
    {
      id: 'update',
      align: 'left',
      label: t('UPDATE'),
      tooltip: t('PERMISSION_UPDATE')
    },
    {
      id: 'delete',
      align: 'left',
      label: t('DELETE'),
      tooltip: t('PERMISSION_DELETE')
    },
    {
      id: 'download',
      align: 'left',
      label: t('DOWNLOAD'),
      tooltip: t('PERMISSION_DOWNLOAD')
    },
    {
      id: 'print',
      align: 'left',
      label: t('PRINT'),
      tooltip: t('PERMISSION_PRINT')
    },
    {
      id: 'loginas',
      align: 'left',
      label: t('LOGIN_AS'),
      tooltip: t('PERMISSION_LOGIN_AS')
    },
  ];

  const getCheckBoxValue = (permissionName) => {
    const checkedArray = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const isChecked = _.includes(element.permissions, permissionName);
      if (isChecked) checkedArray.push(isChecked);
    }
    return checkedArray;
  };

  const getPermissionName = (id) => {
    let permissionName = "";
    switch (id) {
      case "view":
        permissionName = ACCESS_PERMISSIONS.VIEW;
        break;

      case "create":
        permissionName = ACCESS_PERMISSIONS.CREATE;
        break;

      case "update":
        permissionName = ACCESS_PERMISSIONS.UPDATE;
        break;

      case "delete":
        permissionName = ACCESS_PERMISSIONS.DELETE;
        break;

      case "download":
        permissionName = ACCESS_PERMISSIONS.DOWNLOAD;
        break;

      case "print":
        permissionName = ACCESS_PERMISSIONS.PRINT;
        break;

      case "loginas":
        permissionName = ACCESS_PERMISSIONS.LOGIN_AS;
        break;

      default:
        break;
    }
    return permissionName;
  };

  return (
    <TableHead>
      <TableRow className="h-20 sm:h-20">
        {rows.map((row, i) => {
          const permissionName = getPermissionName(row.id);
          const checkedArray = getCheckBoxValue(permissionName);
          const checked =
            totalLength !== 0 && checkedArray.length === totalLength
              ? true
              : false;

          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="pl-8 md:pl-8"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                sortOrder.column === row.id ? sortOrder.direction : false
              }
            >
              {i > 0 ? (
                <Checkbox
                  indeterminate={
                    checkedArray.length > 0 && checkedArray.length < totalLength
                      ? true
                      : false
                  }
                  checked={checked}
                  onChange={() => {
                    onSelectAllClick(
                      permissionName,
                      checkedArray.length !== totalLength
                        ? "addAllModulesPermission"
                        : "removeAllModulesPermission"
                    );
                  }}
                />
              ) : null}
              <CustomTooltip title={row.tooltip}>
                <span className="font-semibold">{row.label}</span>
              </CustomTooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
