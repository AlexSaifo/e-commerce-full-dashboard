import React from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

const DataSpinner = ({ showSpinner }) => {
  const { currentColor } = useSelector((state) => state.ui);
  
  return (
    <>
      {showSpinner && (
        <div className="w-full flex justify-center items-center">
          <PacmanLoader
            color={currentColor}
            margin={0}
            size={30}
            speedMultiplier={1}
          />
        </div>
      )}
    </>
  );
};

export default DataSpinner;
