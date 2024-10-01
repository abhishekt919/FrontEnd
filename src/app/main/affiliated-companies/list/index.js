import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

import reducer from '../store';
import ListHeader from './ListHeader';
import TableListing from './TableListing';

function CompanyList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ListHeader />}
      content={<TableListing />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('companyApp', reducer)(CompanyList);
