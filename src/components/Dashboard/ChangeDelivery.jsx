import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
  setAlert,
  clearAlert,
} from "../../app/alertSlice";
import { addEmployee as addNewEmployeeDispatch } from "../../app/employeesSlice";
import Button from "./Button";
import Alert from "./UI/Alert";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import { useAddNewEmployeeMutation } from "../../app/api/employeesApi";

function ChangeDelivery() {
  const dispatch = useDispatch();

  const [addNewEmployee, { isSuccess, isLoading, isError, error: addError }] =
    useAddNewEmployeeMutation();

  const [errorsMessage, setErrorsMessage] = useState(
    addError?.data?.errors?.email || null
  );

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);
  const { currentColor } = useSelector((state) => state.ui);

  const [hideNewEmployee, setHideNewEmployee] = useState(false);
  const [email, setEmail] = useState("");
  const [order_id, setOrder_id] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    if (isError) {
      setErrorsMessage(
        addError?.data?.errors?.email || addError?.data?.errors?.error
      );
    } else if (isSuccess) {
      dispatch(
        setAlert({
          message: "The Employee Added successfully",
          type: "success",
          buttonText: "Ok",
        })
      );
    }
  }, [isError, isSuccess]);
  console.log(isSuccess, isLoading, isError, addError, errorsMessage);

  const closeBackDrop = () => {
    setHideNewEmployee(false);
    setEmail("");
    setIsValid(true);
  };

  const handleSubmit = (event) => {
    setIsValid(true);

    let { name, value } = event.target;

    

    if (name == "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const testValue = emailRegex.test(value);
      setEmail(value);

      if (testValue) {
        setIsValid(false);
      }
    }
    if (name == "order_id") {
      if (value != "") {
        setOrder_id(value);
        setIsValid(false);
      }
    }

  };

  const addNewEmployeeHandler = () => {
    const inputValue = email;
    if (!isValid) {
      addNewEmployee({
        email: email,
      });
    }
  };

  const onCloseAlertAddHandler = () => {
    // if (
    //   alertType === "info" ||
    //   alertType === "error" ||
    //   alertType === "pending"
    // ) {
    //   return;
    // } else if (alertType === "success") {
    //   window.location.reload();
    // }
    return;
  };

  useEffect(() => {
    if (alertType === "success" && isAdd) {
      closeBackDrop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertType]);

  if (isError && errorsMessage) {
    return (
      <Alert
        type={"error"}
        message={errorsMessage}
        buttonText={"Ok"}
        onClose={() => {
          setErrorsMessage(null);
          setIsValid(true);
        }}
      />
    );
  }

  if (isLoading) {
    return <Alert type={"pending"} message={"pending"} buttonText={""} />;
  }

  if (isSuccess && alertAddMessage) {
    return (
      <Alert
        type={alertType}
        message={alertAddMessage}
        buttonText={alertButtonText}
        onClose={() => {
          setErrorsMessage("");
          dispatch(addNewEmployeeDispatch());
          dispatch(clearAlert);
          closeBackDrop();
        }}
      />
    );
  }

  return (
    <>
      <Button
        bgColor={currentColor}
        color="white"
        bgHoverColor="light-gray"
        size="xl"
        borderRadius="1.2rem"
        text="Change Order's Delivery"
        width="auto"
        customFunc={() => {
          setHideNewEmployee(true);
          setIsAdd(true);
        }}
        className="active:scale-95"
        isValid={false}
      />
      {hideNewEmployee && (
        <Modal
          onClose={closeBackDrop}
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg"
        >
          <Input
            className="flex flex-col justify-center items-center gap-4 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-full"
            input={{
              id: "order_id",
              type: "text",
              name: "order_id",
              placeholder: "Order ID",
              className: "dark:text-gray-200 p-2 w-3/4",
              style: {
                fontSize: "1.5rem",
              },
              onChange: handleSubmit,
            }}
            label={{
              labelName: "Order's Id",
              className: "text-2xl font-bold dark:text-gray-200",
            }}
          />
          <Input
            className="flex flex-col justify-center items-center gap-4 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-full"
            input={{
              id: "email",
              type: "text",
              name: "email",
              placeholder: "his Email",
              className: "dark:text-gray-200 p-2 w-3/4",
              style: {
                fontSize: "1.5rem",
              },
              onChange: handleSubmit,
            }}
            label={{
              labelName: "Delivery's Email",
              className: "text-2xl font-bold dark:text-gray-200",
            }}
          />
          <div className="flex flex-row justify-center items-center gap-20 m-4">
            <Button
              color="white"
              size="xl"
              borderRadius="1.2rem"
              text="Submit"
              width="auto"
              customFunc={() => {
                addNewEmployeeHandler();
              }}
              className=" bg-green-500 disabled:bg-green-900 font-semibold p-4"
              isValid={isValid}
            />
            <Button
              bgColor={"#f44336"}
              color="white"
              size="xl"
              borderRadius="1.2rem"
              text="Cancel"
              width="auto"
              customFunc={closeBackDrop}
              isValid={false}
              className="font-semibold p-4"
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ChangeDelivery;
