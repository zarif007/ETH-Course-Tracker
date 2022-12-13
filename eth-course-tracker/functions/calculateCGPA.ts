import { courseInterface } from "../Interfaces/CourseInterface";

export const calculateCGPA = (courses: courseInterface[]) => {
  let total = 0.0;

  courses.map((course: courseInterface) => {
    total += parseFloat(course.cgpa);
  });

  return total / courses.length;
};
