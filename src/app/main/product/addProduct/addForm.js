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
import { useParams } from "react-router-dom";

const countryList = {
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Florida: ["Miami", "Orlando"],
    NewYork: ["New York City", "Buffalo"],
  },
  Canada: {
    Alberta: ["Calgary", "Edmonton"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
  },
  India: {
    Delhi: ["Central Delhi", "South Delhi"],
    Punjab: ["Mohali", " Ropar", "Hoshiarpur"],
    "Himachal Pradesh": ["Mandi", "Shimla", "Una", "Kullu"],
  },
};

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

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setStates(Object.keys(countryList[selectedCountry]) || []);
    setState("");
    setDistricts([]);
    setValue("state", ""); // Reset state selection
    setValue("district", ""); // Reset district selection
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setDistricts(countryList[country][selectedState] || []);
    setValue("district", ""); // Reset district selection
  };

  return (
    <div className="m-20">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue=""
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                label={"Name"}
                variant="outlined"
                className="mb-16"
                fullWidth
                error={!!errors.name}
                helperText={errors?.name?.message}
                required
              ></TextField>
            )}
          />
        </Grid>
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="country">Country</InputLabel>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="country"
                  value={country}
                  error={!!errors.country}
                  helperText={errors?.country?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCountryChange(e);
                  }}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>Select a country</em>
                  </MenuItem>
                  {Object.keys(countryList).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="state">State</InputLabel>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="state"
                  value={state}
                  error={!!errors.state}
                  helperText={errors?.state?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleStateChange(e);
                  }}
                  label="State"
                  disabled={!country}
                >
                  <MenuItem value="">
                    <em>Select a state</em>
                  </MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="district">District</InputLabel>
            <Controller
              name="district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="district"
                  value={field.value}
                  onChange={field.onChange}
                  label="District"
                  error={!!errors.district}
                  helperText={errors?.district?.message}
                  disabled={!state}
                >
                  <MenuItem value="">
                    <em>Select a district</em>
                  </MenuItem>
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddForm;
