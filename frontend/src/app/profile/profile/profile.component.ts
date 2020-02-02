<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {StudentAppointment} from 'src/app/models/studentAppointment';
import {TutorAppointment} from 'src/app/models/tutorAppointment';
import {ProfileDetails} from 'src/app/models/profileDetails';
import {ProfileService} from 'src/app/services/profile/profile.service';
=======
import { Component, OnInit } from '@angular/core';
import { StudentAppointment } from 'src/app/models/studentAppointment';
import { TutorAppointment } from 'src/app/models/tutorAppointment';
import { ProfileDetails } from 'src/app/models/profileDetails';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { getLocaleDateTimeFormat } from '@angular/common';
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public studentAppointments: StudentAppointment[];
  public tutorAppointments: TutorAppointment[];
<<<<<<< HEAD
  public loadingCount = 0;
=======
  public loadingCount:number = 0;
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2

  public profileDetails: ProfileDetails;
  username: string;

<<<<<<< HEAD
  constructor(private profileService: ProfileService, private SpinnerService: NgxSpinnerService) {
=======
  constructor(private profileService: ProfileService,private SpinnerService: NgxSpinnerService) {
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2
    this.username = 'divya2000';
    this.updateProfileData();
  }

  ngOnInit() {
    this.studentAppointments = [];
    this.tutorAppointments = [];
    this.getStudentAppointments();
    this.getTutorAppointments();
  }


<<<<<<< HEAD
  getStudentAppointments() {
    this.showLoadingIcon();
    this.profileService.getStudentAppointments().subscribe(data => {
=======
  getStudentAppointments(){
    this.showLoadingIcon();
    this.profileService.getStudentAppointments().subscribe(data=>{
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2
      data.transactions.forEach(x => {

        let d1 = new Date(x.appointment);
        let d2 = new Date();
        // let same = d1 < d2;
        console.log('d1=' + d1);
        console.log('d2=' + d2);

        if (d1 < d2) {
          if (x.status !== -1 && x.status !== 0) {
            this.studentAppointments.push(x);
            // if (x.status == 1) {
            //   x.statusStr = "Accepted";
            // }
            // else if (x.status == 2) {
            //   x.statusStr = "Rejected";
            // }
          }

        }

      });
      this.hideLoadingIcon();
<<<<<<< HEAD
    });

  }

  getTutorAppointments() {
    this.showLoadingIcon();
    this.profileService.getTutorAppointments().subscribe(data => {
=======
    })

  }

  getTutorAppointments(){
    this.showLoadingIcon();
    this.profileService.getTutorAppointments().subscribe(data=>{
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2
      data.transactions.forEach(x => {

        let d1 = new Date(x.appointment);
        let d2 = new Date();
        console.log('d1=' + d1);
        console.log('d2=' + d2);

        if (d1 < d2) {
          console.log(x);
          if (x.status !== -1 && x.status !== 0) {
            if (x.status === 1) {
              x.statusStr = 'Accepted';
            } else if (x.status === 2) {
              x.statusStr = 'Rejected';
            }
            this.tutorAppointments.push(x);
          }
<<<<<<< HEAD
=======
         
        }
        
      });
      this.hideLoadingIcon();
    })
>>>>>>> 263703c3b45be8e9710dbfcbae2eaf3c87aabec2

        }

      });
      this.hideLoadingIcon();
    });
  }

  updateProfileData() {
    this.profileService.getUserData(this.username).subscribe(userResp => {
      console.log(userResp);
      this.profileDetails = userResp;
      this.profileService.saveUserData(userResp);
      this.profileService.profileDetails = userResp;
    });
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
