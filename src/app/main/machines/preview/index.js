import { Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  lighten,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useTranslation } from "react-i18next";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { LoadingView } from "app/shared-components/index";
import { DATETIME_FORMAT_MM_DD_YYYY } from "../../../configs/constants";

export default function PreviewPage(props) {
  const { t } = useTranslation("Translation");

  if (!props.previewData) {
    return <LoadingView />;
  }

  return (
    <div className="w-full max-w-7xl">
      <Dialog
        disableEscapeKeyDown
        open={props.openModal}
        onClose={props.closeModal}
        maxWidth="lg"
        fullWidth
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className="bg-[#f1f5f9]"
        >
          <DialogTitle>{t("MACHINE_DETAILS")}</DialogTitle>
          <DialogActions sx={{ paddingRight: "16px" }}>
            <Button onClick={props.closeModal} color="error">
              <CloseIcon />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent dividers>
          <div className="grid grid-cols-1 gap-x-10 lg:gap-y-16  sm:grid-cols-2 lg:grid-cols-3 lg:gap-64 w-full my-0">
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("MACHINE_TYPE")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData.machineType?.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("CABINET_SERIAL_NUMBER")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.cabinetSerialNumber}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("KIOSK_ID_NUMBER")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.programSerialNumber}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("IP")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.machineIP}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("LOCATION_NAME")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.locationName}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("LOCATION_MANAGER")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.locationManager.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("CREATED_BY")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.createdBy?.firstName}{" "}
                {props.previewData?.createdBy?.lastName}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("CREATED_AT")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {moment(props.previewData.createdAt).format(
                  DATETIME_FORMAT_MM_DD_YYYY
                )}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("UPDATED_BY")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.updatedBy?.firstName}{" "}
                {props.previewData?.updatedBy?.lastName}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                {t("UPDATED_AT")} :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {moment(props.previewData.updatedAt).format(
                  DATETIME_FORMAT_MM_DD_YYYY
                )}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold mr-8"
              >
                {t("STATUS")} :
              </Typography>
              <RecordStatus
                name={props.previewData.isVerified ? "VERIFIED" : "UNVERIFIED"}
              />
            </div>
          </div>
          {props.previewData?.locationAddress?.line1 ? (
            <div className="table-responsive rounded-md border-solid border-2 mt-16">
              <Table
                stickyHeader
                className="min-w-xl"
                aria-labelledby="tableTitle"
              >
                <TableHead>
                  <TableRow className="h-20">
                    <TableCell className="p-16 pl-8">
                      <Typography className="font-semibold">
                        {t("LOCATION")} {t("ADDRESS")}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-16 pl-8">
                      <Typography className="font-semibold">
                        {t("CITY")}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-0">
                      <Typography className="font-semibold">
                        {t("STATE")}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-0">
                      <Typography className="font-semibold">
                        {t("COUNTRY")}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-0">
                      <Typography className="font-semibold">
                        {t("ZIPCODE")}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-0">
                      <Typography className="font-semibold">
                        {t("LAT")}/{t("LANG")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Fragment>
                    <TableRow
                      className="h-20 cursor-pointer"
                      hover
                      tabIndex={-1}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? lighten(theme.palette.background.default, 0.4)
                            : lighten(theme.palette.background.default, 0.02),
                      }}
                    >
                      <TableCell
                        className="pl-8 py-10"
                        component="th"
                        scope="row"
                      >
                        {props.previewData?.locationAddress?.line1}{" "}
                        {props.previewData?.locationAddress?.line2}
                      </TableCell>
                      <TableCell
                        className="pl-8 py-10"
                        component="th"
                        scope="row"
                      >
                        {props.previewData?.locationAddress?.city}
                      </TableCell>
                      <TableCell
                        className="pl-8 py-10"
                        component="th"
                        scope="row"
                      >
                        {props.previewData?.locationAddress?.state}
                      </TableCell>
                      <TableCell
                        className="pl-8 py-10"
                        component="th"
                        scope="row"
                      >
                        {props.previewData?.locationAddress?.country}
                      </TableCell>
                      <TableCell
                        className="pl-8 py-10"
                        component="th"
                        scope="row"
                      >
                        {props.previewData?.locationAddress?.zipcode}
                      </TableCell>
                      <TableCell className="p-0" component="th" scope="row">
                        <Tooltip
                          title="See on Google Map"
                          enterDelay={300}
                          placement="bottom"
                          arrow
                        >
                          <Typography
                            className="font-semibold"
                            component={"a"}
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/place/${props.previewData?.locationAddress?.latitude},${props.previewData?.locationAddress?.longitude}`,
                                "_blank"
                              )
                            }
                          >
                            {props.previewData?.locationAddress?.latitude},{" "}
                            {props.previewData?.locationAddress?.longitude}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                </TableBody>
              </Table>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
