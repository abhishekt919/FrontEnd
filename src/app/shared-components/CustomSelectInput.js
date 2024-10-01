import { forwardRef } from "react";
import { ListItemText, MenuItem, Select } from "@mui/material";

const CustomSelect = forwardRef(({ field, searchTypes, label }, ref) => {
    return (
        <Select
            {...field}
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            className="flex flex-1 items-center px-8 rounded-full shadow-0 formTopDropdown"
            label={label ? label : "Select search type"}
            renderValue={(selected) =>
                searchTypes.find((type) => type.value === selected)?.label
            }
        >
            {searchTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                    <ListItemText primary={type.label} />
                </MenuItem>
            ))}
        </Select>
    );
});

export default CustomSelect;
