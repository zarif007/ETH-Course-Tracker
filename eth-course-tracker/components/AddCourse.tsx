import React from "react";
import Selector from "./Selector";
import { useRef } from "react";
import { useState } from "react";

interface courseInterface {
  courseName: string;
  cgpa: string;
}

const cgpa = [
  ".7",
  "1.3",
  "1.7",
  "2.0",
  "2.3",
  "2.7",
  "3.0",
  "3.3",
  "3.7",
  "4.0",
];

const AddCourse = ({ handleAddCourse, counter }: any) => {
  const [course, setCourse] = useState<courseInterface>({
    courseName: "",
    cgpa: "",
  });

  const handleGetCGPA = (value: string) =>
    setCourse({ ...course, cgpa: value });

  return (
    <>
      <label className="leading-7 text-md font-semibold text-gray-400">
        Add Course {counter}
      </label>
      <div className="flex space-x-2 mb-4">
        <input
          onChange={(e: any) =>
            setCourse({ ...course, courseName: e.target.value })
          }
          placeholder="Name"
          type="text"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <Selector name="CGPA" options={cgpa} setter={handleGetCGPA} />
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm font-medium"
          onClick={() => handleAddCourse(course)}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddCourse;
