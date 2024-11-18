import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { ValidationRoutingModule } from '../pages/forms/validation/validation-routing.module';
import { ClassComponent } from './class/class.component';
import { ClassfeesComponent } from './classfees/classfees.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeachersubjectComponent } from './teachersubject/teachersubject.component';
import { ExpenseComponent } from './expense/expense.component';
import { StudentComponent } from './student/student.component';
import { ExpensedetailsComponent } from './expensedetails/expensedetails.component';
import { AdvancedTableModule } from '../shared/advanced-table/advanced-table.module';
import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { SubjectmarksComponent } from './subjectmarks/subjectmarks.component';
import { MarksComponent } from './marks/marks.component';
import { TeacherattendanceComponent } from './teacherattendance/teacherattendance.component';
import { MarkdetailsComponent } from './markdetails/markdetails.component';
import { StudentattendancedetailsComponent } from './studentattendancedetails/studentattendancedetails.component';
import { TeacherattendancedetailsComponent } from './teacherattendancedetails/teacherattendancedetails.component';
import { ResultComponent } from './result/result.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { ExamComponent } from './exam/exam.component';
import { MarklistComponent } from './marklist/marklist.component';


@NgModule({
  declarations: [
    ClassComponent,
    ClassfeesComponent,
    SubjectComponent,
    TeacherComponent,
    TeachersubjectComponent,
    ExpenseComponent,
    StudentComponent,
    ExpensedetailsComponent,
    StudentattendanceComponent,
    SubjectmarksComponent,
    MarksComponent,
    TeacherattendanceComponent,
    MarkdetailsComponent,
    StudentattendancedetailsComponent,
    TeacherattendancedetailsComponent,
    ResultComponent,
    StudentlistComponent,
    ExamComponent,
    MarklistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PageTitleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    WidgetModule,ValidationRoutingModule,
    AdvancedTableModule,
  ]
})
export class AdminModule { }
