import { Typography } from "@mui/material";
import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from "date-fns";
import moment from "moment";
import _ from "lodash";
import store from "../store";
const { getState } = store;

export const isValidFileType = (fileName, validFileExtensions = ['jpg', 'pdf', 'png', 'jpeg']) => fileName && validFileExtensions.indexOf(fileName.split('.').pop()) > -1;

export const newlineText = (text) => text.split('\n').map((str) => <Typography component={'span'} key={str}>{str}<br /></Typography>);

export const getDateEndTime = (date) => moment(date).format('YYYY-MM-DD[T23:59:59.999Z]');

export const setPastDateRange = (value, type, date = new Date()) => {
    let range = [];
    switch (type) {
        case 'days':
            range = [subDays(date, value), date]
            break;

        case 'weeks':
            range = [subWeeks(date, value), date]
            break;

        case 'months':
            range = [subMonths(date, value), date]
            break;

        case 'years':
            range = [subYears(date, value), date]
            break;

        default:
            break;
    }
    return range
}

export const setFutureDateRange = (value, type, date = new Date()) => {
    let range = [];
    switch (type) {
        case 'days':
            range = [date, addDays(date, value)]
            break;

        case 'weeks':
            range = [date, addWeeks(date, value)]
            break;

        case 'months':
            range = [date, addMonths(date, value)]
            break;

        case 'years':
            range = [date, addYears(date, value)]
            break;

        default:
            break;
    }
    return range
}

export const hasModuleAccess = (moduleCode, permission) => {
    const permissions = getState()?.profile?.permissions || [];
    const module = _.find(permissions, { moduleCode: moduleCode });
    if (module) {
        const hasAccess = _.includes(module.permissions, permission);
        return hasAccess;
    }
    return false;
};
