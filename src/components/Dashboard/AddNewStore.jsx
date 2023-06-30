import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "./Button";
import {AiOutlineBackward} from 'react-icons/ai'
function AddNewStore() {
  const { currentColor } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating async operation with setTimeout
    setTimeout(() => {
      const newStore = {
        name,
        email,
        password,
        photo,
        bio,
        address,
        phone,
      };

      // Send the newStore object to the server or update the app state
      console.log(newStore);

      setLoading(false);

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setPhoto(null);
      setBio("");
      setAddress("");
      setPhone("");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center my-8">
      <Button
        bgColor={currentColor}
        color="white"
        bgHoverColor="light-gray"
        size="sm"
        borderRadius="1rem"
        text="Back"
        width="auto"
        customFunc={() => {
          navigate(-1);
        }}
        className=" self-start active:scale-95 flex justify-center items-center gap-1 mx-0 my-6"
        isValid={false}
        icon={<AiOutlineBackward />}
      />
      <h2 className="text-2xl font-bold mb-4 dark:text-white ">
        Add New Store
      </h2>
      <form onSubmit={handleSubmit} className="w-80">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-semibold mb-1 dark:text-white"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-semibold mb-1 dark:text-white"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block font-semibold mb-1 dark:text-white"
          >
            Photo:
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full dark:text-white"
          />
          {photo && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={URL.createObjectURL(photo)}
              alt="Selected Photo"
              className="mt-2 rounded"
              style={{ width: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block font-semibold mb-1 dark:text-white"
          >
            Bio:
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block font-semibold mb-1 dark:text-white"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block font-semibold mb-1 dark:text-white"
          >
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <button
          type="submit"
          style={{ background: currentColor }}
          className={` rounded-xl text-white p-3 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 hover:drop-shadow-xl `}
        >
          {loading ? (
            <ClipLoader size={20} color="#fff" loading={loading} />
          ) : (
            "Add Store"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddNewStore;
