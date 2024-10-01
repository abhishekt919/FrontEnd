import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function AddForm() {
  const methods = useFormContext();
  const { control, setValue, formState } = methods;
  const { errors } = formState;

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
                fullWidth
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
                required
              />
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
                fullWidth
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
                required
              />
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
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="phoneNumber"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Phone Number"}
                variant="outlined"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="image"
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setValue("image", [file]); // Set the file array in react-hook-form
                  field.onChange([file]); // Update field value with the file array
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddForm;
