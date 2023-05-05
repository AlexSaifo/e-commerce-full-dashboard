import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.input.id} className={props.label.className}>{props.label.labelName}</label>
      <input  ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
