import { Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useTheme } from "@mui/material/styles";
import {Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { createContact } from "./../store/contactSlice";
import { showMessage } from "app/store/fuse/messageSlice";


function AddHeader(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  // Watch all necessary fields to ensure button enabling/disabling works as expected
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const phoneNumber = watch("phoneNumber");
  const image = watch("image");

  const handleCreateRecord = () => {
    let inputJson = getValues(); // Fetch form values

    // Access the file object from the form input
    const imageFile = inputJson.image[0]; // Assuming 'image' is correctly registered with react-hook-form

    // Create a FormData object to handle file and other input data
    const formData = new FormData();
    formData.append("firstName", inputJson.firstName);
    formData.append("lastName", inputJson.lastName);
    formData.append("email", inputJson.email);
    formData.append("phoneNumber", inputJson.phoneNumber);

    // Append the image file if it exists
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Function to send data to the backend (replace with your specific function)
    addUpdateContact(formData, "ADD");
  };

  function addUpdateContact(inputData, type) {
    dispatch(createContact(inputData)).then((result) => {
      const payload = result.payload;
      if (payload && payload.messageId === 200) {
        dispatch(showMessage({ message: result.payload.message }));
        navigate("/contact");
      } else if (payload) {
        dispatch(
          showMessage({
            message: "Email or PhoneNumber already exists",
            variant: "error",
          })
        );
      } else {
        dispatch(
          showMessage({ message: "An unexpected error occurred", variant: "error" })
        );
      }
    });
  }

  // Check if all fields are valid and not empty to enable the button
  const isButtonEnabled =
    isValid &&
    (firstName && lastName && email && phoneNumber && image);

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
            to="/contact"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Contact</span>
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
              Contact
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
              // disabled={!isButtonEnabled}
              onClick={handleCreateRecord}
            >
              Add Contact
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default AddHeader;
