import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  public getAllSubjects():Observable<any>{
    const localUrl = "http://169.234.110.139:5000/allsubjects";
    return this.http.get(localUrl);

  }

}
