import React from "react";
import { useDispatch } from "react-redux";

import { handelClick } from "../../app/uiSlice";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  customFunc,
  className,
  isValid
}) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => {
        if (customFunc) {
          customFunc();
        } else {
          dispatch(handelClick());
        }
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      disabled = {isValid}
      className={` text-${size} p-3 w-${width} disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
