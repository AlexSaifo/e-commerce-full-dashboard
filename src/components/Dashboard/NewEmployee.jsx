import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import { addNewEmployee } from "../../app/employeesSlice";
import Button from "./Button";
import Alert from "./UI/Alert";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

function NewEmployee() {
  const dispatch = useDispatch();

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);
  const { currentColor } = useSelector((state) => state.ui);

  const [hideNewEmployee, setHideNewEmployee] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  

  const closeBackDrop = () => {
    setHideNewEmployee(false);
    setEmail("");
    setIsValid(true);
  };

  const handleSubmit = (event) => {
    let email = event.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const testValue = emailRegex.test(email);
    setEmail(email);

    if (testValue) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const addNewEmployeeHandler = () => {
    const inputValue = email;
    if (!isValid) {
      dispatch(
        addNewEmployee({
          newEmployee: {
            email: inputValue,
          },
        })
      );
    }
  };

  const onCloseAlertAddHandler = () => {
    if (
      alertType === "info" ||
      alertType === "error" ||
      alertType === "pending"
    ) {
      return;
    } else if (alertType === "success") {
      window.location.reload();
    }
  };


  useEffect(() => {
    if (alertType === "success" && isAdd) {
      closeBackDrop();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertType ]);

  return (
    <>
      {alertAddMessage && isAdd && (
        <Alert
          type={alertType}
          message={alertAddMessage}
          buttonText={alertButtonText}
          onClose={onCloseAlertAddHandler}
        />
      )}

      <Button
        bgColor={currentColor}
        color="white"
        bgHoverColor="light-gray"
        size="xl"
        borderRadius="1.2rem"
        text="Add New Employee"
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
              id: "email",
              type: "text",
              placeholder: "his Email",
              className: "dark:text-gray-200 p-2 w-3/4",
              style: {
                fontSize: "1.5rem",
              },
              onChange: handleSubmit,
            }}
            label={{
              labelName: "Employee's Email",
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

export default NewEmployee;
