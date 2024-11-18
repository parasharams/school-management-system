import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExamService } from 'src/app/services/exam.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  ExamData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  studentMap: { [key: number]: string } = {};

  classControl = new FormControl(null);  
  selectedClassId: any = null;
  selectedSubjectId: any = null; 
  selectedRollno: any = null; 
  subjects: any[] = [];
  SubjectListData: any[] = [];
  StudfilteredData: any[] = [];
  SubjectMarkData: any[] = [];
  SubjectMarks: any[] = [];
  StudentListData: any[] = [];
  SelectedStudentId: any[] = [];
  monthNames:any[] = [];

  constructor(private fb: FormBuilder, private examservice: ExamService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Marks', path: '/', active: true }];
    this.List();
    this.Form = this.fb.group({
      ExId: [''],
      ExamName: ['', Validators.required],
      ExamSession: ['', Validators.required]
    });
    this.monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  }    

  get form1() { return this.Form.controls; }

  Create() {
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      this.examservice.insertExamData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Exam Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = '';
        },
        (err) => {
          if (err.status === 400) {
            this.errMsg = err.error.message;
          } else {
            this.successMsg = '';
            this.errMsg = "Already exists";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  List() {
    this.examservice.listExamData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.ExamData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(ExId: any): void {
    this.isEditing = true;
    this.examservice.getByExamIdData(ExId).subscribe((res) => {
      const Exam = res.data;
      console.log('Exam Data:', Exam);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const ExId = this.Form.get('ExId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Exam ID:', ExId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.examservice.updateExamData(ExId, this.Form.value).subscribe((res) => {
        console.log(res, 'Data updated successfully!');
        this.successMsg = res.message;
        console.log('Request Data:', this.Form.value);
        this.Form.reset();
        this.List();
      });
    } else {
      this.successMsg = 'All Fields are Required';
    }  
    setTimeout(() => {
      this.successMsg = null;
    }, 1000);
  }  
  Delete(ExId: any) {
    if (confirm('Are you sure you want to delete this Exam?')) {
        this.examservice.deleteExamData(ExId).subscribe(
            (res) => {
                console.log(res, 'Exam deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Exam');
                this.successMsg = 'Error occurred while deleting Exam';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
