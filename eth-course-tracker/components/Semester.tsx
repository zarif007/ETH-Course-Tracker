import React from 'react'

const Semester = ({semester}: any) => {
    console.log(semester)
  return (
    <div className='lg:w-4/6 md:w-5/6 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0'>
      <div className='flex space-x-4 md:space-x-8 font-bold text-xl'>
        <p>{semester.sessionName}</p>
        <p>{semester.year}</p>
      </div>
      <div className='flex flex-col mt-4'>
        {
            semester.courses.map((course: any, index: number) => {
                return (
                    <div key={index} className='flex space-x-4 md:space-x-8 font-semibold text-lg border-2 p-2 rounded-md my-2'>
                        <p>Course #{index}: </p>
                        <p>{course.courseName}</p>
                        <p>{course.cgpa}</p>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Semester
