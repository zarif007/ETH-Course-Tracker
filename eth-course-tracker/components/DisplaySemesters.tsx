import React, { useState, useEffect } from "react";
import { useGetSemesters } from "../hooks/getSemesters";
import { semesterInterface } from "../Interfaces/SemesterInterface";
import Semester from "./Semester";
import { courseInterface } from './../Interfaces/CourseInterface';
import { calculateCGPA } from './../functions/calculateCGPA';

const DisplaySemesters = () => {
  const { isLoading, isError, data: semesters } = useGetSemesters();

  const [totalCGPA, setTotalCGPA] = useState<number>(0);

  useEffect(() => {
    const total: courseInterface[] = [];

    semesters?.map((semester: semesterInterface) => {
      semester.courses.map((course: courseInterface) => {
        total.push(course);
      })
    })
    setTotalCGPA(calculateCGPA(total));
  }, [semesters])

  return (
    <div className="mb-8">
      {!isLoading &&
        !isError &&
        semesters?.length > 0 &&
        semesters?.map((semester: any, index: number) => {
          return (
            <div key={index} className="mt-8">
              <Semester semester={semester} />
            </div>
          );
        })}
        <span className="text-gray-200 text-xl mt-2 flex justify-center font-bold">
          {" "}
          Total CGPA {totalCGPA.toFixed(2)}
        </span>
    </div>
  );
};

export default DisplaySemesters;
