import { Component, OnInit } from '@angular/core';
import { StudentAppointment } from 'src/app/models/studentAppointment';
import { TutorAppointment } from 'src/app/models/tutorAppointment';
import { ProfileDetails } from 'src/app/models/profileDetails';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public previousStudentAppointments: StudentAppointment;
  public previousMentorAppointments: TutorAppointment;

  public profileDetails: ProfileDetails;
  username: string;

  constructor(private profileService: ProfileService) {
    this.username = 'divya2000';
    this.updateProfileData();
  }

  ngOnInit() {
  }

  updateProfileData() {
    this.profileService.getUserData(this.username).subscribe(userResp => {
      console.log(userResp);
      this.profileDetails = userResp;
      this.profileService.profileDetails = userResp;
    });
  }

}
