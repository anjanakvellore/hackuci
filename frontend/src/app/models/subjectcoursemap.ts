export interface SubjectCourseMap {
    name: string;
    subject_id: string;
    courses: Course[];

}

export interface Course {
    name: string;
    course_id: string;
    subject_id: string;
}
