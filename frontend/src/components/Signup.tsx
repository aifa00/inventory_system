import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../assets/Button";
import axios from "../config/axiosConfig";
import InputField from "./InputField";
import { MdError } from "react-icons/md";
import Loader from "../assets/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [commonError, setCommonError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (loading) return;

      let hasError = false;
      let currError = {
        emailError: "",
        passwordError: "",
        commonError: "",
      };

      // Validate Email
      if (!email.trim()) {
        hasError = true;
        currError.emailError = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hasError = true;
        currError.emailError = "Please enter a valid email address.";
      }

      // Validate Password
      if (!password) {
        hasError = true;
        currError.passwordError = "Please enter a password.";
      } else if (password.length < 6) {
        hasError = true;
        currError.passwordError =
          "Password must be at least 6 characters long.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        hasError = true;
        currError.passwordError =
          "Password must contain at least one special character.";
      } else if (!/\d/.test(password)) {
        hasError = true;
        currError.passwordError = "Password must contain at least one digit.";
      }

      setError(currError);

      if (hasError) return;

      setLoading(true);

      await axios.post(`/register`, {
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";
      setCommonError(message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
      className="w-80 p-3 md:w-96 md:p-5 shadow rounded-lg
    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="mb-5">
        <img src="/loginImage.jpg" alt="login" />
      </div>
      <div className="flex justify-between">
        <h1 className="mb-8 font-bold text-2xl">SIGNUP</h1>
        <img src="/logo.png" alt="logo" width={60} height={50} />
      </div>

      <InputField
        label={"Email"}
        type={"email"}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={"john@gmail.com"}
        error={error.emailError}
      />

      <div className="relative">
        <InputField
          label={"Password"}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder={"john@89"}
          error={error.passwordError}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer text-slate-500 absolute top-9 right-5"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </div>
      </div>
      <br />
      {commonError && (
        <div className="flex items-center text-red-500">
          <MdError />
          <span>&nbsp;{commonError}</span>
        </div>
      )}
      <Button
        label={"SIGNUP"}
        disabled={loading === true}
        onClick={handleSubmit}
        loading={loading}
      />
      {loading && <Loader />}

      <span className="block mt-3 text-sm text-center">
        Already have an account?&nbsp;
        <strong className="underline cursor-pointer" onClick={navigateToLogin}>
          Login
        </strong>
      </span>
    </div>
  );
}

export default Signup;
