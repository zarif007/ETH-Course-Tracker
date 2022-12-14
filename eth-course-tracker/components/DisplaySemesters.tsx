import React, { useState, useEffect } from "react";
import { useGetSemesters } from "../hooks/getSemesters";
import { semesterInterface } from "../Interfaces/SemesterInterface";
import Semester from "./Semester";
import { courseInterface } from "./../Interfaces/CourseInterface";
import { calculateCGPA } from "./../functions/calculateCGPA";
import SearchComp from "./SearchComp";

const DisplaySemesters = () => {
  const { isLoading, isError, data: semesters } = useGetSemesters();

  const [totalCGPA, setTotalCGPA] = useState<number>(0);

  const [searchedID, setSearchedID] = useState<string>("");

  useEffect(() => {
    const total: courseInterface[] = [];

    semesters?.map((semester: semesterInterface) => {
      if(semester.studentId !== searchedID) return;
      semester.courses.map((course: courseInterface) => {
        total.push(course);
      });
    });

    console.log(calculateCGPA(total))
    setTotalCGPA(calculateCGPA(total));
  }, [semesters, searchedID]);

  const getSearchedId = (id: string) => {
    setSearchedID(id);
  }

  return (
    <div className="mb-8">
      <SearchComp getSearchedId={getSearchedId} />
      {searchedID !== "" && (
        <p className="flex justify-center font-bold text-2xl mt-4">
          Showing Results for<span className="text-indigo-500">{searchedID}</span>
        </p>
      )}
      {!isLoading &&
        !isError &&
        semesters?.length > 0 &&
        semesters?.map((semester: semesterInterface, index: number) => {
          return (
            <div key={index} className="mt-8">
              {
                semester.studentId === searchedID && 
                <Semester semester={semester} />
              }
            </div>
          );
        })}
      {totalCGPA !== 0 && (
        <span className="text-gray-200 text-xl mt-2 flex justify-center font-bold">
          {" "}
          Total CGPA {totalCGPA.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default DisplaySemesters;
