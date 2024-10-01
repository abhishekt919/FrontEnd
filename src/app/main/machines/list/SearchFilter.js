import { Button, Grid } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
    CustomSearchInput,
    CompanyDropDown,
} from "app/shared-components/index";

import { hasModuleAccess } from "src/app/utils/helperFunctions";
import {
  ACCESS_PERMISSIONS,
  USER_PERMISSIONS_CODES
} from "app/configs/constants";

const SearchFilter = (props) => {
    const { t } = useTranslation('Translation');
    const { control, reset, getValues } = useForm({
        mode: "onChange",
        defaultValues: props.filterData
            ? props.filterData
            : {
                company: "",
                searchText: ""
            },
    });

    const clearSearch = () => {
        const data = {
            company: "",
            searchText: ""
        };
        reset(data);
        props.onClearFilter(data);
    };

    const onSubmitClick = (e) => {
        if (e) e.preventDefault();
        const formValues = getValues();
        props.onSubmitFilter(formValues);
    };

    return (
        <form onSubmit={onSubmitClick} className="m-20 no-print">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Controller
                        name="company"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <CompanyDropDown
                                value={value}
                                onChange={(e, company) => {
                                    onChange(company);
                                    onSubmitClick();
                                }}
                                companyList={props?.companyList}
                                selectedCompanyId={props.filterData?.company}
                                placeholder={t('FILTER_BY_COMPANY')}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Controller
                        name="searchText"
                        control={control}
                        render={({ field }) => (
                            <CustomSearchInput
                                field={field}
                                onClearFilter={clearSearch}
                                searchResult={props.searchResult}
                                placeholder={t('SEARCH_MACHINE')}
                                clearSearchText={t('CLEAR_SEARCH')}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<FuseSvgIcon>material-outline:search</FuseSvgIcon>}
                    >
                        {t('SEARCH')}
                    </Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                    {hasModuleAccess(USER_PERMISSIONS_CODES.MACHINES, ACCESS_PERMISSIONS.DOWNLOAD) && (
                        <Button
                            onClick={props.onDownloadRecord}
                            variant="contained"
                            color="primary"
                            startIcon={<FuseSvgIcon>heroicons-outline:document-download</FuseSvgIcon>}
                        >
                            {t('DOWNLOAD')}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default SearchFilter;