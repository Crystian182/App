import { DegreeCourse } from "./DegreeCourse";
import { Student } from "./Student";
import { EnrollmentStatus } from "./EnrollmentStatus";

export interface StudentHasDegreeCourse{
    degreeCourse: DegreeCourse ;
    enrollmentStatus: EnrollmentStatus;
	student: Student;
    date: Date;
}