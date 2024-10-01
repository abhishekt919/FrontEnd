import { forwardRef } from "react";
import { Input, Paper } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import ClearSearchButton from "./ClearSearchButton";

const CustomSearchInput = forwardRef(
    ({ field, onClearFilter, searchResult, placeholder, clearSearchText }, ref) => {
        return (
            <Paper className="flex flex-1 items-center space-x-8 px-16 rounded-full border-1 shadow-0">
                <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
                <Input
                    {...field}
                    placeholder={placeholder}
                    className="flex flex-1"
                    disableUnderline
                    fullWidth
                    inputProps={{
                        "aria-label": "Search",
                    }}
                />
                {searchResult && (
                    <ClearSearchButton clearData={onClearFilter} clearSearchText={clearSearchText}/>
                )}
            </Paper>
        );
    }
);

export default CustomSearchInput;
