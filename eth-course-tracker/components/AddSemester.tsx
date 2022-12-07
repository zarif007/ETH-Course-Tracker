import React, { useRef } from "react";
import Selector from "./Selector";

interface course {
  course: string;
  cgpa: number;
}

interface semester {
  session: string;
  courses: course[];
}

const semesterOptions = ["Spring", "Summer", "Fall"];

const yearOptions = ["2018", "2019", "2020", "2021", "2022"];

const cgpa = ['.7', '1.3', '1.7', '2.0', '2.3', '2.7', '3.0', '3.3', '3.7', '4.0']

const AddSemester = () => {
  const semesterRef = useRef<semester>(null);

  return (
    <div className="mt-12">
      <div className="lg:w-4/6 md:w-5/6 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
        <h2 className="text-white text-2xl font-bold title-font mb-5">
          Add Results 💀
        </h2>

        {/* Session selector */}
        <label className="leading-7 text-md font-semibold text-gray-400">
          Add Session
        </label>
        <div className="flex space-x-2 mb-4">
          <Selector name="Semester" options={semesterOptions} />
          <Selector name="Year" options={yearOptions} />
        </div>

        {/* Add Courses */}
        <label className="leading-7 text-md font-semibold text-gray-400">
          Add Course 1
        </label>
        <div className="flex space-x-2 mb-4">
          <input
            placeholder="Name"
            type="text"
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <Selector name="CGPA" options={cgpa} />
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm font-medium">
            Add
          </button>
        </div>

        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium">
          Submit 🚀
        </button>
      </div>
    </div>
  );
};

export default AddSemester;
