import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  
  ApiStudAtten: string= 'http://localhost:3000/studentattendance';
  ApiTechAtten: string= 'http://localhost:3000/teacherattendance';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiStudAtten}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiStudAtten).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(Id: any) { 
    const params = new HttpParams()
        .set('Id', Id);
    return this.http.get<any>(`${this.ApiStudAtten}/${Id}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(Id: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiStudAtten}/${Id}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(Id: any): Observable<any> {
    return this.http.delete(`${this.ApiStudAtten}/${Id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  
  techlistData(): Observable<any> {
    return this.http.get(this.ApiTechAtten).pipe(
      catchError(this.handleError)
    );
  }
  techInsertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiTechAtten}`, data).pipe(
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
