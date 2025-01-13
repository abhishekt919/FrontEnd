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
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Title"}
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors?.title?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
  <Controller
    control={control}
    defaultValue=""
    name="date"
    rules={{
      required: "Date is required",
    }}
    render={({ field }) => (
      <TextField
        {...field}
        type="date" // Use "date" type for date input
        label="Date"
        variant="outlined"
        fullWidth
        error={!!errors.date}
        helperText={errors?.date?.message}
        InputLabelProps={{
          shrink: true, // Ensures the label stays visible above the field
        }}
        required
      />
    )}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <Controller
    control={control}
    defaultValue=""
    name="time"
    rules={{
      required: "Time is required",
    }}
    render={({ field }) => (
      <TextField
        {...field}
        type="time" // Use "time" type for time input
        label="Time"
        variant="outlined"
        fullWidth
        error={!!errors.time}
        helperText={errors?.time?.message}
        InputLabelProps={{
          shrink: true, // Ensures the label stays visible above the field
        }}
        required
      />
    )}
  />
</Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="venue"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Venue"}
                variant="outlined"
                fullWidth
                error={!!errors.venue}
                helperText={errors?.venue?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="price"
            render={({ field }) => (
              <TextField
                {...field}
                label={"price"}
                variant="outlined"
                fullWidth
                error={!!errors.price}
                helperText={errors?.price?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="totalSeats"
            render={({ field }) => (
              <TextField
                {...field}
                label={"totalSeats"}
                variant="outlined"
                fullWidth
                error={!!errors.totalSeats}
                helperText={errors?.totalSeats?.message}
                required
              />
            )}
          />
        </Grid>
      
      </Grid>
    </div>
  );
}

export default AddForm;
