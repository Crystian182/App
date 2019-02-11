import { Student } from "./Student";
import { Result } from "./Result";
import { Exam } from "./Exam";

export class ExamEnrollment {
    student: Student;
	date: Date;
	grade: number;
    result: Result;
    exam: Exam;
}