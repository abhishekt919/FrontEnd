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
      id: 'created',
      align: 'left',
      disablePadding: false,
      label: t('CREATED_AT'),
      sort: true,
    },
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: t('ID'),
      sort: true,
    },
    {
      id: 'value',
      align: 'left',
      disablePadding: false,
      label: t('VALUE'),
      sort: true,
    },
    {
      id: 'remaining',
      align: 'left',
      disablePadding: false,
      label: t('REMAINING'),
      sort: true,
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: t('STATUS'),
      sort: true,
    },
    {
      id: 'result',
      align: 'left',
      disablePadding: false,
      label: t('RESULT'),
      sort: true,
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
