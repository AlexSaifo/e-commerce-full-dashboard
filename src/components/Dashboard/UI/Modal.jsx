import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

export const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-half-transparent "
      style={{ zIndex: 100 }}
      onClick={props.onClose}
    />
  );
};

export const ModalOverlay = (props) => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlay")
      )}

      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};

export default Modal;
