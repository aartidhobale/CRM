"use client";

import { useState } from "react";
import Menubar from "../components/Menubar";
import { LoginSchema } from "../schema";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = LoginSchema.safeParse(formData);

    if (result.success) {
      console.log("Form data is valid:", result.data);

      setFormData({
        email: "",
        password: "",
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
