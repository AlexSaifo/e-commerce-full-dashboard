import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Edit,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  Resize,
  Selection,
  Sort,
  Toolbar,
  PdfExport,
} from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteItemMutation,
  useFetchItemsByStoreIdQuery,
} from "../../app/api/itemsApi";
import { Dna } from "react-loader-spinner";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
  setAlert,
} from "../../app/alertSlice";
import Alert from "./UI/Alert";
import { itemsGrid } from "../../data/dummy";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import DataSpinner from "../DataSpinner";

const StoreItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { store_id } = user.store; 
  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);
  const { currentColor } = useSelector((state) => state.ui);
  const [filterType, setFilterType] = useState("sell");

  const [
    deleteItem,
    {
      data: deleteItemsData,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteItemMutation();

  const {
    data: fetchItemsData,
    isSuccess: fetchIsSuccess,
    isError: fetchIsError,
    isLoading: fetchIsLoading,
    error: fetchError,
    refetch: fetchRefetch,
  } = useFetchItemsByStoreIdQuery(
    {
      type: filterType,
      storeId: store_id,
    },
    {
      refetchOnMountOrArgChange: filterType,
    }
  );

  const [itemsData, setItemsData] = useState([]);
  const showSpinner = fetchIsLoading || deleteIsLoading;

  useEffect(() => {
    if (fetchIsSuccess) {

      setItemsData(fetchItemsData?.data?.items);
    } else if (fetchIsError) {
      dispatch(
        setAlert({
          message: fetchError?.data.errors.errors,
          type: "error",
          buttonText: "ok",
        })
      );
    }
  }, [fetchIsSuccess, fetchIsError]);

  useEffect(()=>{
    if(deleteIsSuccess){
        fetchRefetch();
    }
  } , [deleteIsSuccess])

  const [isDelete, setIsDelete] = useState(true);
  const ShowButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <BiShow className="w-5 h-5 m-2" />
      <span>Show</span>
    </button>
  );

  const DeleteButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <MdDeleteOutline className="w-5 h-5 m-2" />
      <span>Delete</span>
    </button>
  );
  const gridRef = useRef(null);
  const toolbarOptions = [
    { id: "Delete", template: DeleteButton },
    "PdfExport",
    "ExcelExport",
    { id: "Show", template: ShowButton },
  ];
  const toolbarClick = async (args) => {
    console.log(args.item, gridRef.current);
    if (gridRef.current && args.item.id?.includes("pdfexport")) {
      gridRef?.current?.pdfExport();
    } else if (gridRef.current && args.item.id.includes("excelexport")) {
      gridRef.current.excelExport();
    } else if ( // strat delete
      gridRef.current?.getSelectedRecords()[0] &&
      args?.item?.id?.includes("Delete")
    ) {
        console.log(gridRef.current?.getSelectedRecords());
      const selectedRecords = gridRef.current?.getSelectedRecords();
       const response = await deleteItem(selectedRecords[0]?.item_id);
      // end delete
    } else if (
      gridRef.current.getSelectedRecords() &&
      args.item.id.includes("Show")
    ) {
      const item = gridRef.current.getSelectedRecords();
      if (item[0]) {
        const id = item[0].item_id;
        navigate(`/dashboard/items/${id}/show`);
      }
    }
  };

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "success") {
      fetchRefetch();
    }
    return;
  };

  if (showSpinner) {
    return (
      <DataSpinner showSpinner={true} />
    );
  } 

  return (
    <>
      {alertAddMessage && (
        <Alert
          type={alertType}
          message={alertAddMessage}
          buttonText={alertButtonText}
          onClose={onCloseAlertRemoveHandler}
        />
      )}
      <Typography variant="h6" fontWeight="bold" mb={4}>
        {user?.store.store_name} - Items Management
      </Typography>

      <Box
        sx={{
          width: "100%",
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: 120, marginBottom: "1rem" }}>
          <InputLabel id="filter-type-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-type-label"
            id="filter-type-select"
            value={filterType}
            label="Filter by Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem selected value="sell">
              Sell
            </MenuItem>
            <MenuItem value="rent">Rent</MenuItem>
            <MenuItem value="deal">Deal</MenuItem>
          </Select>
        </FormControl>
        <Button
          bgColor={currentColor}
          color="white"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="1.2rem"
          text="Add New Item"
          width="auto"
          customFunc={() => {
            navigate("/dashboard/items/add");
          }}
          className="active:scale-95"
          isValid={false}
        />
      </Box>

      <GridComponent
        ref={gridRef}
        //id="grid"
        dataSource={fetchItemsData?.data?.items || []}
        toolbar={toolbarOptions}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={true}
        allowResizing={true}
        editSettings={{ allowDeleting: true }}
        pageSettings={{ pageSize: 10 }}
        allowPdfExport={true}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          {itemsGrid.map((item, idx) => (
            <ColumnDirective key={idx} {...item} />
          ))}
        </ColumnsDirective>

        <Inject
          services={[
            Resize,
            Toolbar,
            Sort,
            Filter,
            Page,
            Edit,
            PdfExport,
            Selection,
            ExcelExport,
          ]}
        />
      </GridComponent>
    </>
  );
};

export default StoreItems;
