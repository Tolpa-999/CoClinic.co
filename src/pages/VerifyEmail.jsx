import { useState } from "react";
import axios from "axios";
import logo from "../assets/coclinic.png";
import { AuthUrls } from "../utils/serverURL";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", confirmCode: null });
  const [openAlert, setOpenAlert] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.confirmCode) {
      setOpenAlert(true);
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      return;
    }

    setOpenAlert(false);
    try {
      const response = await axios.post(AuthUrls.verifyEmail, {
        email: formData.email,
        confirmCode: formData.confirmCode,
      });

      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setVerificationSuccess(true);

      setTimeout(() => {
  navigate("/signin");
}, 2000);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.error || "Verification failed.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-sm:min-w-[90%] max-w-md w-full ">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-green-500">CoClinic</h1>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center mb-6">
          <p className="text-gray-700">
            Please enter the email and confirmation code you received to verify your account.
          </p>
        </div>

        {openAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>{snackbarMessage}</p>
          </div>
        )}

        {snackbarMessage && !openAlert && (
          <div
            className={`${
              snackbarSeverity === "success"
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            } border-l-4 p-4 mb-4`}
          >
            <p>{snackbarMessage}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaKey className="mr-2 text-gray-500" />
            Confirmation Code
          </label>
          <input
            type="text"
            name="confirmCode"
            value={formData.confirmCode}
            onChange={handleChange}
            placeholder="Enter the code sent to your email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
        >
          Verify Email
        </button>

        {verificationSuccess && (
          <p className="mt-4 text-green-600 text-sm text-center">
            Your email has been verified. You can now log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
