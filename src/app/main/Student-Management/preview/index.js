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
                First Name :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData.firstName}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Last Name :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10">
                {props.previewData.lastName}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Email :
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10" >
                {props.previewData?.email}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                RollNumber :
              </Typography>
              <Typography
                variant="body1"
                display="inline"
                className="ml-10"
              >
                {props.previewData.rollNumber}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                ClassName :
              </Typography>
              <Typography
                variant="body1"
                display="inline"
                className="ml-10"
              >
                {props.previewData.class}
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
