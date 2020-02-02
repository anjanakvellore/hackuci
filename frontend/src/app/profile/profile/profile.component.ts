import { Component, OnInit } from '@angular/core';
import { StudentAppointment } from 'src/app/models/studentAppointment';
import { TutorAppointment } from 'src/app/models/tutorAppointment';
import { ProfileDetails } from 'src/app/models/profileDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileDetails:ProfileDetails;
  public previousStudentAppointments:StudentAppointment;
  public previousMentorAppointments:TutorAppointment;

  constructor() { }

  ngOnInit() {
  }

}
