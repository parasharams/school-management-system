import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearComponent } from './year/year.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { ClassComponent } from './class/class.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [  
  { path: 'year', component: YearComponent },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'class', component: ClassComponent },
  { path: 'exam', component: ExamComponent },
  //{ path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  // { path: 'year', loadChildren: () => import('./year/year.module').then(m => m.ClassModule)},
  // { path: 'class', loadChildren: () => import('./class/class.module').then(m => m.ClassModule)},
  // { path: 'subjects', loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)},
  // { path: 'teachers', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)},
  // { path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
