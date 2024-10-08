import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingView } from "app/shared-components/index";

export default function PreviewPage(props) {
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
          <DialogTitle>MACHINE_DETAILS</DialogTitle>
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
                ProductID
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.productId}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Title
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.title}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Price
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.price}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Descriptions
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.description}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Status
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                <Chip
                  label={
                    props.previewData.isVerified
                      ? "VERIFIED"
                      : props.previewData.status === "available"
                      ? "AVAILABLE"
                      : props.previewData.status === "unavailable"
                      ? "UNAVAILABLE"
                      : props.previewData.status === "low stock"
                      ? "LOW STOCK"
                      : "UNVERIFIED"
                  }
                  color={
                    props.previewData.isVerified
                      ? "success"
                      : props.previewData.status === "available"
                      ? "success"
                      : props.previewData.status === "unavailable"
                      ? "error"
                      : props.previewData.status === "low stock"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                />
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                display="inline"
                className="font-semibold"
              >
                Quantity
              </Typography>
              <Typography variant="body1" display="inline" className="ml-10 ">
                {props.previewData?.quantity}
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
