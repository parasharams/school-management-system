import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularDraggableModule } from 'angular2-draggable';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { Select2Module } from 'ng-select2-component';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamSubjectComponent } from './exam-subject/exam-subject.component';
import { StudentmarkComponent } from './studentmark/studentmark.component';
import { ResultComponent } from './result/result.component';
import { ExamsessionComponent } from './examsession/examsession.component';
import { ManagestudentComponent } from './managestudent/managestudent.component';


@NgModule({
  declarations: [
    ExamSubjectComponent,
    StudentmarkComponent,
    ResultComponent,
    ExamsessionComponent,
    ManagestudentComponent,
  ],
  imports: [
    ExamRoutingModule,
    CommonModule,
    CommonModule,
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
export class ExamModule { }
