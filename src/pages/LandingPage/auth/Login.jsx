import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  googleLogin as googleLoginDispatch,
} from "../../../app/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const authErrorMessage = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    recaptcha: "",
  });

  useEffect(() => {
    setErrorMessage(authErrorMessage || "");
  }, [authErrorMessage]);

  const handleInputChanges = (event) => {
    setErrorMessage("");
    const name = event.target.name;
    const value = event.target.value;

    setUserInfo((prev) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!isEmailValid(userInfo.email) || userInfo.email == "") {
      setErrorMessage("Email Not Valid");
      return;
    }
    if (userInfo.password.length < 5) {
      setErrorMessage("Password must be at least 8 character.");
      return;
    }
    if (!userInfo.recaptcha) {
      setErrorMessage("ReCAPTCHA Not Valid");
      return;
    }
    dispatch(
      login({
        email: userInfo.email,
        password: userInfo.password,
      })
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      const { access_token } = codeResponse;

      const getUserInfo = async () => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/auth/google/login`,
            {
              access_token: access_token,
            }
          );
          if (+response.data.data?.role_id <= 3) {
            console.log(response); // User information will be available in response.data
            dispatch(googleLoginDispatch({ user: response.data.data }));
          } else {
            setErrorMessage("You do not have permission to access the site");
          }
        } catch (error) {
          setErrorMessage("Error while fetching user information:", error);
        }
      };
      getUserInfo();
    },
  });

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
              name="email"
              value={userInfo.email}
              onChange={handleInputChanges}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleInputChanges}
              placeholder="Password"
              required
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
              Login
            </button>

            <div className="mt-4 text-blue-500 underline"></div>
          </div>
        </form>
        <button
          onClick={() => {
            setErrorMessage("");
            googleLogin();
          }}
          className="flex justify-center items-center gap-4 w-auto p-2 mt-2 rounded-xl w-full "
        >
          <FaGoogle /> Login with Google
        </button>
        <Link to={"forget-password"}>
          <button className="w-full text-center text-blue-600">
            Forgot Password?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
