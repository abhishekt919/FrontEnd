import {
    Grid,
    Select,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
  } from "@mui/material";
  import { Controller, useForm, useFormContext } from "react-hook-form";
  import { useState } from "react";
  import { useParams } from 'react-router-dom';

  const classOptions = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
    { value: '3rd', label: '3rd' },
    { value: '4th', label: '4th' },
    { value: '5th', label: '5th' },
    { value: '6th', label: '6th' },
    { value: '7th', label: '7th' },
    { value: '8th', label: '8th' },
    { value: '9th', label: '9th' },
    { value: '10th', label: '10th' },
    { value: '11th', label: '11th' },
    { value: '12th', label: '12th' },
  ];
  
  function AddForm() {
    const methods = useFormContext();
    const { handleSubmit, setValue } = useForm();
    const { control, formState, getValues } = methods;
    const { errors } = formState;
    const formValues = getValues();
    const param = useParams();
    const [country, setCountry] = useState("");
    const [states, setStates] = useState([]);
    const [state, setState] = useState("");
    const [districts, setDistricts] = useState([]);
  
    // const handleCountryChange = (e) => {
    //   const selectedCountry = e.target.value;
    //   setCountry(selectedCountry);
    //   setStates(Object.keys(countryList[selectedCountry]) || []);
    //   setState("");
    //   setDistricts([]);
    //   setValue("state", ""); // Reset state selection
    //   setValue("district", ""); // Reset district selection
    // };
  
    // const handleStateChange = (e) => {
    //   const selectedState = e.target.value;
    //   setState(selectedState);
    //   setDistricts(countryList[country][selectedState] || []);
    //   setValue("district", ""); // Reset district selection
    // };
  
    return (
      <div className="m-20">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              defaultValue=""
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={"First Name"}
                  variant="outlined"
                  className="mb-16"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  required
                ></TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              defaultValue=""
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={"Last Name"}
                  variant="outlined"
                  className="mb-16"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  required
                ></TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              defaultValue=""
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={"Email"}
                  variant="outlined"
                  className="mb-16"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  required
                ></TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              defaultValue=""
              name="rollNumber"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={"Roll Number"}
                  variant="outlined"
                  className="mb-16"
                  fullWidth
                  error={!!errors.rollNumber}
                  helperText={errors?.rollNumber?.message}
                  required
                ></TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Controller
      control={control}
      defaultValue=""
      name="class"
      render={({ field }) => (
        <TextField
          {...field}
          select
          label="Class"
          variant="outlined"
          className="mb-16"
          fullWidth
          error={!!errors.class}
          helperText={errors?.class?.message}
          required
        >
          {classOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
          </Grid>
        </Grid>
      </div>
    );
  }
  
  export default AddForm;
  