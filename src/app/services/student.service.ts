import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  ApiStudent: string= 'http://localhost:3000/student';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiStudent}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiStudent).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(StudentId: any) { 
    const params = new HttpParams()
        .set('StudentId', StudentId);
    return this.http.get<any>(`${this.ApiStudent}/${StudentId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(StudentId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiStudent}/${StudentId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(StudentId: any): Observable<any> {
    return this.http.delete(`${this.ApiStudent}/${StudentId}`).pipe(
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
