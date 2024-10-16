"use client";

import Menubar from "@/app/components/Menubar";
import React, { useState, useEffect } from "react";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedHolidays = localStorage.getItem("holidays");
    if (storedHolidays) {
      setHolidays(JSON.parse(storedHolidays));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("holidays", JSON.stringify(holidays));
  }, [holidays]);

  const addHoliday = () => {
    const holidayYear = new Date(newHolidayDate).getFullYear();
    const newHoliday = {
      year: holidayYear,
      name: newHolidayName,
      date: newHolidayDate,
    };

    if (editingIndex !== null) {
      const updatedHolidays = [...holidays];
      updatedHolidays[editingIndex] = newHoliday;
      setHolidays(updatedHolidays);
      setEditingIndex(null);
    } else {
      setHolidays([...holidays, newHoliday]);
    }

    setNewHolidayName("");
    setNewHolidayDate("");
  };

  const deleteHoliday = (index) => {
    const updatedHolidays = holidays.filter((_, i) => i !== index);
    setHolidays(updatedHolidays);
  };

  const editHoliday = (index) => {
    const holidayToEdit = holidays[index];
    setNewHolidayName(holidayToEdit.name);
    setNewHolidayDate(holidayToEdit.date);
    setEditingIndex(index);
  };

  // Filter holidays by the selected year
  const filteredHolidays = selectedYear
    ? holidays.filter(
        (holiday) => holiday.year === parseInt(new Date(selectedYear).getFullYear())
      )
    : holidays;

  return (
    <>
      <Menubar />
      <h1 className="text-2xl font-bold mb-4">Holiday List</h1>
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="mb-4 w-full max-w-md">
          <label className="block text-lg font-medium">
            Select Holiday Year:
          </label>
          {/* Updated input type to "month" but will display only the year part */}
          <input
            type="month"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Select year"
          />
        </div>

        <div className="w-full max-w-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Holiday List</h2>
          <table className="w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Year</th>
                <th className="p-2">Holiday Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHolidays.length > 0 ? (
                filteredHolidays.map((holiday, index) => (
                  <tr key={index}>
                    <td className="p-2">{holiday.year}</td>
                    <td className="p-2">{holiday.name}</td>
                    <td className="p-2">{holiday.date}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 mr-2"
                        onClick={() => editHoliday(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => deleteHoliday(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No holidays found for the selected year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            Add Holiday Information
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium">Holiday Date:</label>
            <input
              type="date"
              value={newHolidayDate}
              onChange={(e) => setNewHolidayDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Holiday Name:</label>
            <input
              type="text"
              value={newHolidayName}
              onChange={(e) => setNewHolidayName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter holiday name"
            />
          </div>
          <button
            onClick={addHoliday}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingIndex !== null ? "Update Holiday" : "Add Holiday"}
          </button>
        </div>
      </div>
    </>
  );
};

export default HolidayList;
