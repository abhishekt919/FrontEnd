import React, { forwardRef } from "react";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";

const CompanyDropDown = forwardRef(
    ({ value, onChange, label, placeholder, companyList, selectedCompanyId }, ref) => {
        return (
            <Autocomplete
                defaultValue={_.find(companyList, { _id: selectedCompanyId })}
                className="w-full autoCompleteDropdown"
                options={companyList}
                value={value || null}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                isOptionEqualToValue={(option, value) =>
                    value === undefined || value === "" || option._id === value._id
                }
                onChange={(e, v) => onChange(e, v)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className="p-0 m-0"
                        label={label ? label : placeholder}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        );
    }
);

export default CompanyDropDown;