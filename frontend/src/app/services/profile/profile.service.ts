import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileDetails } from 'src/app/models/profileDetails';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  rootURL: string;
  profileDetails: ProfileDetails;
  constructor(private http: HttpClient) {
    //this.rootURL = 'http://169.234.106.134:5000';
    this.rootURL = 'http://169.234.106.134:5000';
    this.getUserDataFromLocalStorage();
  }

  getUserDataFromLocalStorage() {
    if (localStorage.getItem('profileDetails')) {
      this.profileDetails = JSON.parse(localStorage.getItem('profileDetails'));
    }
  }

  getTutorAppointments():Observable<any> {
    let formData = new FormData();
    formData.append("student_id",this.profileDetails.user_id);
    const localUrl = this.rootURL+'/tutors';
    return this.http.post(localUrl, formData);
  }
 

  getStudentAppointments():Observable<any> {
    const localUrl = this.rootURL+'/students';
    let formData = new FormData();
    formData.append("tutor_id",this.profileDetails.user_id);
    return this.http.post(localUrl,formData);
  }

  public getUserData(username: string): Observable<any> {
    const localUrl = this.rootURL + '/getuser';
    const formData = new FormData();
    formData.set('username', username);
    return this.http.post(localUrl, formData);
  }

  saveUserData(userData: ProfileDetails) {
    localStorage.setItem('profileDetails', JSON.stringify(userData));
  }
}
