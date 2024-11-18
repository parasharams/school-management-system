import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { ClassfeesComponent } from './classfees/classfees.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeachersubjectComponent } from './teachersubject/teachersubject.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensedetailsComponent } from './expensedetails/expensedetails.component';
import { StudentComponent } from './student/student.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { ExamComponent } from './exam/exam.component';
import { SubjectmarksComponent } from './subjectmarks/subjectmarks.component';
import { MarksComponent } from './marks/marks.component';
import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { TeacherattendanceComponent } from './teacherattendance/teacherattendance.component';
import { MarkdetailsComponent } from './markdetails/markdetails.component';
import { StudentattendancedetailsComponent } from './studentattendancedetails/studentattendancedetails.component';
import { TeacherattendancedetailsComponent } from './teacherattendancedetails/teacherattendancedetails.component';
import { ResultComponent } from './result/result.component';
import { MarklistComponent } from './marklist/marklist.component';

const routes: Routes = [
  { path: 'class', component: ClassComponent },
  { path: 'class-fees', component: ClassfeesComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'teacher-subject', component: TeachersubjectComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'expense-details', component: ExpensedetailsComponent },
  { path: 'students', component: StudentComponent },
  { path: 'studentlist', component: StudentlistComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'subject-marks', component: SubjectmarksComponent },
  { path: 'marks', component: MarksComponent },
  { path: 'mark-details', component: MarkdetailsComponent },
  { path: 'student-attendance', component: StudentattendanceComponent },
  { path: 'student-attendance-details', component: StudentattendancedetailsComponent },
  { path: 'teacher-attendance', component: TeacherattendanceComponent },
  { path: 'teacher-attendance-details', component: TeacherattendancedetailsComponent },
  { path: 'results', component: ResultComponent },
  { path: 'results/:StudentId', component: MarklistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
