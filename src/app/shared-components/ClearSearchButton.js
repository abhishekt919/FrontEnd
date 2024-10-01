import React from 'react'
import CustomTooltip from 'app/shared-components/CustomTooltip';
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const ClearSearchButton = (props) => {
  return (
    <div>
      <CustomTooltip title={props.clearSearchText}>
        <Button
          color="error"
          size="small"
          className="px-10"
          endIcon={<FuseSvgIcon color='error'>material-outline:close</FuseSvgIcon>}
          onClick={props.clearData}>
          {props.clearSearchText}
        </Button>
      </CustomTooltip>
    </div>
  )
}

export default ClearSearchButton;