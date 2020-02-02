import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaveAppointment} from '../../models/saveAppointment';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient,private profileService: ProfileService) {
  }

  public getAllSubjects(): Observable<any> {
    const localUrl = 'http://169.234.110.139:5000/allsubjects';
    return this.http.get(localUrl);

  }

  public submitChanges(course_id:string,date:string):Observable<any>{
    const localUrl = 'http://169.234.110.139:5000/RegisterForTutor';
    let formData = new FormData();
    formData.append('course_id', course_id);
    formData.append('tutor_id', this.profileService.profileDetails.user_id);
    formData.append('appointment', date);
  }

  sendAppointmentStatus(saveObj: SaveAppointment) {
    const localUrl = 'http://169.234.110.139:5000/RegisterForCourse';
    // let formData = new FormData();
    // formData.append('transaction_id', transaction_id);
    // formData.append('status', status);
    return this.http.post(localUrl, saveObj);
  }
}
