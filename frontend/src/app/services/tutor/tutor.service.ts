import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaveAppointment} from '../../models/saveAppointment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) {
  }

  public getAllSubjects(): Observable<any> {
    const localUrl = 'http://169.234.110.139:5000/allsubjects';
    return this.http.get(localUrl);

  }

  sendAppointmentStatus(saveObj: SaveAppointment) {
    const localUrl = 'http://169.234.110.139:5000/RegisterForCourse';
    // let formData = new FormData();
    // formData.append('transaction_id', transaction_id);
    // formData.append('status', status);
    return this.http.post(localUrl, saveObj);
  }
}
