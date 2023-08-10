import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesByStoreIdQuery } from "../../app/api/categoriesApi";
import { useCreateItemMutation } from "../../app/api/itemsApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
  setAlert,
} from "../../app/alertSlice";
import Alert from "./UI/Alert";

const getErrorString = (errors) => {
  let errorString = "";
  Object.keys(errors).forEach((key) => {
    if (typeof errors[key] === "object") {
      // For nested errors
      Object.values(errors[key]).forEach((nestedError) => {
        errorString += `${nestedError}\n`;
      });
    } else {
      // For simple errors
      errorString += `${errors[key]}\n`;
    }
  });
  return errorString;
};

const CreateNewItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { user_id } = user;

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const [
    createItem,
    {
      isSuccess: createIsSuccess,
      isLoading: createIsLoading,
      isError: createIsError,
      error: createError,
    },
  ] = useCreateItemMutation();

  const {
    data: fetchAllData,
    isSuccess: fetchAllIsSuccess,
    isLoading: fetchAllIsLoading,
    isError: fetchAllIsError,
    error: fetchAllError,
    refetch,
  } = useFetchCategoriesByStoreIdQuery();

  useEffect(() => {
    if (createIsSuccess) {
      dispatch(
        setAlert({
          message: "Item Added Successfully .",
          type: "success",
          buttonText: "ok",
        })
      );
    } else if (createIsError) {
      console.log("createError", createError);
      setErrorMessage(getErrorString(createError?.data?.errors));
      dispatch(
        setAlert({
          message: getErrorString(createError?.data?.errors),
          type: "error",
          buttonText: "ok",
        })
      );
    }
  }, [createIsSuccess, createIsError]);

  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState({
    "Furniture and decor": false,
    // Add more categories here if needed
  });

  const [previewPhotos, setPreviewPhotos] = useState([]);

  const [itemInfo, setItemInfo] = useState({
    type: "sell",
    period: "00:00:00",
    name: "",
    quantity: "",
    price: "",
    details: "",
  });

  const handleInputChanges = (event) => {
    const { name, value } = event.target;

    setItemInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const previewPhotos = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewPhotos(previewPhotos);
    setPhotos(Array.from(files));
  };

  const handleCategoryChange = (category) => (e) => {
    setCategories({ ...categories, [category]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can create the FormData object and append the form data
    setErrorMessage("");

    if (!itemInfo?.type) {
      setErrorMessage("You should Select the type .");
      return;
    }
    if (!itemInfo?.name) {
      setErrorMessage("The Name shouldn't be empty .");
      return;
    }
    if (!itemInfo?.details) {
      setErrorMessage("The Details shouldn't be empty .");
      return;
    }
    if (!itemInfo?.quantity) {
      setErrorMessage("The Quantity shouldn't be empty .");
      return;
    }
    if (!photos[0]) {
      setErrorMessage("The Photo shouldn't be empty .");
      return;
    }
    if (!Object.entries(categories)[0]) {
      setErrorMessage("The Categories shouldn't be empty .");
      return;
    }

    if (itemInfo.type != "deal") {
      if (!itemInfo.price) {
        setErrorMessage("The Price shouldn't be empty .");
        return;
      }
    }

    if (itemInfo.type == "rent") {
      if (!itemInfo.max_period) {
        setErrorMessage("The Max Period shouldn't be empty .");
        return;
      }
      if (!itemInfo.warranty) {
        setErrorMessage("The Warranty shouldn't be empty .");
        return;
      }
    }

    if (itemInfo.type == "deal") {
      if (!itemInfo.initial_price) {
        setErrorMessage("The Initial Price shouldn't be empty .");
        return;
      }
      if (!itemInfo.auto_accept) {
        setErrorMessage("The Auto Accept shouldn't be empty .");
        return;
      }

      itemInfo.auto_accept = itemInfo.auto_accept ? 1 : 0;

      if (!itemInfo.period) {
        setErrorMessage("The Period shouldn't be empty .");
        return;
      }
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("type", itemInfo?.type);
    formData.append("name", itemInfo?.name);
    formData.append("details", itemInfo?.details);
    formData.append("quantity", itemInfo?.quantity);
    formData.append("max_period", itemInfo?.max_period);
    formData.append("auto_accept", itemInfo?.auto_accept);
    formData.append("warranty", itemInfo?.warranty);
    formData.append("price", itemInfo?.price);
    formData.append("period", itemInfo?.period);
    photos?.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });
    Object.entries(categories)?.forEach(([category, isChecked], idx) => {
      if (isChecked) {
        formData.append(`categories[${idx}]`, category);
      }
    });

    const response = await createItem(formData);
  };

  if (createIsLoading || fetchAllIsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "70vh",
        }}
      >
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Create New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={itemInfo.name}
            onChange={handleInputChanges}
          />
          <TextField
            fullWidth
            label="Details"
            name="details"
            value={itemInfo.details}
            onChange={handleInputChanges}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={itemInfo.quantity}
              onChange={handleInputChanges}
              startAdornment={
                <InputAdornment position="start">pcs</InputAdornment>
              }
            />
          </FormControl>
          {itemInfo.type != "deal" && (
            <FormControl fullWidth>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                type="number"
                value={itemInfo.price}
                name="price"
                onChange={handleInputChanges}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="photo-upload">Photos</InputLabel>
            <input
              id="photo-upload"
              type="file"
              multiple
              onChange={handlePhotoChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="photo-upload">
              <IconButton
                color="primary"
                aria-label="upload photos"
                component="span"
              >
                <CloudUploadIcon />
              </IconButton>
            </label>
            {previewPhotos.length > 0 && (
              <Box sx={{ display: "flex", mt: 2 }}>
                {previewPhotos.map((photo) => (
                  <img
                    key={photo}
                    src={photo}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                    }}
                  />
                ))}
              </Box>
            )}
          </FormControl>
          <FormGroup sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Categories:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {fetchAllData?.data?.map((category) => (
                <FormControlLabel
                  key={category?.category_id}
                  control={
                    <Checkbox
                      onChange={handleCategoryChange(category?.category_id)}
                    />
                  }
                  label={category?.name}
                />
              ))}
            </Box>
            <FormHelperText>
              {/* Show error message or any additional helper text */}
            </FormHelperText>
          </FormGroup>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={itemInfo.type}
              name="type"
              onChange={handleInputChanges}
            >
              <MenuItem value="sell">Sell</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="deal">Deal</MenuItem>
            </Select>
          </FormControl>

          {itemInfo.type == "rent" && (
            <>
              <FormControl fullWidth>
                <InputLabel htmlFor="max_period">Max Period</InputLabel>
                <Input
                  id="max_period"
                  name="max_period"
                  type="number"
                  value={itemInfo.max_period}
                  onChange={handleInputChanges}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="warranty">Warranty</InputLabel>
                <Input
                  id="warranty"
                  type="number"
                  name="warranty"
                  value={itemInfo.warranty}
                  onChange={handleInputChanges}
                />
              </FormControl>
            </>
          )}

          {itemInfo.type == "deal" && (
            <>
              <FormControl fullWidth>
                <InputLabel htmlFor="initial_price">Initial Price</InputLabel>
                <Input
                  id="initial_price"
                  type="number"
                  value={itemInfo.initial_price}
                  name="initial_price"
                  onChange={handleInputChanges}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="period">Period</InputLabel>
                <Input
                  id="period"
                  type="date"
                  name="period"
                  value={itemInfo.period}
                  onChange={handleInputChanges}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo.auto_accept}
                    onChange={handleInputChanges}
                  />
                }
                label="Auto Accept"
                name="auto_accept"
              />
            </>
          )}
        </Box>
        <Box sx={{ margin: "2rem 0" }}>
          {alertAddMessage && (
            <Alert
              type={alertType}
              message={alertAddMessage}
              buttonText={alertButtonText}
              onClose={() => {
                if(alertType == 'success'){
                  window.location.reload();
                }
              }}
            />
          )}
          {errorMessage && (
            <p style={{ fontSize: "1rem", fontWeight: "800", color: "red" }}>
              {errorMessage}
            </p>
          )}
          <Button type="submit" variant="contained" color="primary" mt={2}>
            Create Item
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateNewItem;
