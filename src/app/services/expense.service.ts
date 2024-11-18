import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  ApiExpense: string= 'http://localhost:3000/expense';

  constructor(private http: HttpClient) { }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiExpense}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiExpense).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(ExpenseId: any) { 
    const params = new HttpParams()
        .set('ExpenseId', ExpenseId);
    return this.http.get<any>(`${this.ApiExpense}/${ExpenseId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(ExpenseId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiExpense}/${ExpenseId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(ExpenseId: any): Observable<any> {
    return this.http.delete(`${this.ApiExpense}/${ExpenseId}`).pipe(
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
