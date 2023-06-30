import React, { useEffect, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import avatar from "../../data/avatar.jpg";
import { useSelector } from "react-redux";
import { Button } from "../../components/Dashboard";

function Profile() {
  const { currentColor } = useSelector((state) => state.ui);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet.");
  const [address, setAddress] = useState("123 Street, City");
  const [username, setUsername] = useState("johndoe123");
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data from the API and set the state variables
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setBio(data.bio);
        setAddress(data.address);
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handlePhotoUpload = () => {
    // Open file dialog when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Handle the file upload logic here
    console.log("Selected file:", file);
  };

  const handlePasswordChange = () => {
    // Make API request to change the password
    // Example API request using fetch:
    fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Password change success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Password change error:", error);
        // Handle error response
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form values if needed
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Make API request to save the updated profile information
    // Example API request using fetch:
    fetch("/api/update-profile", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        bio,
        address,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile update success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        // Handle error response
      });
  };

  return (
    <div className="flex flex-col items-center justify-center m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg dark:text-gray-200 rounded-3xl">
      <div className="flex justify-center items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />

          <input
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
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{name}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Email:</p>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{email}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Phone:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{phone}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Bio:</p>
              {isEditMode ? (
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{bio}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Address:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{address}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p className="font-semibold">Username:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 rounded ml-2 dark:bg-secondary-dark-bg dark:text-gray-200"
                />
              ) : (
                <p className="ml-2">{username}</p>
              )}
            </div>
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
        <div className="mb-4">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
