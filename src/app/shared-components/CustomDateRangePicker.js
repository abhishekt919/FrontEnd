import { forwardRef } from "react";
import { FormControl } from "@mui/material";
import { DateRangePicker } from "rsuite";
import { subDays, subMonths, subYears, addMonths, addYears } from "date-fns";

const todayDate = new Date();

const predefinedPastRanges = [
    {
        label: "Today",
        value: [todayDate, todayDate],
        placement: "left",
    },
    {
        label: "Yesterday",
        value: [subDays(todayDate, 1), subDays(todayDate, 1)],
        placement: "left",
    },
    {
        label: "Last 7 days",
        value: [subDays(todayDate, 6), todayDate],
        placement: "left",
    },
    {
        label: "Last 15 days",
        value: [subDays(todayDate, 14), todayDate],
        placement: "left",
    },
    {
        label: "Last 1 Month",
        value: [subMonths(todayDate, 1), todayDate],
        placement: "left",
    },
    {
        label: "Last 3 Months",
        value: [subMonths(todayDate, 3), todayDate],
        placement: "left",
    },
    {
        label: "Last 6 Months",
        value: [subMonths(todayDate, 6), todayDate],
        placement: "left",
    },
    {
        label: "Last 1 Year",
        value: [subYears(todayDate, 1), todayDate],
        placement: "left",
    },
];

const predefinedFutureRanges = [
    {
        label: "Next 1 Month",
        value: [todayDate, addMonths(todayDate, 1)],
        placement: "left",
    },
    {
        label: "Next 3 Months",
        value: [todayDate, addMonths(todayDate, 3)],
        placement: "left",
    },
    {
        label: "Next 6 Months",
        value: [todayDate, addMonths(todayDate, 6)],
        placement: "left",
    },
    {
        label: "Next 1 Year",
        value: [todayDate, addYears(todayDate, 1)],
        placement: "left",
    },
    {
        label: "Next 2 Years",
        value: [todayDate, addYears(todayDate, 2)],
        placement: "left",
    },
    {
        label: "Next 3 Years",
        value: [todayDate, addYears(todayDate, 3)],
        placement: "left",
    },
];

const CustomDateRangePicker = forwardRef(
    ({ value, onChange, options, showFutureDates, placeholder }, ref) => {
        const rangeOptions = showFutureDates
            ? predefinedFutureRanges
            : predefinedPastRanges;

        return (
            <FormControl className="w-full datepickerCustomCss">
                <DateRangePicker
                    value={value}
                    ranges={options ? options : rangeOptions}
                    className="flex flex-1 items-center space-x-8 rounded-full shadow-0 mb-10 lg:mb-0"
                    placeholder={placeholder ? placeholder : "Filter by date"}
                    onChange={onChange}
                />
            </FormControl>
        );
    }
);

export default CustomDateRangePicker;
