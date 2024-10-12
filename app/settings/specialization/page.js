"use client"; // Add this at the top for client-side rendering

import Menubar from "@/app/components/Menubar";
import React, { useState, useEffect } from "react";

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState("");

  // Load specializations from localStorage on component mount
  useEffect(() => {
    const storedSpecializations = JSON.parse(
      localStorage.getItem("specializations")
    );
    if (storedSpecializations) {
      setSpecializations(storedSpecializations);
    }
  }, []);

  // Function to handle form submission
  const handleAddSpecialization = (e) => {
    e.preventDefault();

    if (newSpecialization.trim()) {
      const updatedSpecializations = [...specializations, newSpecialization];
      setSpecializations(updatedSpecializations);
      localStorage.setItem(
        "specializations",
        JSON.stringify(updatedSpecializations)
      );
      setNewSpecialization(""); // Clear textarea after submission
    }
  };

  // Function to delete a specialization from the list
  const handleDeleteSpecialization = (index) => {
    const updatedSpecializations = specializations.filter((_, i) => i !== index);
    setSpecializations(updatedSpecializations);
    localStorage.setItem(
      "specializations",
      JSON.stringify(updatedSpecializations)
    );
  };

  return (
    <>
      <Menubar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Specialization</h1>

        {/* Button to show Add Specialization form */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={() => setShowForm(true)}
        >
          Add Specialization
        </button>

        {/* Show Form when button is clicked */}
        {showForm && (
          <form
            className="bg-white p-4 rounded shadow-md w-full max-w-md mb-6"
            onSubmit={handleAddSpecialization}
          >
            <div className="mb-4">
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <textarea
                id="specialization"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        )}

        {/* Display the list of Specializations */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Specialization List</h2>
          <ul className="list-disc list-inside">
            {specializations.length > 0 ? (
              specializations.map((spec, index) => (
                <li key={index} className="p-2 bg-gray-50 rounded mb-2 flex justify-between">
                  {spec}
                  <button
                    onClick={() => handleDeleteSpecialization(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No specializations added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Specialization;
