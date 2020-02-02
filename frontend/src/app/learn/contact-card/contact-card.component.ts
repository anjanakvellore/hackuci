import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Transaction} from '../../models/transaction';
import {SaveAppointment} from '../../models/saveAppointment';
import {TutorService} from '../../services/tutor/tutor.service';
import {TutorDisplayData} from '../../models/tutorDisplayData';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit, OnChanges {
  @Input() tutorInfo: TutorDisplayData;
  @Input() transactions: Transaction[];

  closeResult: string;
  modalOptions: NgbModalOptions;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(private modalService: NgbModal, private service: TutorService, private profileService: ProfileService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.bookAppointment();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
    console.log('init');
    console.log('tutor is:', this.tutorInfo);
    console.log('transaction: ', this.transactions);

    if (this.transactions) {
      this.transactions = this.transactions.filter(value => {
        if (value.tutorId === this.tutorInfo.id && value.courseId === this.tutorInfo.courseId) {
          return true;
        }
        return false;
      });
      console.log('t: ', this.transactions);
      this.transactions.forEach(value => this.dropdownList.push({id: value.id, date: this.getFormattedDate(value.date)}));
    }

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'date',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnChanges() {
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private getFormattedDate(dateString: string) {
    const date = new Date(dateString);
    let s: string;
    s = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return s;
  }

  private bookAppointment() {
    const saveObj: SaveAppointment = {
      transactions: [],
      student_id: null
    };
    // saveObj = {};
    saveObj.transactions = [];
    this.selectedItems.forEach(value => {
      saveObj.transactions.push(value.id);
    });
    saveObj.student_id = this.profileService.profileDetails.user_id;
    this.service.sendAppointmentStatus(saveObj).subscribe(x => {
      console.log('Done');
      this.selectedItems = [];
    });
  }
}




