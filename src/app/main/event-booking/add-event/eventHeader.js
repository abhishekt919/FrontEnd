import { Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { createEvents } from "./../store/eventSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { getEvents } from "./../store/eventSlice";

function AddHeader(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  // Watch all necessary fields to ensure button enabling/disabling works as expected
  const title = watch("title");
  const date = watch("date");
  const time = watch("time");
  const totalSeats = watch("totalSeats");
  const venue = watch("venue");
  const price = watch("price");

  const handleCreateRecord = () => {
    let inputJson = getValues(); // Fetch form values

    // Access the file object from the form input
    // const imageFile = inputJson.image[0]; // Assuming 'image' is correctly registered with react-hook-form

    // Create a FormData object to handle file and other input data
    const payload = {
      title: inputJson.title,
      date: inputJson.date,
      time: inputJson.time,
      totalSeats: inputJson.totalSeats,
      venue: inputJson.venue,
      price: inputJson.price,
    };

    addUpdateEvent(payload, "ADD");
    navigate("/event", { replace: true });
    dispatch(getEvents());
    console.log("Form Data:", payload);
  };

  function addUpdateEvent(inputData, type) {
    dispatch(createEvents(inputData)).then((result) => {
      const payload = result.payload;

      if (payload && payload.messageId === 200) {
        dispatch(
          showMessage({ message: result.payload.message, variant: "success" })
        );
      } else {
        dispatch(
          showMessage({
            message: payload?.message || "An unexpected error occurred",
          })
        );
      }
    });
  }

  // Check if all fields are valid and not empty to enable the button
  const isButtonEnabled =
    isValid && title && date && time && venue && price && totalSeats;

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="link"
            to="/event"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Event</span>
          </Typography>
        </motion.div>
        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography
              variant="caption"
              className="text-16 sm:text-20 truncate font-semibold"
            >
              Create Event
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {!props.previewRecord && (
          <>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              disabled={!isButtonEnabled}
              onClick={handleCreateRecord}
            >
              Add Event
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default AddHeader;
