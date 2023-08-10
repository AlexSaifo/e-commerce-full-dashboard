import React, { useEffect, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import avatar from "../../data/avatar.jpg";
import { useSelector } from "react-redux";
import { Button } from "../../components/Dashboard";
import { InputLabel, MenuItem, Select } from "@mui/material";
import {
  useFetchCitiesQuery,
  useFetchStateByIDQuery,
  useFetchStreetByIdQuery,
} from "../../app/api/locationApi";

function Profile() {
  const { currentColor } = useSelector((state) => state.ui);
  const [isEditMode, setIsEditMode] = useState(false);

  // User Info
  const user = useSelector((state) => state.auth.user);

  const { store } = user || {};

  console.log(user, store);

  const roleID = user?.role_id;
  const [userInfo, setUserInfo] = useState(
    (user.role_id == 3 ? store : user) || {
      name: "",
      email: "",
      phone: "",
      bio: "",
      address: "",
      username: "",
      image: "",
      image_url: "",
    }
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    userInfo?.image_url || ""
  );

  // Fetch all Cities
  const { data: cities } = useFetchCitiesQuery();
  // Fetch state by city id
  const { data: cityStateData } = useFetchStateByIDQuery(userInfo.city_id, {
    skip: !!!userInfo.city_id,
  });
  // Fetch street by state id
  const { data: stateStreetData } = useFetchStreetByIdQuery(userInfo.state_id, {
    skip: !!!userInfo.state_id,
  });

  useEffect(() => {
    if (user.role_id == 3) {
      const { location } = store || "";

      let LocationArray = location.split(",");
      LocationArray = LocationArray.map((loc) => {
        loc = loc.trim();
        return loc;
      });

      setUserInfo((prev) => {
        return {
          ...prev,
          city_id: LocationArray[0],
          state_id: LocationArray[1],
        };
      });  
    }
  }, [user]);

  // Password
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data from the API and set the state variables
  }, []);

  const handlePhotoUpload = (event) => {
    // Open file dialog when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {};

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setUserInfo(user);
    setImagePreviewUrl(user?.image_url || "");
    // Reset form values if needed
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Handle the image upload logic here if needed.
    // For example, you can use the `imagePreviewUrl` to send the image to the server.

    // Reset the image preview URL after saving.
    setImagePreviewUrl(userInfo?.image_url || "");
  };

  return (
    <div className="flex flex-col items-center justify-center m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg dark:text-gray-200 rounded-3xl">
      <div className="flex justify-center items-center">
        {roleID > 2 && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img
              src={
                imagePreviewUrl || !userInfo?.photo.includes("http")
                  ? `http://127.0.0.1:8000` + userInfo?.photo
                  : userInfo?.photo
              }
              alt={user.role_id == 3 ? userInfo?.store_name : userInfo?.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />

            <input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            {isEditMode ? (
              <button
                className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                onClick={handlePhotoUpload}
              >
                <FiCamera size={20} />
              </button>
            ) : null}
          </div>
        )}
      </div>
      <div className="mt-8">
        {/* Profile information */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <div className="mt-4">
            <div className="flex items-center">
              <p className="font-semibold">Name:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name={user.role_id == 3 ? "store_name" : "name"}
                  value={
                    user.role_id == 3 ? userInfo?.store_name : userInfo?.name
                  }
                  onChange={inputChangeHandler}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">
                  {user.role_id == 3 ? userInfo?.store_name : userInfo?.name}
                </p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Email:</p>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={userInfo?.email}
                  onChange={inputChangeHandler}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{userInfo?.email}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Phone:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="phone_number"
                  value={userInfo?.phone_number}
                  onChange={inputChangeHandler}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{userInfo?.phone_number}</p>
              )}
            </div>
            {roleID > 2 && (
              <>
                <div className="flex items-center mt-2">
                  <p className="font-semibold">Description:</p>
                  {isEditMode ? (
                    <textarea
                      name="description"
                      value={userInfo?.description}
                      onChange={inputChangeHandler}
                      className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                    />
                  ) : (
                    <p className="ml-2">{userInfo?.description}</p>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <p className="font-semibold">Address Details:</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="address_details"
                      value={userInfo?.address_details}
                      onChange={inputChangeHandler}
                      className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                    />
                  ) : (
                    <p className="ml-2">{userInfo?.address_details}</p>
                  )}
                </div>
                <InputLabel htmlFor="city_id">City</InputLabel>
                <Select
                  label="City"
                  value={userInfo?.city_id}
                  onChange={inputChangeHandler}
                  name="city_id"
                  fullWidth
                  mb={4}
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities?.data?.map((city) => (
                    <MenuItem key={city.city_id} value={city.city_id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="state_id">State</InputLabel>
                <Select
                  label="State"
                  value={userInfo?.state_id}
                  onChange={inputChangeHandler}
                  name="state_id"
                  fullWidth
                  mb={4}
                  disabled={!userInfo.city_id} // Disable the state dropdown until city is selected
                >
                  <MenuItem value="">Select State</MenuItem>
                  {cityStateData?.data?.map((state) => (
                    <MenuItem key={state.state_id} value={state.state_id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="street_id">Street</InputLabel>
                <Select
                  label="Street"
                  value={userInfo?.street_id}
                  onChange={inputChangeHandler}
                  name="street_id"
                  fullWidth
                  mb={4}
                  disabled={!userInfo.state_id} // Disable the street dropdown until state is selected
                >
                  <MenuItem value="">Select Street</MenuItem>
                  {stateStreetData?.data?.map((street) => (
                    <MenuItem key={street.street_id} value={street.street_id}>
                      {street.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </div>
          {isEditMode ? (
            <div className="flex mt-4">
              <Button
                color="white"
                bgColor={currentColor}
                text="Save"
                borderRadius="10px"
                className={`mr-2 py-2 px-4`}
                size="md"
                customFunc={handleSave}
              />

              <Button
                color="white"
                text="Cancel"
                borderRadius="10px"
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                size="md"
                customFunc={handleCancel}
              />
            </div>
          ) : (
            <Button
              color="white"
              bgColor={currentColor}
              text="Edit"
              borderRadius="10px"
              className="mt-4 py-2 px-4 "
              size="md"
              customFunc={handleEdit}
            />
          )}
        </div>
        {/* Password change section */}
        {/* <div className="mb-4">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <div className="mt-4">
            <div className="flex items-center">
              <RiLockPasswordLine className="mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border p-2 rounded w-full dark:bg-secondary-dark-bg dark:text-gray-200"
              />
              <button
                className="bg-gray-800 text-white mx-4 p-2 rounded-full shadow-lg"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 border p-2 rounded w-full dark:bg-secondary-dark-bg dark:text-gray-200"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 border p-2 rounded w-full dark:bg-secondary-dark-bg dark:text-gray-200"
            />
          </div>
          <Button
            color="white"
            bgColor={currentColor}
            text="Change Password"
            borderRadius="10px"
            className="mt-4 py-2 px-4 "
            size="md"
            customFunc={handlePasswordChange}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
