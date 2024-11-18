import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularDraggableModule } from 'angular2-draggable';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { YearComponent } from './year/year.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { ClassComponent } from './class/class.component';
import { Select2Module } from 'ng-select2-component';
import { ExamComponent } from './exam/exam.component';


@NgModule({
  declarations: [
    StudentComponent,
    YearComponent,
    TeacherComponent,
    SubjectComponent,
    ClassComponent,
    ExamComponent,
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    PageTitleModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    WidgetModule,
    AngularDraggableModule,
    AdvancedTableModule,
    Select2Module,
  ]
})
export class MastersModule { }
