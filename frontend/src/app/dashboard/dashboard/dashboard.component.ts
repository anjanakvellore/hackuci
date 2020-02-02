import { Component, OnInit } from '@angular/core';
import {StudentAppointment} from '../../models/studentAppointment';
import {TutorAppointment} from '../../models/tutorAppointment';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService,private SpinnerService: NgxSpinnerService) { 

  }
  public allStudentAppointments: StudentAppointment[];
  public studentAppointments: StudentAppointment[];
  public tutorAppointments: TutorAppointment[];
  public pendingStudentAppointments: StudentAppointment[];
  public currentTranscationId:string;
  public reason:string;
  public loadingCount:number = 0;

  ngOnInit() {
    this.studentAppointments = [];
    this.pendingStudentAppointments = [];
    this.getAllStudentAppointments();
    this.getTutorAppointments();
  }


  getAllStudentAppointments() {
    this.showLoadingIcon();
    this.service.getAllStudentAppointments()
    .subscribe(data => {
      console.log('all appointments', data);
      this.allStudentAppointments = data.transactions;
      console.log(this.allStudentAppointments);
      this.studentAppointments = this.allStudentAppointments.filter(x => x.status === 1);
      console.log(this.studentAppointments);
      this.studentAppointments.forEach(x => {
          const date = new Date(x.appointment);
          x.appointment = date.toLocaleString();
      });
      console.log(this.studentAppointments);
      this.pendingStudentAppointments = this.allStudentAppointments.filter(x => x.status === 0);
      this.pendingStudentAppointments.forEach(x => {
        const date = new Date(x.appointment);
        x.appointment = date.toLocaleString();
    });
      console.log(this.pendingStudentAppointments);
      this.hideLoadingIcon();
    });
  }

  getTutorAppointments() {
      this.showLoadingIcon();
      this.service.getTutorAppointments()
      .subscribe(data => {
        console.log('all tut appointments', data);
        this.tutorAppointments = data.transactions;
        this.tutorAppointments = this.tutorAppointments.filter(x => x.status !== '2');
        this.tutorAppointments.forEach(x => {
          const date = new Date(x.appointment);
          x.appointment = date.toLocaleString();
          if (x.status === '1') {
            x.statusStr = 'Accepted';
          } else if (x.status === '0') {
            x.statusStr = 'Pending';
          }
      });
      this.hideLoadingIcon();

      });
  }

  onClickAccept(transaction_id: string) {
    console.log('clicked accept' + transaction_id);
    this.currentTranscationId = transaction_id;
    this.service.sendAppointmentStatus(this.currentTranscationId, '1').subscribe(x => {
        this.pendingStudentAppointments = this.pendingStudentAppointments.filter(y => y.transaction_id !== transaction_id);

    });

  }

  onClickReject(transaction_id: string) {
    this.currentTranscationId = transaction_id;
    console.log('clicked reject' + transaction_id);
    // this.service.sendAppointmentStatus(transaction_id, '2').subscribe(x => {
    //     this.pendingStudentAppointments = this.pendingStudentAppointments.filter(y => y.transaction_id !== transaction_id);

    // });

  }

  onClickModalSubmit() {
    console.log('clicked modal submit' + this.currentTranscationId);
    //console.log(this.reason);
    
    this.service.sendAppointmentStatus(this.currentTranscationId, '2',this.reason).subscribe(x => {
        this.pendingStudentAppointments = this.pendingStudentAppointments.filter(y => y.transaction_id !== this.currentTranscationId);

    });

    this.reason = ''

  }

  onClickModalCancel(){
    console.log('clicked modal cancel');
    this.reason = ''
  }

  showLoadingIcon() {
    if (this.loadingCount === 0) {
      this.SpinnerService.show();
    }
    this.loadingCount++;
  }

  hideLoadingIcon() {
    this.loadingCount--;
    if (this.loadingCount === 0) {
      this.SpinnerService.hide();
    }
  }


}
