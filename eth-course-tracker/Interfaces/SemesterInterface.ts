import { courseInterface } from "./CourseInterface";

export interface semesterInterface {
  studentId: string;
  sessionName: string;
  year: string;
  courses: courseInterface[];
}
