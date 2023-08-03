import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordSendEmail } from "../../../app/auth/authSlice";

const ForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { error: authErrorMessage, resetPassword } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    recaptcha: "",
  });

  useEffect(() => {
    setErrorMessage(authErrorMessage || "");
  }, [authErrorMessage]);
  useEffect(() => {
    if (resetPassword) {
      navigate("/auth/new-password");
    }
  }, [resetPassword]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(userInfo.email) || userInfo.email == "") {
      setErrorMessage("Email Not Valid");
      return;
    }

    if (!userInfo.recaptcha) {
      setErrorMessage("ReCAPTCHA Not Valid");
      return;
    }

    dispatch(resetPasswordSendEmail(userInfo));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white py-10 px-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Email"
              required
              onChange={(e) => {
                setErrorMessage("");
                setUserInfo((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="flex gap-2 flex-col items-center justify-between">
            <ReCAPTCHA
              sitekey="6Ld5GwMnAAAAALVKmFJHaXl6QQ3ZSnU85juJ5RlM"
              onChange={(e) => {
                setErrorMessage("");
                setUserInfo((prev) => ({
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
              Reset Password
            </button>
            <div className="mt-4 text-blue-500 underline"></div>
          </div>
        </form>
        <Link to={"login"}>
          <button className="w-full text-center text-blue-500">
            Remembered your password? Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
