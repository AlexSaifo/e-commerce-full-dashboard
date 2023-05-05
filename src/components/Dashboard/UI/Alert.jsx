import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearAlert } from "../../../app/alertSlice";
import { useSelector } from "react-redux";
import { Backdrop } from "./Modal";
import { ClockLoader } from "react-spinners";

const Alert = ({ message, type, buttonText, onClose }) => {
  const dispatch = useDispatch();
  const { currentColor } = useSelector((state) => state.ui);

  const handleClearAlert = () => {
    dispatch(clearAlert());
    onClose()
  };

  let backgroundColor;
  switch (type) {
    case "info":
      backgroundColor = "#2196F3";
      break;
    case "success":
      backgroundColor = "#4CAF50";
      break;
    case "error":
      backgroundColor = "#f44336";
      break;
    case "pending":
      backgroundColor = "#FFC107";
      break;
    default:
      backgroundColor = currentColor;
  }

  const alertStyles = {
    backgroundColor,
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "2rem",
    position: "fixed",
    top: "50%",
    right: "50%",
    margin: "0 auto",
    minHeight: "150px",
    maxHeight: "auto",
    zIndex: "1000",
    transform: "translate(50% , -50%)",
    borderRadius: "16px",
  };

  const buttonStyles = {
    padding: "5px 10px",
    backgroundColor: "white",
    color: backgroundColor,
    border: `1px solid ${backgroundColor}`,
    cursor: "pointer",
  };

  return (
    <>
      <Backdrop onClose={handleClearAlert} />
      {type === "pending" && (
        <div
          className=" fixed ml-auto mr-auto top-2/4 right-2/4 translate-x-2/4 -translate-y-2/4"
          style={{ zIndex: "100000" }}
        >
          <ClockLoader
            color={currentColor}
            loading
            size={80}
            speedMultiplier={1}
          />
        </div>
      )}
      {type !== "pending" && (
        <>
          <div
            style={alertStyles}
            className="p-4 h-auto shadow-md md:max-w-2xl w-full"
          >
            <div className=" text-gray-200 text-2xl font-semibold ">
              {message}
            </div>
            <div className=" flex flex-row justify-center gap-16 items-center w-full">
              <button
                style={buttonStyles}
                className="active:scale-95 rounded-lg text-xl font-semibold"
                onClick={handleClearAlert}
              >
                Ok
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "success", "error", "pending", ""]),
};

Alert.defaultProps = {
  type: "info",
};

export default Alert;
