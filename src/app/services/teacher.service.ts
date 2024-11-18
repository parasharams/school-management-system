import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  
  ApiTeacher: string= 'http://localhost:3000/teacher';
  ApiTechAtten: string= 'http://localhost:3000/teacherattendance';
  ApiTechAttenStatus: string= 'http://localhost:3000/teacherattendancestatus';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiTeacher}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiTeacher).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(TeacherId: any) { 
    const params = new HttpParams()
        .set('TeacherId', TeacherId);
    return this.http.get<any>(`${this.ApiTeacher}/${TeacherId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(TeacherId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiTeacher}/${TeacherId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(TeacherId: any): Observable<any> {
    return this.http.delete(`${this.ApiTeacher}/${TeacherId}`).pipe(
      catchError(this.handleError)
    );
  }  
  listDataAtten(): Observable<any> {
    return this.http.get(this.ApiTechAtten).pipe(
      catchError(this.handleError)
    );
  }
  getTechlistStatus(): Observable<any> {
    return this.http.get(this.ApiTechAttenStatus).pipe(
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
