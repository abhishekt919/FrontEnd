import { lighten, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import clsx from 'clsx';
import CustomTooltip from 'app/shared-components/CustomTooltip';
import { useTranslation } from 'react-i18next';

function TableHeader(props) {
  const { t } = useTranslation('Translation');

  const createSortHandler = (property) => (event) => {
    if (property !== 'active') {
      props.onRequestSort(event, property);
    }
  };
  const rows = [
    {
      id: 'company',
      align: 'left',
      disablePadding: false,
      label: t('COMPANY_NAME'),
      sort: true,
    },
    {
      id: 'machineType',
      align: 'left',
      disablePadding: false,
      label: t('MACHINE_TYPE'),
      sort: true,
    },
    {
      id: 'programSerialNumber',
      align: 'left',
      disablePadding: false,
      label: t('KIOSK_ID_NUMBER'),
      sort: true,
    },
    {
      id: 'locationName',
      align: 'left',
      disablePadding: false,
      label: t('LOCATION_NAME'),
      sort: true,
    },
    {
      id: 'updatedAt',
      align: 'left',
      disablePadding: false,
      label: t('UPDATED_AT'),
      sort: true,
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: t('STATUS'),
      sort: false,
    },
    {
      id: 'actions',
      align: 'left',
      disablePadding: false,
      label: t('ACTIONS'),
      sort: false,
      noPrint: 'no-print'
    }
  ];

  return (
    <TableHead>
      <TableRow className="h-20 sm:h-20">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className={clsx("pl-8 md:pl-8", row.noPrint)}
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.sortOrder.column === row.id ? props.sortOrder.direction : false}
            >
              {row.sort && (
                <CustomTooltip title={t('SORT')}>
                  <TableSortLabel
                    active={props.sortOrder.column === row.id}
                    direction={props.sortOrder.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </CustomTooltip>
              )}
              {!row.sort && (
                <span className='font-semibold'>{row.label}</span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
