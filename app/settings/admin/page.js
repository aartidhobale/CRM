"use client";

import Menubar from "@/app/components/Menubar";
import React, { useState } from "react";
import { AdminSchema } from "../../schema"; 

const Admin = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const validation = AdminSchema.safeParse({ name, mobile, email });
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        name: fieldErrors.name?._errors[0] || "",
        mobile: fieldErrors.mobile?._errors[0] || "",
        email: fieldErrors.email?._errors[0] || "",
      });
      return;
    }

    console.log({ name, mobile, email, photo });
    alert("Form submitted!");

    setName("");
    setMobile("");
    setEmail("");
    setPhoto(null);
    setPhotoPreview(null);
    setErrors({ name: "", mobile: "", email: "" });
  };

  const handleReset = () => {
    setName("");
    setMobile("");
    setEmail("");
    setPhoto(null);
    setPhotoPreview(null);
    setErrors({ name: "", mobile: "", email: "" });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <>
      <Menubar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-lg shadow-md max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="mobile"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="photo"
            >
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-3 py-2"
            />
            {photoPreview && (
              <div className="mt-4">
                <p>Photo Preview:</p>
                <img src={photoPreview} alt="Preview" className="size-48 rounded-md" />
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
