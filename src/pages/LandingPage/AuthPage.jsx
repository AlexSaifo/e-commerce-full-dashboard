import React, { useState } from "react";

//import { GoogleLogin } from "@react-oauth/google";
//import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha-enterprise";

const AuthPage = () => {
  const [page, setPage] = useState("login");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Implement your form submission logic here
  // };
  // const responseGoogle = (response) => {
  //   console.log(response);
  //   // Handle the Google login response here
  // };

  const handleNavigation = (destination) => {
    setPage(destination);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    login();
  };
  const handleRecaptchaResponse = (response) => {
    // Handle the reCAPTCHA response
    console.log(response);
    // Proceed with your logic after successful reCAPTCHA verification
  };
  const renderForm = () => {
    switch (page) {
      case "login":
        return (
          <>
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
                placeholder="Password"
                required
              />
            </div>
            <div className="flex gap-2 flex-col items-center justify-between">
              <ReCAPTCHA
                sitekey="6LfFWUUmAAAAAH3cJKx2rPjs0TDL1J5jlrk8kmx9"
                onChange={handleRecaptchaResponse}
              />
              {/* Add reCAPTCHA here */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg w-full"
                type="submit"
              >
                Login
              </button>
              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const details = jwt_decode(credentialResponse);

                  console.log(details)
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                locale="en"
              /> */}
              <button
                onClick={handleButtonClick}
                className="flex justify-center items-center gap-4 w-auto p-2 mt-2 rounded-xl "
              >
                <FaGoogle /> Login with Google
              </button>
              <div className="mt-4 text-blue-500 underline">
                <button onClick={() => handleNavigation("forgot-password")}>
                  Forgot Password?
                </button>
              </div>
            </div>
          </>
        );
      case "forgot-password":
        return (
          <>
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
              />
            </div>
            <div className="flex gap-2 flex-col items-center justify-between">
              <ReCAPTCHA
                sitekey="6LfFWUUmAAAAAH3cJKx2rPjs0TDL1J5jlrk8kmx9"
                onChange={handleRecaptchaResponse}
              />
              {/* Add reCAPTCHA here */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg w-full"
                type="submit"
              >
                Reset Password
              </button>
              <div className="mt-4 text-blue-500 underline">
                <button onClick={() => handleNavigation("login")}>
                  Remembered your password? Login
                </button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white py-10 px-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        <form action="/dashboard">{renderForm()}</form>
      </div>
    </div>
  );
};

export default AuthPage;
