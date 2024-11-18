import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamSubjectComponent } from './exam-subject/exam-subject.component';
import { StudentmarkComponent } from './studentmark/studentmark.component';
import { ResultComponent } from './result/result.component';
import { ExamsessionComponent } from './examsession/examsession.component';
import { ManagestudentComponent } from './managestudent/managestudent.component';

const routes: Routes = [
  { path: 'exam-session', component: ExamsessionComponent },
  { path: 'manage-student', component: ManagestudentComponent },
  { path: 'exam-subject-marks', component: ExamSubjectComponent },
  { path: 'student-marks', component: StudentmarkComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
