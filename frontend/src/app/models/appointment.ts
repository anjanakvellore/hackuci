import { TimeoutError } from 'rxjs';

// export interface Appointment{
//     //id:number,
//     name:string;
//     course:string;
//     subject:string;
//     datetime:string;

// }

export interface StudentAppointment{
    transaction_id:string;
    course:Course;
    appointment:string;
    student: Student;
    student_id:string;
    tutor_id:string;
    status:string;

}

export interface TutorAppointment{
    transaction_id:string;
    course:Course;
    appointment:string;
    tutor: Tutor;
    student_id:string;
    tutor_id:string;
    status:string;
    statusStr:string;

}

export interface Tutor{
    name:string;
}

export interface Course{
    name:String;
    subject:Subject;
}

export interface Subject{
    name:string;
}

export interface Student{
    name:string;
}