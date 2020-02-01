import {Course} from './course';
import {Student} from './student';

export interface StudentAppointment {
  transaction_id: string;
  course: Course;
  appointment: string;
  student: Student;
  student_id: string;
  tutor_id: string;
  status: string;
}
