import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Appointment } from '../../models/appointment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // getStudentAppointments(): Observable<HttpResponse<Appointment[]>> {
  //   const localUrl = "";
  //   return this.http.get<Appointment[]>(
  //     localUrl, { observe: 'response' });
  // }

  getStudentAppointments():Appointment[]{
     var appointments = [{name:"Anjana",subject:"Computer Science",course:"DSA",datetime:new Date(Date.now()).toLocaleDateString()},
                          {name:"Vaishakhi",subject:"Computer Science",course:"Network",datetime:new Date(Date.now()).toLocaleDateString()},
                          {name:"Santhiya",subject:"Computer Science",course:"OS",datetime:new Date(Date.now()).toLocaleDateString()},
                          {name:"Burhaan",subject:"Computer Science",course:"OS",datetime:new Date(Date.now()).toLocaleDateString()}];
      return appointments;

  }


}
