import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { LoadingView } from "app/shared-components/index";
import { DATETIME_FORMAT_MM_DD_YYYY } from "../../../configs/constants";

export default function UserPreview(props) {
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
          <DialogTitle>Product Detail</DialogTitle>
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
                Name :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Title :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData.title}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Price :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.price}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Description :
              </Typography>
              <Typography
                variant="body1"
                display="inline"
                className="ml-10 uppercase"
              >
                {props.previewData.description}
              </Typography>
            </div>
            {props.previewData?.createdBy && (
              <div>
                <Typography
                  variant="body1"
                  display="inline"
                  className="font-semibold"
                >
                  Created By :
                </Typography>
                <Typography variant="body1" display="inline" className="ml-10">
                  {props.previewData?.createdBy?.name}
                </Typography>
              </div>
            )}
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Created At :
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
                UpdatedAt :
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
                className="font-semibold"
              >
                Quantity :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData.quantity}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold mr-8"
              >
                Status
              </Typography>
              <RecordStatus
                name={
                  props.previewData?.isAvailable ? "Available" : "Unavailable"
                }
              />
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Country :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.country ? props.previewData?.country : "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                State :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.state ? props.previewData?.state : "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                District :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData?.district ? props.previewData?.district : "N/A"}
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
