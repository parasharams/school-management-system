import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersubjectService {
  
  ApiTeacherSub: string= 'http://localhost:3000/teachersubject';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiTeacherSub}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiTeacherSub).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(Id: any) { 
    const params = new HttpParams()
        .set('Id', Id);
    return this.http.get<any>(`${this.ApiTeacherSub}/${Id}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(Id: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiTeacherSub}/${Id}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(Id: any): Observable<any> {
    return this.http.delete(`${this.ApiTeacherSub}/${Id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle API errors  
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
