import {Component, OnInit} from '@angular/core';
import {LearnService} from '../../services/learn/learn.service';
import {Tutor} from '../../models/tutor';
import {Course} from '../../models/course';
import {TutorDisplayData} from '../../models/tutorDisplayData';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Transaction} from '../../models/transaction';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  public tutors: Tutor[];
  nameFilter: string;
  taskCourse: boolean;
  taskTutors: boolean;
  private allTutors: Tutor[];
  private allCourses: Course[];
  private allTransactions: Transaction[];
  private dropdownSettings: IDropdownSettings;
  private selectedItems: Course[];


  constructor(private service: LearnService) {
  }

  getAllCourses() {
    this.service.getAllCourses().subscribe(data => {
      // @ts-ignore
      this.allCourses = this.mapResultToCourses(data.courses);
      this.taskCourse = true;
    });
  }

  getAllTutors(): void {
    this.service.getAllTutors().subscribe(data => {
      // @ts-ignore
      this.allTutors = this.mapResultToTutors(data.transactions);
      // @ts-ignore
      this.allTransactions = this.getTransactions(data.transactions);
      this.tutors = this.allTutors;
      this.taskTutors = true;
    });
  }

  ngOnInit() {
    this.getAllCourses();
    this.getAllTutors();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  private getTransactions(transactions: any) {
    let t: Transaction;
    let arr: Transaction[];
    arr = [];
    transactions.forEach(obj => {
      t = {
        courseId: obj.course_id,
        date: obj.appointment,
        id: obj.transaction_id,
        tutorId: obj.tutor_id
      };
      arr.push(t);
    });
    return arr;
  }

  private mapResultToCourses(result: any): Course[] {
    if (result == null) {
      return null;
    }
    const courses = [];
    result.forEach(obj => {
      let modal: Course;
      modal = {
        id: obj.course_id,
        name: obj.name,
        subject: null,
        subjectId: obj.subject_id
      };
      courses.push(modal);
    });
    return courses;
  }

  private mapResultToTutors(transactions: any): TutorDisplayData[] {
    if (transactions == null) {
      return null;
    }
    const tutors = [];
    transactions.forEach(obj => {
      let modal: TutorDisplayData;
      modal = {
        courseId: obj.course_id,
        name: obj.tutor.name,
        id: obj.tutor_id,
        bio: obj.tutor.bio,
        pay: obj.tutor.pay,
        phone: obj.tutor.phone,
        username: obj.tutor.username,
        courseName: obj.course.name
      };
      const find = tutors.find(value => {
        if (value.id === modal.id && value.courseId === modal.courseId) {
          return true;
        }
        return false;
      });
      if (find === undefined) {
        tutors.push(modal);
      }
    });
    return tutors;
  }
}
