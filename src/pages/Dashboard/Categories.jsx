import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesByStoreIdQuery,
  useUpdateCategoryMutation,
} from "../../app/api/categoriesApi";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Dashboard";
import { Dna } from "react-loader-spinner";

function Categories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { currentColor } = useSelector((state) => state.ui);

  // Fetch All Categories
  const {
    data: fetchAllData,
    isSuccess: fetchAllIsSuccess,
    isLoading: fetchAllIsLoading,
    isError: fetchAllIsError,
    error: fetchAllError,
    refetch,
  } = useFetchCategoriesByStoreIdQuery();

  // Update Category
  const [
    updateCategory,
    {
      data: updateData,
      isSuccess: updateIsSuccess,
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateCategoryMutation();

  // Add Category
  const [
    createCategory,
    {
      data: createData,
      isSuccess: createIsSuccess,
      isLoading: createIsLoading,
      isError: createIsError,
      error: createError,
    },
  ] = useCreateCategoryMutation();

  // Delete Category
  const [
    deleteCategory,
    {
      data: deleteData,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteCategoryMutation();

  const isLoading =
    fetchAllIsLoading || updateIsLoading || createIsLoading || deleteIsLoading;

  const [addEditDialogOpen, setAddEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); //setCategoryArName
  const [categoryName, setCategoryName] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [updateErrorMessage, setUpdateErrorMessage] = useState("");

  // Error Handling
  useEffect(() => {
    if (fetchAllIsError) {
      if (+fetchAllError?.status === 404) {
        navigate("/not-found");
      } else {
        setErrorMessage(
          fetchAllError?.data?.msg ||
            fetchAllError?.message ||
            fetchAllError?.data?.message
        );
      }
    } else if (updateIsError) {
      setErrorMessage(
        updateError?.data?.msg ||
          updateError?.message ||
          updateError?.data?.message
      );
    } else if (createIsError) {
      setErrorMessage(
        createError?.data?.msg ||
          createError?.message ||
          createError?.data?.message
      );
    } else if (deleteIsError) {
      setErrorMessage(
        deleteError?.data?.msg ||
          deleteError?.message ||
          deleteError?.data?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAllIsError, updateIsError, createIsError, deleteIsError]);

  // For Fetch All Categories
  useEffect(() => {
    if (fetchAllIsSuccess) {
      //dispatch(addCategories(fetchAllData?.data));
    }
  }, [fetchAllIsSuccess]);

  // For Update Category
  useEffect(() => {
    if (updateIsSuccess) {
      //dispatch(updateCategoryDispacth(updateData?.data));
      refetch();
    }
  }, [updateIsSuccess]);

  // For Create Category
  useEffect(() => {
    if (createIsSuccess) {
      //dispatch(addCategory(createData?.data));
      refetch();
    }
  }, [createIsSuccess]);

  // For Delete Category
  useEffect(() => {
    if (deleteIsSuccess) {
      //dispatch(removeCategory(createData?.data?.id));
      refetch();
    }
  }, [deleteIsSuccess]);

  const handleAddEditDialogOpen = () => {
    setAddEditDialogOpen(true);
    setCategoryName("");

    setEditMode(false);
  };

  const handleAddEditDialogClose = () => {
    setAddEditDialogOpen(false);
    setCategoryName("");
    setUpdateErrorMessage("");
    setEditMode(false);
    setEditCategoryId(null);
  };

  const handleDeleteDialogOpen = (categoryId) => {
    setDeleteDialogOpen(true);
    setEditCategoryId(categoryId);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setEditCategoryId(null);
  };

  const handleSaveCategory = async () => {
    if (categoryName.length == "") {
      setUpdateErrorMessage("Name shouldn't be empty .");
      return;
    }

    if (editMode && editCategoryId !== null) {
      // Update category
      const request = {
        restId: +id,
        categoryId: editCategoryId,
        body: {
          name: categoryName,
        },
      };

      const response = await updateCategory(request);
    } else {
      // Add new category
      const body = {
        name: categoryName,
      };

      const response = await createCategory(body);
    }

    handleAddEditDialogClose();
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setCategoryName(categoryName);
    setEditMode(true);
    setEditCategoryId(categoryId);
    setAddEditDialogOpen(true);
    // handleAddEditDialogOpen();
  };

  const handleDeleteCategory = (categoryId) => {
    setEditCategoryId(categoryId);
    handleDeleteDialogOpen(categoryId);
  };

  const handleConfirmDeleteCategory = async () => {
    const response = await deleteCategory(+editCategoryId);
    handleDeleteDialogClose();
  };

  if (isLoading) {
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Inner Pages" title="Categories" />
      <Box
        my={8}
        sx={{
          width: "90%",
          margin: "4rem auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          {user?.name} - Category Management
        </Typography>

        <Box sx={{ width: "100%", textAlign: "end", margin: "1rem 0" }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleAddEditDialogOpen}
            sx={{ backgroundColor: currentColor }}
          >
            Add New Category
          </Button>
        </Box>

        {/* Add/Edit Category Dialog */}
        <Typography variant="h4" sx={{ color: "red" }}>
          {errorMessage}
        </Typography>
        <Dialog open={addEditDialogOpen} onClose={handleAddEditDialogClose}>
          <DialogTitle>
            {editMode ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Category EN Name"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              sx={{ margin: "1rem 0" }}
            />
            <Typography variant="h4" sx={{ color: "red" }}>
              {updateErrorMessage}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddEditDialogClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleSaveCategory} color="success">
              {editMode ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Category Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this category?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleConfirmDeleteCategory} color="error">
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper} mt={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchAllData?.data
                ?.map((category, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{category?.category_id}</TableCell>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleEditCategory(
                            category?.category_id,
                            category?.name
                          )
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleDeleteCategory(category?.category_id)
                        }
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                .reverse()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Categories;
