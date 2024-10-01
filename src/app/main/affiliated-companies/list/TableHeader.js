import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

function TableHeader(props) {
  const { t } = useTranslation('Translation');
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };
  const rows = [
    {
      id: 'name',
      align: 'left',
      disablePadding: false,
      label: t('COMPANY_NAME'),
      sort: true,
    },
    {
      id: 'admin',
      align: 'left',
      disablePadding: false,
      label: t('DIRECTOR_NAME'),
      sort: true,
    },
    {
      id: 'email',
      align: 'left',
      disablePadding: false,
      label: t('DIRECTOR_EMAIL'),
      sort: true,
    },
    {
      id: 'createdAt',
      align: 'left',
      disablePadding: false,
      label: t('CREATED_AT'),
      sort: true,
    },
    {
      id: 'active',
      align: 'left',
      disablePadding: false,
      label: t('STATUS'),
      sort: true,
    }
  ];

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-48">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="pl-8 py-0 md:pl-8"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.sortOrder.column === row.id ? props.sortOrder.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title={t('SORT')}
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.sortOrder.column === row.id}
                    direction={props.sortOrder.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
