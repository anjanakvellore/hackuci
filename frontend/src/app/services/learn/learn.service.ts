import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Tutor} from '../../models/tutor';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(private http: HttpClient, private profileService: ProfileService) {
  }

  url = 'http://169.234.110.139:5000';

  public getAllTutors() {
    return this.http.get(`${this.url}/alltutors`).pipe(
      catchError(this.handleError<Tutor[]>('characters', [])));
  }

  public getAllCourses() {
    return this.http.get(`${this.url}/allcourses`).pipe(
      catchError(this.handleError<Tutor[]>('characters', [])));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
