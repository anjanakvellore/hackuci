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
    this.rootURL = 'http://169.234.110.139:5000';
  }

  public getUserData(username: string): Observable<any> {
    const localUrl = this.rootURL + '/getuser';
    const formData = new FormData();
    formData.set('username', username);
    return this.http.post(localUrl, formData);
  }
}
