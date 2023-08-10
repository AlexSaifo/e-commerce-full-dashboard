import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Toolbar,
  PdfExport,
  Edit,
  Inject,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { transactionsGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";

import DataSpinner from "../../components/DataSpinner";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

import ChangeDelivery from "../../components/Dashboard/ChangeDelivery";
import { Box } from "@mui/material";
import {
  useCancleTransactionMutation,
  useFetchMyTransactionsQuery,
  useFetchTransactionsQuery,
} from "../../app/api/transactionsApi";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [transactionsData, setTransactions] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const [
    cancleTransaction,
    {
      isSuccess: cancleTransactionIsSuccess,
      isLoading: cancleTransactionIsLoading,
      isError: cancleTransactionIsError,
      error: cancleTransactionsError,
    },
  ] = useCancleTransactionMutation();

  const {
    data: allTransactions,
    isSuccess: transactionIsSuccess,
    isLoading: transactionIsLoading,
    isError: transactionIsError,
    error: transactionsError,
    refetch: adminRefetch,
  } = useFetchTransactionsQuery(
    {},
    {
      skip: user.role_id > 2 ? true : false,
    }
  );

  const {
    data: allMyTransactions,
    isSuccess: myTransactionIsSuccess,
    isLoading: myTransactionIsLoading,
    isError: myTransactionIsError,
    error: myTransactionsError,
    refetch,
  } = useFetchMyTransactionsQuery(
    {},
    {
      skip: user.role_id > 2 ? false : true,
    }
  );

  useEffect(() => {
    if (transactionIsSuccess) {
      setTransactions(allTransactions?.data?.transactions);
    }
    if (myTransactionIsSuccess) {
      setTransactions(allMyTransactions?.data?.transactions);
    }
  }, [transactionIsSuccess, myTransactionIsSuccess]);

  useEffect(() => {
    if (cancleTransactionIsSuccess) {
      if (user.role_id < 3) {
        adminRefetch();
      } else {
        refetch();
      }
    }
  }, [cancleTransactionIsSuccess]);

  const showSpinner = myTransactionIsLoading || transactionIsLoading;

  const DeleteButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <MdDeleteOutline className="w-5 h-5 m-2" />
      <span>Cancle</span>
    </button>
  );
  const gridRef = useRef(null);

  const toolbarOptions = ["PdfExport", "ExcelExport"];
  if (user.role_id > 2) {
    toolbarOptions.push({ id: "Delete", template: DeleteButton });
  }
  const toolbarClick = async (args) => {
    console.log(args.item, gridRef.current);
    if (gridRef.current && args.item.id?.includes("pdfexport")) {
      gridRef?.current?.pdfExport();
    } else if (gridRef.current && args.item.id.includes("excelexport")) {
      gridRef.current.excelExport();
    } else if (
      // strat delete
      gridRef.current?.getSelectedRecords()[0] &&
      args?.item?.id?.includes("Delete")
    ) {
      console.log(gridRef.current?.getSelectedRecords());
      const selectedRecords = gridRef.current?.getSelectedRecords();
      if (
        selectedRecords[0].transaction_status == "pending" &&
        selectedRecords[0].transactions_type == "recieve cash"
      ) {
        const response = await cancleTransaction({
          transaction_id: selectedRecords[0]?.transaction_id,
        });
      }
      // end delete
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Pages" title="Transactions" />
      <DataSpinner showSpinner={showSpinner} />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          margin: "1rem 0",
        }}
      ></Box>

      {!showSpinner && (
        <GridComponent
          ref={gridRef}
          id="grid"
          dataSource={transactionsData}
          toolbar={toolbarOptions}
          allowPdfExport={true}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
          editSettings={{ allowDeleting: true }}
        >
          <ColumnsDirective>
            {transactionsGrid.map((item, idx) => (
              <ColumnDirective key={idx} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Toolbar,
              Sort,
              ContextMenu,
              Filter,
              Page,
              Edit,
              PdfExport,
              ExcelExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default Transactions;
