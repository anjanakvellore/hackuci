import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { ProfileService } from '../profile/profile.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private profileService: ProfileService) {
    console.log(this.profileService.profileDetails)
  }

  getAllStudentAppointments():Observable<any> {
    // let tutor_id = 101;
    let formData = new FormData();
    formData.append("tutor_id",this.profileService.profileDetails.user_id);

    const localUrl = "http://169.234.106.134:5000/students";
    return this.http.post(localUrl, formData);
      // .pipe(catchError(this.errorHandler));
  }

  
  getTutorAppointments():Observable<any> {
    // let tutor_id = 101;
    let formData = new FormData();
    formData.append("student_id",this.profileService.profileDetails.user_id);

    const localUrl = "http://169.234.106.134:5000/tutors";
    return this.http.post(localUrl, formData);
  }

  sendAppointmentStatus(transaction_id:string,status:string,reason?:string){
    let formData = new FormData();
    formData.append("transaction_id",transaction_id);
    formData.append("status",status);
    if(reason!=null){
      console.log(reason);
      formData.append("reason",reason);
    }
    else{
      console.log('empty reason');
    }
    const localUrl = "http://169.234.106.134:5000/ChangeTransactionStatus";
    
    return this.http.post(localUrl,formData);
  }
 
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

  


}
