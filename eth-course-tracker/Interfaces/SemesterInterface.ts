import { courseInterface } from "./CourseInterface";

export interface semesterInterface {
  sessionName: string;
  year: string;
  courses: courseInterface[];
}
