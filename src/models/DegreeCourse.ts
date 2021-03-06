import { TypeDegreeCourse } from "./TypeDegreeCourse";
import { SubjectStudy } from "./SubjectStudy";
import { AcademicYear } from "./AcademicYear";

export interface DegreeCourse {
    idcourse: number;
    name?: string;
    cfu?: number;
    typeDegreeCourse?: TypeDegreeCourse;
    academicYear?: AcademicYear;
    subjects?: SubjectStudy[];
}
