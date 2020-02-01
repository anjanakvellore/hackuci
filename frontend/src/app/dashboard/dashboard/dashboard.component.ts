import { Component, OnInit } from '@angular/core';
import {Appointment} from '../../models/appointment'
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service:DashboardService) { }
  public appointments:Appointment[];

  ngOnInit() {
    // this.appointments = [{name:"Anjana",subject:"Computer Science",course:"DSA",datetime:new Date(Date.now()).toLocaleDateString()},
    //                       {name:"Vaishakhi",subject:"Computer Science",course:"Network",datetime:new Date(Date.now()).toLocaleDateString()},
    //                       {name:"Santhiya",subject:"Computer Science",course:"OS",datetime:new Date(Date.now()).toLocaleDateString()},
    //                       {name:"Burhaan",subject:"Computer Science",course:"OS",datetime:new Date(Date.now()).toLocaleDateString()}];
    // console.log(this.appointments);
    this.getStudentAppointments();
  }

  getStudentAppointments() {
    this.appointments = this.service.getStudentAppointments();
    // this.service.getStudentAppointments()
    //   .subscribe(data => {
    //     for (const d of (data as any)) {
    //       this.appointments.push({
    //         name: d.name,
    //         subject: d.price,
    //         course:d.course,
    //         datetime:d.datetime
    //       });
    //     }
     //   console.log(this.appointments);
     // });
  }

}
