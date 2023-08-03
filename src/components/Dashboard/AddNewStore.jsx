import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  Alert,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import {
  useFetchCitiesQuery,
  useFetchStateByIDQuery,
  useFetchStreetByIdQuery,
} from "../../app/api/locationApi";
import { useAddNewStoreMutation } from "../../app/api/storesApi";
import { useEffect } from "react";

function AddNewStore() {
  const { currentColor } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    store_name: "",
    email: "",
    password: "",
    c_password: "",
    phone_number: "",
    language: "en",
    city_id: "",
    state_id: "",
    street_id: "",
    photo: "",
    language: "en",
  });

  const [addStore, { isLoading, isError, isSuccess, error: AddError }] =
    useAddNewStoreMutation();
  // Fetch all Cities
  const { data: cities } = useFetchCitiesQuery();
  // Fetch state by city id
  const { data: cityStateData } = useFetchStateByIDQuery(storeInfo.city_id, {
    skip: !!!storeInfo.city_id,
  });
  // Fetch street by state id
  const { data: stateStreetData } = useFetchStreetByIdQuery(
    storeInfo.state_id,
    {
      skip: !!!storeInfo.state_id,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/stores");
    }
  }, [isSuccess]);

  const handleInputChanges = (event) => {
    const { name, value } = event.target;

    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setStoreInfo((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleCityChange = (event) => {
    const { value } = event.target;

    setStoreInfo((prev) => ({
      ...prev,
      city_id: value,
      state_id: "", // Reset the state value when changing city
      street_id: "", // Reset the street value when changing city
    }));
  };

  const handleStateChange = (event) => {
    const { value } = event.target;

    setStoreInfo((prev) => ({
      ...prev,
      state_id: value,
      street_id: "", // Reset the street value when changing state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !storeInfo.name ||
      !storeInfo.email ||
      !storeInfo.password ||
      !storeInfo.c_password
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (storeInfo.password !== storeInfo.c_password) {
      setErrorMessage("Passwords do not match.");

      return;
    }

    if (!storeInfo.city_id) {
      setErrorMessage("Please select a city.");
      return;
    }

    if (!storeInfo.state_id) {
      setErrorMessage("Please select a state.");
      return;
    }

    if (!storeInfo.street_id) {
      setErrorMessage("Please select a street.");
      return;
    }

    var formdata = new FormData();
    formdata.append("name", storeInfo.name);
    formdata.append("email", storeInfo.email);
    formdata.append("password", storeInfo.password);
    formdata.append("c_password", storeInfo.c_password);
    formdata.append("phone_number", storeInfo.phone_number);
    formdata.append("street_id", storeInfo.state_id);
    formdata.append("language", storeInfo.language);
    formdata.append("store_name", storeInfo.store_name);
    formdata.append("photo", storeInfo.photo);

    const response = await addStore(formdata);
  };

  useEffect(() => {
    if (isError) {
      setErrorMessage(AddError?.data?.message);
    }
  }, [isError]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={8}>
      <Typography variant="h6" fontWeight="bold" mb={4}>
        Add New Store
      </Typography>
      <form onSubmit={handleSubmit} className="w-80">
        <Box
          mb={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {storeInfo.photo ? (
            <Avatar
              alt="Selected Photo"
              src={URL.createObjectURL(storeInfo.photo)}
              sx={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          ) : (
            <Box
              sx={{
                width: "200px",
                height: "200px",
                backgroundColor: "#f0f0f0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No Photo
              </Typography>
            </Box>
          )}
          <label htmlFor="photo">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: currentColor,
                color: "white",
                "&:hover": {
                  backgroundColor: "light-gray",
                },
                borderRadius: "1rem",
                p: 1.5,
                margin: "1rem",
              }}
            >
              Choose
            </Button>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TextField
            label="Owner Name"
            name="name"
            variant="outlined"
            value={storeInfo?.name}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={storeInfo?.email}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />
          <TextField
            label="Store Name"
            name="store_name"
            variant="outlined"
            value={storeInfo?.store_name}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            value={storeInfo?.password}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            name="c_password"
            type="password"
            value={storeInfo?.c_password}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />

          <TextField
            label="Phone Number"
            name="phone_number"
            variant="outlined"
            value={storeInfo?.phone_number}
            onChange={handleInputChanges}
            fullWidth
            mb={4}
          />
          <InputLabel htmlFor="city_id">City</InputLabel>
          <Select
            label="City"
            value={storeInfo?.city_id}
            onChange={handleCityChange}
            name="city_id"
            fullWidth
            mb={4}
          >
            <MenuItem value="">Select City</MenuItem>
            {cities?.data?.map((city) => (
              <MenuItem key={city.city_id} value={city.city_id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel htmlFor="state_id">State</InputLabel>
          <Select
            label="State"
            value={storeInfo?.state_id}
            onChange={handleStateChange}
            name="state_id"
            fullWidth
            mb={4}
            disabled={!storeInfo.city_id} // Disable the state dropdown until city is selected
          >
            <MenuItem value="">Select State</MenuItem>
            {cityStateData?.data?.map((state) => (
              <MenuItem key={state.state_id} value={state.state_id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel htmlFor="street_id">Street</InputLabel>
          <Select
            label="Street"
            value={storeInfo?.street_id}
            onChange={handleInputChanges}
            name="street_id"
            fullWidth
            mb={4}
            disabled={!storeInfo.state_id} // Disable the street dropdown until state is selected
          >
            <MenuItem value="">Select Street</MenuItem>
            {stateStreetData?.data?.map((street) => (
              <MenuItem key={street.street_id} value={street.street_id}>
                {street.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {
          <Typography sx={{ fontSize: "1rem", fontWeight: "600" , color:'red' , margin:'1rem 0'}} variant="p">
            {errorMessage}
          </Typography>
        }
        <Box sx={{ width: "100%", textAlign: "end" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "1rem",
              p: 1,
              "&:hover": {
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
              },
              margin: "1rem 0",
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#fff" loading={isLoading} />
            ) : (
              "Add Store"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddNewStore;
