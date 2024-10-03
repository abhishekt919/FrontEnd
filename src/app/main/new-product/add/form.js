import {
  Grid,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function AddForm() {
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
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
                className="mb-16"
                fullWidth
                error={!!errors.title}
                helperText={errors?.title?.message}
                required
              ></TextField>
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
                label={"Price"}
                variant="outlined"
                className="mb-16"
                fullWidth
                error={!!errors.price}
                helperText={errors?.price?.message}
                required
                type="number"
              ></TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Description"}
                variant="outlined"
                className="mb-16"
                fullWidth
                error={!!errors.description}
                helperText={errors?.description?.message}
                required
              ></TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="quantity"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Quantity"}
                variant="outlined"
                className="mb-16"
                fullWidth
                error={!!errors.quantity}
                helperText={errors?.quantity?.message}
                required
                type="number"
              ></TextField>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddForm;
