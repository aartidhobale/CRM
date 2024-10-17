"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Menubar from "@/app/components/Menubar";
import { TemplateManagerSchema } from "../../schema";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    const validationResult = TemplateManagerSchema.safeParse({
      title,
      description,
    });

    if (!validationResult.success) {
    
      const formattedErrors = validationResult.error.format();
      setErrors({
        title: formattedErrors.title?._errors[0],
        description: formattedErrors.description?._errors[0],
      });
      return;
    }

  
    setErrors({});

    console.log("Title:", title);
    console.log("Description:", description);

    
  };

  return (
    <>
      <Menubar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Template Manager</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-lg shadow-md max-w-lg mx-auto"
        >
          
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Main title for your Product"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded`}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p> 
            )}
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter product description"
              className={`border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
