"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Menubar from "../components/Menubar";
import { SignUpSchema } from "../schema";
import Link from "next/link";

const SignUpForm = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = SignUpSchema.safeParse(formData);

    if (result.success) {
      console.log("Form data is valid:", result.data);

      alert("Sign up successful!");

      push("/login");

      localStorage.setItem("signUpData", JSON.stringify(formData));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } else {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      console.log("Validation failed:", formattedErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <Menubar />
      <form
        onSubmit={handleSubmit}
        className="p-6 m-5 max-w-md mx-auto bg-gray-100 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">
              {errors.firstName._errors[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName._errors[0]}</p>
          )}
        </div>

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

        <div className="mb-4">
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
            <p className="text-red-500 text-sm">{errors.password._errors[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword._errors[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <p className="text-center mt-2">Already have an account? <Link href={'/login'} className="text-blue-500">Login here.</Link></p>
      </form>
    </>
  );
};

export default SignUpForm;
