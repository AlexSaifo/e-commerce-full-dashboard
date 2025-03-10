import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { handelClick } from "../../app/uiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../../data/avatar.jpg";
import { logout } from "../../app/auth/authSlice";

const UserProfile = ({ user }) => {
  const { currentColor } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          {user.role_id == 1
            ? "Admin"
            : user.role_id == 2
            ? "Employee"
            : "Store"}{" "}
          Profile
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          customFunc={() => {
            dispatch(handelClick("userProfile"));
          }}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {user?.image && (
          <img
            className="rounded-full h-24 w-24"
            src={user?.image}
            alt={user.name}
          />
        )}
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {user.name.toUpperCase()}
          </p>

          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {user.email.toUpperCase()}
          </p>
        </div>
      </div>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          customFunc={() => {
            //googleLogout();
            dispatch(logout());
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
