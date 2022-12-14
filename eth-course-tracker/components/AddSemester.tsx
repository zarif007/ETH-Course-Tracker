import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { semesterContractAddress } from "../config";
import AddCourse from "./AddCourse";
import Selector from "./Selector";
import SemesterAbi from "../../backend/build/contracts/SemesterContract.json";
import Semester from "./Semester";
import { semesterInterface } from "../Interfaces/SemesterInterface";
import { courseInterface } from "../Interfaces/CourseInterface";
import { calculateCGPA } from "../functions/calculateCGPA";
import { useGetWalletAddress } from "../hooks/connectWallet";

const sessionOptions = ["Spring", "Summer", "Fall"];

const yearOptions = ["2018", "2019", "2020", "2021", "2022"];

const AddSemester = () => {
  const [semester, setSemester] = useState<semesterInterface>({
    studentId: "",
    sessionName: "",
    year: "",
    courses: [],
  });

  const { isLoading, isError, data: address } = useGetWalletAddress();

  const [error, setError] = useState<string>("");

  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const isAbleToAddCourse = (value: string) => {
    setError("");
    let flag = true;
    if (semester.courses.length == 5) {
      setError("Can add upto 5 courses");
      flag = false;
    }

    semester.courses.map((course: courseInterface) => {
      if (course.courseName === value) {
        setError(`Course ${value} is already added`);
        flag = false;
        return;
      }
    });

    return flag;
  };

  const handleAddCourse = ({ courseName, cgpa }: courseInterface) => {
    if (isAbleToAddCourse(courseName))
      setSemester({
        ...semester,
        courses: [...semester.courses, { courseName, cgpa }],
      });
  };

  const handleRemoveCourse = (courseName: string) => {
    setSemester({
      ...semester,
      courses: semester.courses.filter(
        (course: courseInterface) => course.courseName !== courseName
      ),
    });
  };

  const handleGetsemesterName = (value: string) =>
    setSemester({ ...semester, sessionName: value });

  const handleGetYear = (value: string) =>
    setSemester({ ...semester, year: value });

  const handleSumbmit = () => {
    setError("");

    if (semester.courses.length <= 1) {
      setError("Add atleast 2 courses");
      return;
    }
    if (semester.sessionName == "") {
      setError("Add semester");
      return;
    }
    if (semester.year == "") {
      setError("Add year");
      return;
    }
    if (semester.studentId == "") {
      setError("Add student id");
      return;
    }

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const SemesterContract = new ethers.Contract(
          semesterContractAddress,
          SemesterAbi.abi,
          signer
        );

        const courseName: string[] = [];
        const cgpas: string[] = [];

        semester.courses.map((course: courseInterface) => {
          courseName.push(course.courseName);
          cgpas.push(course.cgpa);
        });

        SemesterContract.addSemester(
          semester.studentId,
          semester.sessionName,
          semester.year,
          courseName,
          cgpas
        ).then((res: any) => {
          console.log(res);
          setIsUploaded(true);
        });
      }
    } catch (error) {
      console.log("No Ethereum");
    }
  };

  return (
    <div className="mt-4">
      <div className="lg:w-4/6 md:w-5/6 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
        <h2 className="text-white text-2xl font-bold title-font mb-5">
          Add Results 💀
        </h2>

        {/* Student id */}
        <label className="leading-7 text-md font-semibold text-gray-400">
          Enter ID
        </label>
        <div className="flex space-x-2 mb-4">
          <input
            onChange={(e: any) =>
              setSemester({ ...semester, studentId: e.target.value })
            }
            placeholder="ID"
            type="text"
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        {/* Session selector */}
        <label className="leading-7 text-md font-semibold text-gray-400">
          Add Semester
        </label>
        <div className="flex space-x-2 mb-4">
          <Selector
            name="Session"
            options={sessionOptions}
            setter={handleGetsemesterName}
          />
          <Selector name="Year" options={yearOptions} setter={handleGetYear} />
        </div>

        {/* Display Selected Courses */}
        {semester.courses.length > 0 && (
          <label className="leading-7 text-md font-semibold text-gray-400">
            Selected Courses
            <span className="text-gray-500 text-sm">
              {" "}
              CGPA of this semester {calculateCGPA(semester.courses).toFixed(2)}
            </span>
          </label>
        )}
        <div className="mb-4">
          {semester.courses.map((course: courseInterface, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer text-white"
                onClick={() => handleRemoveCourse(course.courseName)}
              >
                <p key={course.courseName} className="font-semibold text-md">
                  <span className="text-gray-300">Course {index + 1}: </span>
                  {course.courseName} ➡️ {course.cgpa}
                </p>
              </div>
            );
          })}
        </div>

        {/* Add Courses */}
        <AddCourse
          handleAddCourse={handleAddCourse}
          counter={semester.courses.length + 1}
        />

        <p className="text-lg text-red-500 font-semibold">{error}</p>

        <button
          onClick={handleSumbmit}
          disabled={!address}
          className="text-white disabled:cursor-not-allowed bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium"
        >
          Submit 🚀
        </button>
      </div>
      <div className="mt-8">
        {isUploaded && (
          <div className="flex flex-col ">
            <p className="bg-indigo-500 font-bold text-lg my-2 p-4 mx-auto">
              Now added
            </p>
            <Semester semester={semester} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSemester;
