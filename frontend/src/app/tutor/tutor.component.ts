import { Component, OnInit } from '@angular/core';
import { SubjectCourseMap } from '../models/subjectcoursemap';
import { TutorService } from '../services/tutor/tutor.service';
import { Course } from '../models/subjectcoursemap';
import * as moment from 'moment';
import { stringify } from 'querystring';
// import * as Litepicker from 'litepicker';
// import { Litepicker } from "litepicker";
declare var Litepicker: any;
// declare var $: any;

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  public subjectCourseMap: SubjectCourseMap[];
  mentorAvailability = new Array<MentorAvailability>();
  selectedRow: number;


  constructor(private service: TutorService) { }

  ngOnInit() {
    this.getAllSubjects();
    let mentor = new MentorAvailability(0)
    this.mentorAvailability.push(mentor);
    this.selectedRow = 0;

  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe(data => {
      this.subjectCourseMap = data.subjects;
      console.log(this.subjectCourseMap);
    });


  }

  onSubjectChange() {
    console.log('subject change triggered');
    this.mentorAvailability[this.selectedRow].courseList = this.mentorAvailability[this.selectedRow].selectedSubject.courses;
    console.log(this.mentorAvailability[this.selectedRow].courseList);
    this.mentorAvailability[this.selectedRow].selectedCourse = undefined;

  }

  onAddBtnClick() {
    console.log('add btn triggered');
    const mentor = new MentorAvailability(this.mentorAvailability.length);
    this.mentorAvailability.push(mentor);
    console.log(this.mentorAvailability);
  }

  onDeleteBtnClick() {
    console.log('del btn triggered');
    // if (this.mentorAvailability.length > 1) {
    //   this.mentorAvailability.splice(this.selectedRow, 1);
    // }
    this.mentorAvailability[this.selectedRow].deleted = true;
    console.log(this.mentorAvailability);
  }

  onRowClick(index: number) {
    console.log('row click triggered');
    this.selectedRow = index;
    console.log(this.selectedRow);
  }

  fromDateChange(event:any){
    this.mentorAvailability[this.selectedRow].fromDate = event.target.value;
  }

  toDateChange(event:any){
    this.mentorAvailability[this.selectedRow].toDate = event.target.value;
  }
  onSubmitButtonClick(){
    console.log(this.mentorAvailability);
    for(var i=0;i<this.mentorAvailability.length;i++){
      var currentDate = moment(new Date(this.mentorAvailability[i].fromDate));
      var stopDate = moment(new Date(this.mentorAvailability[i].toDate));
      while (currentDate <= stopDate) {
           var dateStr = moment(currentDate).format('YYYY-MM-DD hh:mm:ss');
           currentDate = moment(currentDate).add(1, 'days');
           console.log(dateStr);
           this.service.submitChanges(this.mentorAvailability[i].selectedCourse.course_id,dateStr).subscribe();
      }
      
    }
  }

}

export class MentorAvailability {
  selectedCourse: Course;
  selectedSubject: SubjectCourseMap;
  courseList: Course[];
  deleted: boolean;
  datepicker: any;
  fromDate: string;
  toDate:string;

  constructor(id: number) {
    this.deleted = false;
    this.datepicker = new Litepicker({ element: document.getElementById('litepicker-'+id) });
  }
}
