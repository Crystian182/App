import { TypeLesson } from "./TypeLesson";
import { Class } from "./Class";
import { FileLesson } from "./FileLesson";

export class Lesson {
    idlesson: number;
    classroom: Class;
    start: Date;
    end: Date;
    typeLesson: TypeLesson;
    lessonFiles: FileLesson[];
}
