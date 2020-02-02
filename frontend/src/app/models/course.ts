import {Subject} from './subject';

export interface Course {
  id: string;
  name: string;
  subjectId: string;
  subject: Subject;
}
