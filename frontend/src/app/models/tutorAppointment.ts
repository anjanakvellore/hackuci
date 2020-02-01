import {Course} from './course';
import {Tutor} from './tutor';

export interface TutorAppointment {
  transaction_id: string;
  course: Course;
  appointment: string;
  tutor: Tutor;
  student_id: string;
  tutor_id: string;
  status: string;
  statusStr: string;

}
