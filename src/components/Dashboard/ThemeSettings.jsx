import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { themeColors } from "../../data/dummy";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentColor, setThemeSettings } from "../../app/uiSlice";
import ToggleDarkModeButton from "../ToggleDarkModeButton";

const ThemeSettings = () => {
  const { currentColor } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleColorChange = event => {
    dispatch(setCurrentColor(event.target.value));
  }

  return (
    <div className="bg-half-transparent fixed nav-item w-screen top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 dark:bg-main-dark-bg bg-white dark:[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">Settings</p>
          <button
            type="button"
            onClick={() => {
              dispatch(setThemeSettings(false));
            }}
            style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 m-4">
          <p className="font-semibold text-lg">Theme Options</p>
          <div className="mt-4">
            <ToggleDarkModeButton />
          </div>
        </div>

        <div className="flex-col border-t-1 border-color p-4 m-4">
          <p className="font-semibold text-lg">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, idx) => (
              <TooltipComponent
                key={idx}
                content={item.name}
                position="TopCenter"
              >
                <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => {
                      dispatch(setCurrentColor(item.color));
                    }}
                  >
                    <BsCheck
                      className={`ml-2 text-xl text-white ${
                        currentColor === item.color ? "block" : "hidden"
                      }`}
                    />
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
            <input
              id="colorInput"
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className='mt-16 w-[20rem] h-[15rem]'
            />
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
