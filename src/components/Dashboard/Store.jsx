import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStoreById } from "../../app/storesSlice";
import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import {
  useShowStoreQuery,
  useUpdateStoreMutation,
} from "../../app/api/storesApi";

const Store = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const {
    data: storeData,
    isSuccess,
    isError,
    isLoading,
    error: showError,
  } = useShowStoreQuery(storeId);

  const [storeInfo, setStoreInfo] = useState(storeData?.data || {});

  const [isEditing, setIsEditing] = useState(false);
  const [editedStore, setEditedStore] = useState(storeData?.data || {});
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // To store the image preview URL

  useEffect(() => {
    if (isSuccess) {
      setStoreInfo(storeData?.data);
      setEditedStore(storeData?.data);
      setImagePreview(storeData?.data?.image); // Set the image preview URL from store data
    } else if (isError) {
      // Handle error
      if (+showError.status === +422) {
        navigate("/dashboard/not-found");
      }
    }
  }, [isSuccess, isError]);

  return (
    <Box>
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }} variant="h6">
        {editedStore?.store_name} - Info
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "2rem",
        }}
      >
        <Avatar
          alt="Store Image"
          src={imagePreview}
          sx={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <TextField
          label="Name"
          variant="outlined"
          value={editedStore?.store_name || ""}
          InputLabelProps={{ shrink: true }}
          inputProps={{ style: { textAlign: "left" } }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={editedStore?.description || ""}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            style: { textAlign: "left", minHeight: "100px" },
          }}
          multiline
          // rows={4} // You can adjust the number of rows as needed
        />
        <TextField
          label="Location"
          variant="outlined"
          value={editedStore?.location || ""}
          InputLabelProps={{ shrink: true }}
          inputProps={{ style: { textAlign: "left" } }}
          multiline
        />
        <TextField
          label="Address"
          variant="outlined"
          value={editedStore?.address_details || ""}
          InputLabelProps={{ shrink: true }}
          inputProps={{ style: { textAlign: "left" } }}
          multiline
        />
        <TextField
          label="Rate"
          variant="outlined"
          value={editedStore?.rate || 'Undefined'} 
          InputLabelProps={{ shrink: true }}
          inputProps={{ style: { textAlign: "left" } }}
        />
      </Box>
    </Box>
  );
};

export default Store;
