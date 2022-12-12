import React, { useRef, useState } from "react";
import AddCourse from "./AddCourse";
import Selector from "./Selector";

interface courseInterface {
  courseName: string;
  cgpa: string;
}

interface semesterInterface {
  sessionName: string;
  year: string,
  courses: courseInterface[];
}

const sessionOptions = ["Spring", "Summer", "Fall"];

const yearOptions = ["2018", "2019", "2020", "2021", "2022"];

const AddSemester = () => {
  const [semester, setSemester] = useState<semesterInterface>({
    sessionName: '',
    year: '',
    courses: [],
  })

  const [error, setError] = useState<string>('');

  const isAbleToAddCourse = (value: string) => {
    setError('');
    let flag = true;
    if(semester.courses.length == 5) {
      setError('Can add upto 5 courses')
      flag = false;
    }

    semester.courses.map((course: courseInterface) => {
      if(course.courseName === value) {
        setError(`Course ${value} is already added`)
        flag = false;
        return;
      }
    })

    return flag;
  }

  const handleAddCourse = ({courseName, cgpa}: courseInterface) => {
    if(isAbleToAddCourse(courseName))
      setSemester({ ...semester, courses: [ ...semester.courses, {courseName, cgpa}] })
  }

  const handleRemoveCourse = (courseName: string) => {
    setSemester({ ...semester, courses: semester.courses.filter((course: courseInterface) => course.courseName !== courseName) })    
  }

  const handleGetsemesterName = (value: string) => setSemester({...semester, sessionName: value});

  const handleGetYear = (value: string) => setSemester({...semester, year: value});

  const calculateCGPA = (courses: courseInterface[]) => {

    let total = 0.0

    courses.map((course: courseInterface) => {
      total += parseFloat(course.cgpa);
    })

    return total / courses.length;
  }

  const handleSumbmit = () => {
    setError('');

    if(semester.courses.length <= 1) {
      setError('Add atleast 2 courses');
      return;
    }
    if(semester.sessionName == '') {
      setError('Add semester');
      return;
    }
    if(semester.year == '') {
      setError('Add year');
      return;
    }
  }

  return (
    <div className="mt-4">
      <div className="lg:w-4/6 md:w-5/6 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
        <h2 className="text-white text-2xl font-bold title-font mb-5">
          Add Results 💀 
        </h2>

        {/* Session selector */}
        <label className="leading-7 text-md font-semibold text-gray-400">
          Add Semester
        </label>
        <div className="flex space-x-2 mb-4">
          <Selector name="Session" options={sessionOptions} setter={handleGetsemesterName} />
          <Selector name="Year" options={yearOptions} setter={handleGetYear} />
        </div>

        {/* Display Selected Courses */}
        {
          semester.courses.length > 0 && <label className="leading-7 text-md font-semibold text-gray-400">
            Selected Courses
            <span className="text-gray-500 text-sm"> CGPA of this semester {calculateCGPA(semester.courses).toFixed(2)}</span>
          </label>
        }
        <div className="mb-4">
          {
            semester.courses.map((course: courseInterface, index) => {
              return (
                <div key={index} className="cursor-pointer text-white" onClick={() => handleRemoveCourse(course.courseName)}>
                  <p key={course.courseName} className="font-semibold text-md">
                  <span className="text-gray-300">Course {index + 1}: </span>
                  {course.courseName} ➡️ {course.cgpa}</p> 
                </div>
              )
            })
          }
        </div>


        {/* Add Courses */}
        <AddCourse handleAddCourse={handleAddCourse} counter={semester.courses.length + 1} />

        <p className="text-lg text-red-500 font-semibold">{error}</p>

        <button onClick={handleSumbmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl font-medium">
          Submit 🚀
        </button>
      </div>
    </div>
  );
};

export default AddSemester;
