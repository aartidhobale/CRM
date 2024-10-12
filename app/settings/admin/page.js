"use client";

import Menubar from '@/app/components/Menubar';
import React, { useState } from 'react';

const Admin = () => {
  // State for form data
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null); // For photo upload
  const [photoPreview, setPhotoPreview] = useState(null); // For photo preview

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like saving the data to the backend or console
    console.log({ name, mobile, email, photo });
    alert("Form submitted!");
    // Reset the form fields
    setName('');
    setMobile('');
    setEmail('');
    setPhoto(null);
    setPhotoPreview(null);
  };

  // Handle form reset (Cancel button)
  const handleReset = () => {
    setName('');
    setMobile('');
    setEmail('');
    setPhoto(null);
    setPhotoPreview(null);
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for the preview
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <>
      <Menubar/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

        {/* Admin Form */}
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="photo">Upload Photo</label>
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
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-2 max-w-xs rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
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
