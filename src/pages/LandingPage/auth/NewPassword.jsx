import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../app/auth/authSlice";
import ReCAPTCHA from "react-google-recaptcha";

const NewPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const authErrorMessage = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [newUserPassword, setNewUserPassword] = useState({
    password: "",
    c_password: "",
    email: "",
    code: "",
  });

  useEffect(() => {
    setErrorMessage(authErrorMessage || "");
  }, [authErrorMessage]);

  const handleNewChanges = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewUserPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!isEmailValid(newUserPassword.email) || newUserPassword.email == "") {
      setErrorMessage("Email Not Valid");
      return;
    }
    if (newUserPassword.password.length < 5) {
      setErrorMessage("Password must be at least 8 character.");
      return;
    }

    if (newUserPassword.c_password != newUserPassword.password) {
      setErrorMessage("Password must equal to Confirm Password");
      return;
    }

    if (!newUserPassword.recaptcha) {
      setErrorMessage("ReCAPTCHA Not Valid");
      return;
    }
    dispatch(
      resetPassword({
        email: newUserPassword.email,
        password: newUserPassword.password,
        c_password: newUserPassword.c_password,
        code: newUserPassword.code,
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white py-10 px-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        <form onSubmit={handleNewSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={newUserPassword.email}
              onChange={handleNewChanges}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={newUserPassword.password}
              onChange={handleNewChanges}
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="c_password"
              type="password"
              name="c_password"
              value={newUserPassword.c_password}
              onChange={handleNewChanges}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Code
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text"
              name="code"
              value={newUserPassword.code}
              onChange={handleNewChanges}
              placeholder="Code"
              required
            />
          </div>
          <div className="flex gap-2 flex-col items-center justify-between">
            <ReCAPTCHA
              sitekey="6Ld5GwMnAAAAALVKmFJHaXl6QQ3ZSnU85juJ5RlM"
              onChange={(e) => {
                setErrorMessage("");
                setNewUserPassword((prev) => ({
                  ...prev,
                  recaptcha: e,
                }));
              }}
            />
            {errorMessage && (
              <p style={{ fontSize: "1rem", fontWeight: "600", color: "red" }}>
                {errorMessage}
              </p>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg w-full"
              type="submit"
            >
              Submit
            </button>

            <div className="mt-4 text-blue-500 underline"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
