import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  apiUrlStudent: string = 'http://localhost:3000/student';
  apiYear: string='http://localhost:3000/year';
  apiSubject: string='http://localhost:3000/subject';
  apiClass: string= 'http://localhost:3000/class';
  apiTeacher: string='http://localhost:3000/teacher';
  apiExam: string='http://localhost:3000/exam';
  apiES: string='http://localhost:3000/exam_session';
  apiSubMark: string='http://localhost:3000/subject_mark';
  apistudMark: string='http://localhost:3000/student_mark';
  apiCS: string='http://localhost:3000/class_standard';
  apiSMS: string='http://localhost:3000/subject_mark_standard';

  constructor(private http: HttpClient) { } 

  //Student Table Data
  createStudData(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiUrlStudent}`, data).pipe(
      catchError(this.handleError)
    );
  }
  studentlist(): Observable<any> {
    return this.http.get(this.apiUrlStudent).pipe(
      catchError(this.handleError)
    );
  }
  getStudentDataById(studentId: any) { 
    const params = new HttpParams()
        .set('studentId', studentId);
    return this.http.get<any>(`${this.apiUrlStudent}/${studentId}`,{ params }).pipe(
        catchError(this.handleError)
    );
  }  
  updateStudentData(studentId: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlStudent}/${studentId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteStudent(studentId: any): Observable<any> {
    return this.http.delete(`${this.apiUrlStudent}/${studentId}`).pipe(
      catchError(this.handleError)
    );
  }
  getStudentsByYearClass(yearId: any, classId: any) {    
    const params = new HttpParams()
        .set('yearId', yearId)
        .set('classId', classId);    
    return this.http.get<any>(`${this.apiCS}`, { params }).pipe(
        catchError(this.handleError)
    );
  } 

  //Year Table Data
  createYear(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiYear}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listYear(): Observable<any> {
    return this.http.get(this.apiYear).pipe(
      catchError(this.handleError)
    );
  }
  getYearById(yearId: any) {
    const params = new HttpParams()
        .set('yearId', yearId);
    return this.http.get<any>(`${this.apiYear}/${yearId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateYear(yearId: any, data:any): Observable<any> {
    let yid = yearId;
    return this.http.put<any>(`${this.apiYear}/${yid}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteYear(yearId: any): Observable<any> {
    const params = new HttpParams()
        .set('yearId', yearId);
    return this.http.delete(`${this.apiYear}/${yearId}`, {params}).pipe(
      catchError(this.handleError)
    );
  }

  //Class Table Data
  createClass(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiClass}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listClass(): Observable<any> {
    return this.http.get(this.apiClass).pipe(
      catchError(this.handleError)
    );
  }
  getClassById(classId: any) { 
    const params = new HttpParams()
        .set('classId', classId);
    return this.http.get<any>(`${this.apiClass}/${classId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  getClassExamById(examId: any, classId: any) { 
    const params = new HttpParams()
        .set('examId', examId)
        .set('classId', classId);
    return this.http.get<any>(`${this.apiClass}/${classId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateClass(classId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiClass}/${classId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteClass(classId: any): Observable<any> {
    return this.http.delete(`${this.apiClass}/${classId}`).pipe(
      catchError(this.handleError)
    );
  }

  //Subject Table Data
  createSubject(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiSubject}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listSubject(): Observable<any> {
    return this.http.get(this.apiSubject).pipe(
      catchError(this.handleError)
    );
  }
  getSubjectById(subjectId: any) {
    const params = new HttpParams()
        .set('Subject ID', subjectId);
    return this.http.get<any>(`${this.apiSubject}`, { params }).pipe(
        catchError(this.handleError)
    );
  }
  updateSubject(subjectId: any, data:any): Observable<any> {
    let subid = subjectId;
    return this.http.put<any>(`${this.apiSubject}/${subid}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteSubject(subjectId: any): Observable<any> {
    return this.http.delete(`${this.apiSubject}/${subjectId}`).pipe(
      catchError(this.handleError)
    );
  }

  //Teacher Table Data
  createTeacher(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiTeacher}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listTeacher(): Observable<any> {
    return this.http.get(this.apiTeacher).pipe(
      catchError(this.handleError)
    );
  }
  getTeacherById(teacherId: any) {
    const params = new HttpParams()
        .set('classId', teacherId);
    return this.http.get<any>(`${this.apiTeacher}/${teacherId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateTeacher(teacherId: any, data:any): Observable<any> {
    let tid = teacherId;
    return this.http.put<any>(`${this.apiTeacher}/${tid}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteTeacher(teacherId: any): Observable<any> {
    return this.http.delete(`${this.apiTeacher}/${teacherId}`).pipe(
      catchError(this.handleError)
    );
  }

  //Exam Table Data
  createExam(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiExam}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listExam(): Observable<any> {
    return this.http.get(this.apiExam).pipe(
      catchError(this.handleError)
    );
  }
  getExamById(examId: any) {
    const params = new HttpParams()
        .set('examId', examId);
    return this.http.get<any>(`${this.apiExam}/${examId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateExam(examId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiExam}/${examId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteExam(examId: any): Observable<any> {
    return this.http.delete(`${this.apiExam}/${examId}`).pipe(
      catchError(this.handleError)
    );
  }  

  //Exam Table Data
  createES(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiES}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listES(): Observable<any> {
    return this.http.get(this.apiES).pipe(
      catchError(this.handleError)
    );
  }
  getESById(esId: any) {
    const params = new HttpParams()
        .set('esId', esId);
    return this.http.get<any>(`${this.apiES}/${esId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateES(esId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiES}/${esId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteES(esId: any): Observable<any> {
    return this.http.delete(`${this.apiES}/${esId}`).pipe(
      catchError(this.handleError)
    );
  }  
  
  //ExamData Table Data
  insertED(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apiSubMark}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listED(): Observable<any> {
    return this.http.get(this.apiSubMark).pipe(
      catchError(this.handleError)
    );
  }
  getByIdED(submarkId: any) {
    const params = new HttpParams()
        .set('submarkId', submarkId);
    return this.http.get<any>(`${this.apiSubMark}/${submarkId}`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  updateED(submarkId: any, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiSubMark}/${submarkId}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteED(submarkId: any): Observable<any> {
    let marid = submarkId;
    return this.http.delete(`${this.apiSubMark}/${marid}`).pipe(
      catchError(this.handleError)
    );
  }
  
  //Student Marks Table Data
  insertSM(data:any): Observable<any> {
    console.log(data,'Data created')
    return this.http.post(`${this.apistudMark}`, data).pipe(
      catchError(this.handleError)
    );
  }
  listSM(): Observable<any> {
    return this.http.get(this.apistudMark).pipe(
      catchError(this.handleError)
    );
  }
  getByIdSM(markId: any) {
    let markid = markId;
    return this.http.get<any>(`${this.apistudMark}/${markid}`).pipe(
      catchError(this.handleError)
    );
  }
  updateSM(markId: any, data:any): Observable<any> {
    let markid = markId;
    return this.http.put<any>(`${this.apistudMark}/${markid}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteSM(markId: any): Observable<any> {
    let markid = markId;
    return this.http.delete(`${this.apistudMark}/${markid}`).pipe(
      catchError(this.handleError)
    );
  } 

  getMarksByClassExam(classId: any, examId: any): Observable<any> { 
    const params = new HttpParams()
        .set('classId', classId)
        .set('examId', examId);
    return this.http.get<any>(`${this.apiSMS}`, {params});
  } 

  getResultById(markdataId: any) {
    const params = new HttpParams()
        .set('resultID', markdataId);
    return this.http.get<any>(`${this.apistudMark}`, { params }).pipe(
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
