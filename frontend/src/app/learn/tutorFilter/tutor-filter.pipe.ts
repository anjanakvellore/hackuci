import {Pipe, PipeTransform} from '@angular/core';
import {Tutor} from '../../models/tutor';
import {Course} from '../../models/course';
import {TutorDisplayData} from '../../models/tutorDisplayData';


@Pipe({
  name: 'tutorFilter',
  pure: false
})
export class TutorFilterPipe implements PipeTransform {

  transform(items: Tutor[], nameFilter: string, courseFilter: Course[]): TutorDisplayData[] {
    if (!items || (!nameFilter && !courseFilter)) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out\

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
