export const APP_CONSTANTS = {
    SiteDescription: "Remote kiosk and game machine management",
    StrongPasswordMessage: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case character.",
    NoAccessTitle: "No Access!!",
    SupportEmail: "support@RocketWebServices.com",
    NoAccessToPage:"You don't have an access to view this page. Please contact your admin.",
}

export const DATETIME_FORMAT_MM_DD_YYYY = "DD-MMM-YYYY hh:mm a";
export const DATE_FORMAT_DD_MMM_YYYY = "DD-MMM-YYYY";
export const TIME_FORMAT_HH_MM_a = "hh:mm a";

export const REGEX_CONSTANTS = {
    USER_NAME_REGEX: /^[a-zA-Z0-9_]{3,20}$/,
    TWO_DECIMAL_PLACES: /^[0-9]*(\.[0-9]{0,2})?$/,
    GREATER_THAN_ZERO_TWO_DECIMAL_PLACES: /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/,
    EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    NUMBER_VALUE_MORE_THAN_ZERO: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
};

export const USER_PERMISSIONS_CODES = {
    MACHINES: "KSZQQ",
    USERS: "XBSOX",
    SETTINGS: "FJXDK",
    PAYMENT: "UZHLL"
};

export const ACCESS_PERMISSIONS = {
    VIEW: "View",
    CREATE: "Create",
    UPDATE: "Update",
    DELETE: "Delete",
    DOWNLOAD: "Download",
    PRINT: "Print",
    LOGIN_AS: "LoginAs"
};