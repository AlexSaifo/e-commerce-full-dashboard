import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Button from "./Button";
import { AiOutlineBackward, AiFillDelete } from "react-icons/ai";
import { SiMinutemailer } from "react-icons/si";
import Alert from "./UI/Alert";
import { useNavigate } from "react-router-dom";
import { removeReport, selectReportById } from "../../app/reportsSlice";

const Report = () => {
  const { id } = useParams();
  const contact = useSelector((state) => selectReportById(state, +id));
  const { currentColor } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "info" || alertType === "pending") {
      return;
    } else {
      window.location.reload();
    }
  };

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
      <Button
        bgColor={currentColor}
        color="white"
        bgHoverColor="light-gray"
        size="sm"
        borderRadius="1rem"
        text="Back"
        width="auto"
        customFunc={() => {
          navigate(-1);
        }}
        className="active:scale-95 flex justify-center items-center gap-1 mx-0 my-6"
        isValid={false}
        icon={<AiOutlineBackward />}
      />
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg dark:text-white">Sent By:</p>
        <h1 className="text-red-600 text-center text-xl font-semibold tracking-wide">
          {contact.Name}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">From:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Location}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">Email:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Email}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">Type:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Type}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">Its ID:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Type_ID}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">Date:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Date}
        </h1>
      </div>
      <div className="flex items-center gap-4 my-5">
        <p className="font-semibold text-lg dark:text-white">Title:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Title}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg dark:text-white">The Message:</p>
        <h1 className="text-red-600 text-center text-lg font-medium tracking-wide">
          {contact.Message}
        </h1>
      </div>
      <div className="flex items-center gap-4 justify-center my-6">
        <Button
          bgColor={currentColor}
          color="white"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="1.2rem"
          text={
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${contact.Email}&su=ContactUs`}
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reply
            </a>
          }
          width="auto"
          customFunc={() => {}}
          className="active:scale-95 flex justify-center items-center gap-1"
          isValid={false}
          icon={<SiMinutemailer />}
        />
        <Button
          bgColor={"rgb(220, 38, 38, 1)"}
          color="white"
          bgHoverColor="red-600"
          size="xl"
          borderRadius="1.2rem"
          text="Delete"
          width="auto"
          customFunc={() => {
            dispatch(removeReport(contact.ID));
          }}
          className="active:scale-95 bg-red-600 flex justify-center items-center gap-1"
          isValid={false}
          icon={<AiFillDelete />}
        />
      </div>
    </>
  );
};

export default Report;
