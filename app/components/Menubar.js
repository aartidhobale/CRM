"use client"; 
import Link from "next/link"; // Use Link for navigation

import React, { useState } from 'react';
import { HiOutlineCalendar, HiOutlineStar, HiOutlineTemplate } from 'react-icons/hi'; 

const Menubar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold">WebShop</div>
        <div className="hidden md:flex space-x-6">
          
          <div className="relative">
            <button
              className="hover:bg-gray-700 mr-6 px-3 py-2 rounded-md"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              Settings ⚙️
            </button>

            {/* Dropdown Menu */}
            {isSettingsOpen && (
              <ul className="absolute mt-2 bg-white text-black rounded-md shadow-lg w-48">
                <li className="p-2 hover:bg-gray-200 flex items-center">
                  <HiOutlineCalendar className="mr-2" />
                  <a href="#">Holiday List</a>
                </li>
                <li className="p-2 hover:bg-gray-200 flex items-center">
                  <HiOutlineStar className="mr-2" /> 
                  <Link href="/settings/specialization">
                    Specialization
                  </Link>
                </li>
                <li className="p-2 hover:bg-gray-200 flex items-center">
                  <HiOutlineTemplate className="mr-2" /> 
                  <a href="#">Template Manager</a>
                </li>
                <li className="p-2 hover:bg-gray-200 flex items-center">
                  <HiOutlineTemplate className="mr-2" /> 
                  <a href="/settings/admin">Admin Settings</a>
                </li>
               
              </ul>
            )}
          </div>
        </div>

       
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="md:hidden text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      
      {isSettingsOpen && (
        <div className="md:hidden bg-white text-black">
          <div className="p-2">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
              Settings ⚙️
            </button>
            <ul className="pl-4">
              <li className="p-2 hover:bg-gray-100 flex items-center">
                <HiOutlineCalendar className="mr-2" /> 
                Holiday List
              </li>
              <li className="p-2 hover:bg-gray-100 flex items-center">
                <HiOutlineStar className="mr-2" /> 
                <Link href="/settings/specialization">
                  Specialization
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-100 flex items-center">
                <HiOutlineTemplate className="mr-2" /> 
                Template Manager
              </li>
              <li className="p-2 hover:bg-gray-100 flex items-center">
                <HiOutlineTemplate className="mr-2" /> 
                <Link href="/settings/admin">
                Admin Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
