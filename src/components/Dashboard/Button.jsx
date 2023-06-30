import React from "react";


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
  isValid,
  children
}) => {

  return (
    <button
      type="button"
      onClick={() => {
        if (customFunc) {
          customFunc();
        }
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      disabled = {isValid}
      className={` text-${size} p-3 w-${width} disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
    >
      {icon} {text} {children}
    </button>
  );
};

export default Button;
