import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaveAppointment} from '../../models/saveAppointment';
import { ProfileService } from '../profile/profile.service';



@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient, private profileService: ProfileService) {
  }

  public getAllSubjects(): Observable<any> {
    const localUrl = 'http://169.234.110.139:5000/allsubjects';
    return this.http.get(localUrl);

  }

  // @ts-ignore
  public submitChanges(courseId: string, date: string): Observable<any> {
    const localUrl = 'http://169.234.110.139:5000/RegisterForTutor';
    const formData = new FormData();
    formData.append('course_id', courseId);
    formData.append('tutor_id', this.profileService.profileDetails.user_id);
    formData.append('appointment', date);
    return this.http.post(localUrl,formData);
  }

  sendAppointmentStatus(saveObj: SaveAppointment) {
    const localUrl = 'http://169.234.110.139:5000/RegisterForCourse';
    // let formData = new FormData();
    // formData.append('transaction_id', transaction_id);
    // formData.append('status', status);
    return this.http.post(localUrl, saveObj);
  }
}
