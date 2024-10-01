import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { LoadingView } from "app/shared-components/index";
import { DATETIME_FORMAT_MM_DD_YYYY } from "../../../configs/constants";

export default function UserPreview(props) {
  if (!props.previewData) {
    return <LoadingView />;
  }

  // Function to extract initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

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
          <DialogTitle>Contact Detail</DialogTitle>
          <DialogActions sx={{ paddingRight: "16px" }}>
            <Button onClick={props.closeModal} color="error">
              <CloseIcon />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent dividers>
          <Grid container spacing={3} className="w-full">
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {props.previewData.image ? (
                  <img
                    src={`http://localhost:4000/uploads/${props.previewData.image}`}
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      fontSize: "48px",
                      backgroundColor: "#1976d2",
                    }}
                  >          
                  </Avatar>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    First Name:
                  </Typography>
                  <Typography variant="body1">
                    {props.previewData.firstName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    Last Name:
                  </Typography>
                  <Typography variant="body1">
                    {props.previewData.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    Email:
                  </Typography>
                  <Typography variant="body1">
                    {props.previewData.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    Phone:
                  </Typography>
                  <Typography variant="body1">
                    {props.previewData.phoneNumber}
                  </Typography>
                </Grid>

                {props.previewData?.createdBy && (
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1" className="font-semibold">
                      Created By:
                    </Typography>
                    <Typography variant="body1">
                      {props.previewData.createdBy.name}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    Created At:
                  </Typography>
                  <Typography variant="body1">
                    {moment(props.previewData.createdAt).format(
                      DATETIME_FORMAT_MM_DD_YYYY
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" className="font-semibold">
                    Updated At:
                  </Typography>
                  <Typography variant="body1">
                    {moment(props.previewData.updatedAt).format(
                      DATETIME_FORMAT_MM_DD_YYYY
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
