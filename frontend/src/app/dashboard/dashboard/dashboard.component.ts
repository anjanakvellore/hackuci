import { Component, OnInit } from '@angular/core';
import {StudentAppointment} from '../../models/studentAppointment';
import {TutorAppointment} from '../../models/tutorAppointment';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service:DashboardService) { }
  public allStudentAppointments:StudentAppointment[];
  public studentAppointments:StudentAppointment[];
  public tutorAppointments:TutorAppointment[];
  public pendingStudentAppointments:StudentAppointment[];

  ngOnInit() {
    this.studentAppointments=[];
    this.pendingStudentAppointments=[];
    this.getAllStudentAppointments();
    this.getTutorAppointments();
  }


  getAllStudentAppointments(){
    this.service.getAllStudentAppointments()
    .subscribe(data => {
      this.allStudentAppointments = data.transactions;
      this.studentAppointments = this.allStudentAppointments.filter(x=>x.status=="1");
      this.studentAppointments.forEach(x=>{
          var date = new Date(x.appointment);
          x.appointment = date.toLocaleString();
      });
      this.pendingStudentAppointments = this.allStudentAppointments.filter(x=>x.status=="0");
      this.pendingStudentAppointments.forEach(x=>{
        var date = new Date(x.appointment);
        x.appointment = date.toLocaleString();
    });
      console.log(this.pendingStudentAppointments);
    });
  }

  getTutorAppointments(){
      this.service.getTutorAppointments()
      .subscribe(data=>{
        this.tutorAppointments = data.transactions;
        this.tutorAppointments = this.tutorAppointments.filter(x=>x.status!="2");
        this.tutorAppointments.forEach(x=>{
          var date = new Date(x.appointment);
          x.appointment = date.toLocaleString();
          if(x.status=="1"){
            x.statusStr = "Accepted";
          } else if(x.status == "0"){
            x.statusStr = "Pending";
          }
      });
        
      });
  }

  onClickAccept(transaction_id:string){
    console.log("clicked accept"+transaction_id);
    this.service.sendAppointmentStatus(transaction_id,"1").subscribe(x=>{
        this.pendingStudentAppointments = this.pendingStudentAppointments.filter(y=>y.transaction_id!=transaction_id);

    });

  }

  onClickReject(transaction_id:string){
    console.log("clicked reject"+transaction_id);
    this.service.sendAppointmentStatus(transaction_id,"2").subscribe(x=>{
        this.pendingStudentAppointments = this.pendingStudentAppointments.filter(y=>y.transaction_id!=transaction_id);

    });

  }
    

}
