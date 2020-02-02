import {Pipe, PipeTransform} from '@angular/core';
import {Tutor} from '../../models/tutor';
import {Course} from '../../models/course';
import {TutorDisplayData} from '../../models/tutorDisplayData';
import {ProfileService} from 'src/app/services/profile/profile.service';


@Pipe({
  name: 'tutorFilter',
  pure: false
})
export class TutorFilterPipe implements PipeTransform {

  constructor(private profileService: ProfileService) {
  }

  transform(items: Tutor[], nameFilter: string, courseFilter: Course[]): TutorDisplayData[] {
    if (!(items)) {
      return items;
    }
    if (this.profileService != null) {
      // @ts-ignore
      items = items.filter(item => item.id !== this.profileService.profileDetails.user_id);
    }
    if (!nameFilter && !courseFilter) {
      return items;
    }
    if (nameFilter) {
      items = items.filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase())
        || item.username.toLowerCase().includes(nameFilter.toLowerCase()));
    }
    if (courseFilter && courseFilter.length > 0) {
      items = items.filter(item => {
        let isPresent: boolean;
        isPresent = true;
        courseFilter.forEach(value => {
          isPresent = isPresent && (value.id === item.courseId);
        });
        return isPresent;
      });
    }
    return items;
  }

}
