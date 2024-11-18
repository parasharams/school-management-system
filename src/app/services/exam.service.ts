import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  
  ApiExam: string= 'http://localhost:3000/exam';
  ApiResult: string= 'http://localhost:3000/examDataStudectId';
  ApiSubMarks: string= 'http://localhost:3000/subjectmarks';
  ApiExamSession: string= 'http://localhost:3000/examsession';
  apiUrl: string= 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  insertExamData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiExamSession}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listExamData(): Observable<any> {
    return this.http.get(this.ApiExamSession).pipe(
      catchError(this.handleError)
    );
  }
  getByExamIdData(ExId: any) { 
    const params = new HttpParams()
        .set('ExId', ExId);
    return this.http.get<any>(`${this.ApiExamSession}/${ExId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateExamData(ExId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiExamSession}/${ExId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteExamData(ExId: any): Observable<any> {
    return this.http.delete(`${this.ApiExamSession}/${ExId}`).pipe(
      catchError(this.handleError)
    );
  }

  insertMarkData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiSubMarks}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listMarkData(): Observable<any> {
    return this.http.get(this.ApiSubMarks).pipe(
      catchError(this.handleError)
    );
  }
  getByMarkIdData(MarkId: any) { 
    const params = new HttpParams()
        .set('MarkId', MarkId);
    return this.http.get<any>(`${this.ApiSubMarks}/${MarkId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateMarkData(MarkId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiSubMarks}/${MarkId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteMarkData(MarkId: any): Observable<any> {
    return this.http.delete(`${this.ApiSubMarks}/${MarkId}`).pipe(
      catchError(this.handleError)
    );
  }
  
  insertData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.ApiExam}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listData(): Observable<any> {
    return this.http.get(this.ApiExam).pipe(
      catchError(this.handleError)
    );
  }
  getByIdData(ExamId: any) { 
    const params = new HttpParams()
        .set('ExamId', ExamId);
    return this.http.get<any>(`${this.ApiExam}/${ExamId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  getDataByStudentId(StudentId: any) { 
    const params = new HttpParams()
        .set('StudentId', StudentId);
    return this.http.get<any>(`${this.ApiResult}/${StudentId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateData(ExamId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.ApiExam}/${ExamId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(ExamId: any): Observable<any> {
    return this.http.delete(`${this.ApiExam}/${ExamId}`).pipe(
      catchError(this.handleError)
    );
  }

  getClassStudent(ClassId: any) { 
    const params = new HttpParams()
        .set('ClassId', ClassId);
    return this.http.get<any>(`${this.apiUrl}/ClassStudent/${ClassId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  getClassSubject(ClassId: any) {
    const params = new HttpParams().set('ClassId', ClassId);
    return this.http.get(`${this.apiUrl}/subjectClass/${ClassId}`, { params });
  }
  getClassExam(ClassId: any) { 
    const params = new HttpParams()
        .set('ClassId', ClassId);
    return this.http.get<any>(`${this.apiUrl}/ClassExam/${ClassId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  getCSESubMark(ClassId: any, ExId: any) { 
    const params = new HttpParams()
        .set('ClassId', ClassId)
        .set('ExId', ExId);
    return this.http.get<any>(`${this.apiUrl}/CSEsubjectmarks`, { params }).pipe(
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
