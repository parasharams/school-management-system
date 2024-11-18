import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  
  ApiClass: string= 'http://localhost:3000/class';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiClass}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiClass).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(ClassId: any) { 
    const params = new HttpParams()
        .set('ClassId', ClassId);
    return this.http.get<any>(`${this.ApiClass}/${ClassId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(ClassId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiClass}/${ClassId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(ClassId: any): Observable<any> {
    return this.http.delete(`${this.ApiClass}/${ClassId}`).pipe(
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
