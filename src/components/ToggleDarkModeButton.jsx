import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setCurrentMode } from "../app/uiSlice";

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#555")};
  transition: color 0.3s ease;

  .toggle-text {
    margin-right: 8px;
  }

  .toggle-slider {
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: ${(props) => (props.isDarkMode ? "#333" : "#ddd")};
    position: relative;
    transition: background-color 0.3s ease;

    .slider-circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: 2px;
      left: ${(props) => (props.isDarkMode ? "22px" : "2px")};
      transition: transform 0.3s ease;
    }
  }
`;

function ToggleDarkModeButton() {
  const { currentMode } = useSelector((state) => state.ui);
  const [isDarkMode, setIsDarkMode] = useState(currentMode === "Dark");
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode styles or toggle a CSS class on the body element
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      dispatch(setCurrentMode("Dark"));
    } else {
      dispatch(setCurrentMode("Light"));
    }
  };

  return (
    <ToggleButton isDarkMode={isDarkMode} onClick={toggleDarkMode}>
      <span className="toggle-text dark:text-white">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <div className="toggle-slider">
        <div className="slider-circle" />
      </div>
    </ToggleButton>
  );
}

export default ToggleDarkModeButton;
