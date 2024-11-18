import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  
  ApiFees: string= 'http://localhost:3000/fees';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiFees}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiFees).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(FeesId: any) { 
    const params = new HttpParams()
        .set('FeesId', FeesId);
    return this.http.get<any>(`${this.ApiFees}/${FeesId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(FeesId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiFees}/${FeesId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(FeesId: any): Observable<any> {
    return this.http.delete(`${this.ApiFees}/${FeesId}`).pipe(
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
