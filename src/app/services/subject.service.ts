import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  apiUrl: string= 'http://localhost:3000';
  ApiSubject: string= 'http://localhost:3000/subject';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiSubject}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiSubject).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(SubjectId: any) { 
    const params = new HttpParams()
        .set('SubjectId', SubjectId);
    return this.http.get<any>(`${this.ApiSubject}/${SubjectId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(SubjectId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiSubject}/${SubjectId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(SubjectId: any): Observable<any> {
    return this.http.delete(`${this.ApiSubject}/${SubjectId}`).pipe(
      catchError(this.handleError)
    );
  }
  getClassSubject(ClassId: any) {
    const params = new HttpParams().set('ClassId', ClassId);
    return this.http.get(`${this.apiUrl}/subjectClass/${ClassId}`, { params });
  }


  // Handle API errors  zz
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
