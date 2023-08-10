import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
  setAlert,
} from "../../app/alertSlice";
import Alert from "./UI/Alert";
import {
  useFetchItemByIdQuery,
  useUpdateItemMutation,
} from "../../app/api/itemsApi";
import { useFetchCategoriesByStoreIdQuery } from "../../app/api/categoriesApi";

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

const StoreItem = () => {
  const { currentColor } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);
  const [editMode, setEditMode] = useState(false);

  const [
    updateItem,
    {
      isSuccess: updateIsSuccess,
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateItemMutation();

  const {
    data: fetchAllData,
    isSuccess: fetchAllIsSuccess,
    isLoading: fetchAllIsLoading,
    isError: fetchAllIsError,
    error: fetchAllError,
    refetch,
  } = useFetchCategoriesByStoreIdQuery();

  const {
    data: fetchItemData,
    isSuccess: fetchItemIsSuccess,
    isLoading: fetchItemIsLoading,
    isError: fetchItemIsError,
    error: fetchItemError,
  } = useFetchItemByIdQuery(itemId, {
    refetchOnMountOrArgChange: updateIsSuccess,
  });

  useEffect(() => {
    if (updateIsSuccess) {
      setEditMode(false);
      dispatch(
        setAlert({
          message: "Item Updated Successfully.",
          type: "success",
          buttonText: "ok",
        })
      );
    } else if (updateIsError) {
      console.log("updateError", updateError);
      setErrorMessage(getErrorString(updateError?.data?.errors));
      dispatch(
        setAlert({
          message: getErrorString(updateError?.data?.errors),
          type: "error",
          buttonText: "ok",
        })
      );
    }
  }, [updateIsSuccess, updateIsError]);

  const [errorMessage, setErrorMessage] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);

  const [previewPhotos, setPreviewPhotos] = useState([]);

  const [itemInfo, setItemInfo] = useState({
    type: "",
    period: "",
    name: "",
    quantity: "",
    price: "",
    details: "",
    max_period: "",
    warranty: "",
    initial_price: "",
    auto_accept: false,
  });

  useEffect(() => {
    if (fetchItemIsSuccess) {
      const itemData = fetchItemData.data;
      setItemInfo(itemData);
      setPreviewPhotos(itemData?.photos);
      setCategories(itemData?.categories);
    }
  }, [fetchItemIsSuccess]);

  const handleInputChanges = (event) => {
    const { name, value, type, checked } = event.target;

    setEditMode(true);

    setItemInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    setEditMode(true);
    const files = e.target.files;
    const previewPhotos = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewPhotos(previewPhotos);
    setPhotos(Array.from(files));
  };

  const handleCategoryChange = (category) => (e) => {
    setEditMode(true);
    const isExist = !!categories.filter((cat) => cat == category.name)[0];

    if (isExist) {
      setCategories(categories.filter((cat) => cat != category.name));
    } else {
      setCategories([...categories, category]);
    }

    console.log(categories, fetchAllData?.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    formData.append("type", itemInfo?.type);
    formData.append("name", itemInfo?.name);
    formData.append("details", itemInfo?.details);
    formData.append("quantity", itemInfo?.quantity);
    formData.append("price", itemInfo?.price);
    // ... Append other form data ...

    const response = await updateItem(formData);
  };

  const cancelHandler = () => {
    setItemInfo(fetchItemData?.data);
    setPreviewPhotos(fetchItemData?.data?.photos);
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Edit Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={itemInfo.name || ""}
            onChange={handleInputChanges}
          />
          <TextField
            fullWidth
            label="Details"
            name="details"
            value={itemInfo.details || ""}
            onChange={handleInputChanges}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={itemInfo.quantity || ""}
              onChange={handleInputChanges}
              startAdornment={
                <InputAdornment position="start">pcs</InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              value={itemInfo.price || ""}
              name="price"
              onChange={handleInputChanges}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
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
            {previewPhotos?.length > 0 && (
              <Box sx={{ display: "flex", mt: 2 }}>
                {previewPhotos.map((photo) => (
                  <img
                    key={photo}
                    src={
                      photo?.includes("/upload")
                        ? `http://127.0.0.1:8000` + photo
                        : photo
                    }
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
                      onChange={handleCategoryChange(category)}
                      checked={
                        !!categories?.filter(
                          (cat) => category.name == cat.name
                        )[0]
                      }
                    />
                  }
                  label={category?.name}
                />
              ))}
            </Box>
            <FormHelperText>{/* Error or helper text */}</FormHelperText>
          </FormGroup>
          {itemInfo.type === "rent" && (
            <>
              <FormControl fullWidth>
                <InputLabel htmlFor="max_period">Max Period</InputLabel>
                <Input
                  id="max_period"
                  name="max_period"
                  type="number"
                  value={itemInfo.max_period || ""}
                  onChange={handleInputChanges}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="warranty">Warranty</InputLabel>
                <Input
                  id="warranty"
                  type="number"
                  name="warranty"
                  value={itemInfo.warranty || ""}
                  onChange={handleInputChanges}
                />
              </FormControl>
            </>
          )}
          {itemInfo.type === "deal" && (
            <>
              <FormControl fullWidth>
                <InputLabel htmlFor="initial_price">Initial Price</InputLabel>
                <Input
                  id="initial_price"
                  type="number"
                  value={itemInfo.initial_price || ""}
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
                  type="datetime-local"
                  name="period"
                  value={itemInfo.period || ""}
                  onChange={handleInputChanges}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo.auto_accept}
                    onChange={handleInputChanges}
                    name="auto_accept"
                  />
                }
                label="Auto Accept"
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
                if (alertType === "success") {
                  navigate(`/items/${itemId}`);
                }
              }}
            />
          )}
          {errorMessage && (
            <p style={{ fontSize: "1rem", fontWeight: "800", color: "red" }}>
              {errorMessage}
            </p>
          )}
          {editMode && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={cancelHandler}
                variant="contained"
                color="error"
                mt={2}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: currentColor }}
                mt={2}
              >
                Update Item
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default StoreItem;
