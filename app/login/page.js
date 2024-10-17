"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Menubar from "../components/Menubar";
import { LoginSchema } from "../schema";
import Link from "next/link";

const LoginForm = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    newPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = LoginSchema.safeParse(formData);

    if (result.success) {
      const storedUser = localStorage.getItem("signUpData");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (
          user.email === formData.email &&
          user.password === formData.password
        ) {
          alert("Login Successful!");

          localStorage.setItem("isLoggedIn", "true");

          push("/dashboard");
        } else {
          alert("Invalid email or password. Please try again.");
        }
      } else {
        alert("User does not exist. Please register first.");
      }

      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
    } else {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
    }
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("signUpData");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === resetPasswordData.email) {
        user.password = resetPasswordData.newPassword;
        localStorage.setItem("signUpData", JSON.stringify(user));

        alert("Password successfully reset! You can now log in.");
        setIsForgotPassword(false);
      } else {
        alert("User not found with this email.");
      }
    } else {
      alert("No users registered yet.");
    }

    setResetPasswordData({ email: "", newPassword: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetChange = (e) => {
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Menubar />
      {!isForgotPassword ? (
        <form
          onSubmit={handleSubmit}
          className="p-6 m-5 max-w-md mx-auto bg-gray-100 shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password._errors[0]}
              </p>
            )}
          </div>

          <div className="mb-2">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <p className="text-center mt-2">Don't have an account? <Link href={'/signup'} className="text-blue-500">Register here.</Link></p>

        </form>
      ) : (
        <form
          onSubmit={handleResetPasswordSubmit}
          className="p-6 m-5 max-w-md mx-auto bg-gray-100 shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={resetPasswordData.email}
              onChange={handleResetChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={resetPasswordData.newPassword}
              onChange={handleResetChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Reset Password
          </button>

          <div className="mt-4">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
