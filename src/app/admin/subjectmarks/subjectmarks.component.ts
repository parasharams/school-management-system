import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExamService } from 'src/app/services/exam.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-subjectmarks',
  templateUrl: './subjectmarks.component.html',
  styleUrls: ['./subjectmarks.component.scss']
})
export class SubjectmarksComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  ExamList: any[] = [];
  ExamData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  studentMap: { [key: number]: string } = {};
  examMap: { [key: number]: string } = {};
  selectedClassId: any = null;
  selectedExamId: any = null;
  selectedClassSubject: string[] = [];  
  subjects: any[] = [];
  SubjectListData: any[] = [];
  StudfilteredData: any[] = [];
  SubjectsData: any[] = [];
  filteredSubjectsData: any[] = [];
  selectedClassSubjectList: any[] = [];

  ClassListData: any[] = [];

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private studservice: StudentService, private examservice: ExamService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Subject Marks', path: '/', active: true }];
    this.ClassList();
    this.SubjectList();
    this.ExamsList();
    this.List();
    this.Form = this.fb.group({
      MarkId: [''],
      ClassId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      OutOfMarks: ['', Validators.required],
      ExId: ['', Validators.required]
    });
  }
  get form1() { return this.Form.controls; }
  onClassSelected(): void {
    const selectedClassId = this.Form.get('ClassId')?.value;
    console.log('Select Class', selectedClassId);  
    if (selectedClassId) {
      this.subservice.getClassSubject(selectedClassId).subscribe(
        (response: any) => {
          this.SubjectsData = response.data || [];
          console.log('Class SubjectList', this.SubjectsData);
        },
        (error) => {
          console.error('Error fetching subjects:', error);
          this.SubjectsData = [];
        }
      );
    } else {
      this.SubjectsData = [];
    }
  }
  ClassList() {
    this.classservice.listData()  
      .subscribe((res: any) => {
        console.log('Get All ClassData', res);
        this.ClassData = res.data;
        this.ClassMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  ClassMap() {
    this.classMap = {};
    this.ClassData.forEach((cls: any) => {
        this.classMap[cls.ClassId] = cls.ClassName;
    });
    console.log('Class Map:', this.classMap);
  }
  SubjectList() {
    this.subservice.listData()
      .subscribe((res: any) => {
        console.log('Get SubjectData', this.SubjectData);
        this.SubjectData = res.data;
        this.SubjectMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  SubjectMap() {
    this.subjectMap = {};
    this.SubjectData.forEach((cls: any) => {
        this.subjectMap[cls.SubjectId] = cls.SubjectName;
    });
    console.log('Subject Map:', this.subjectMap);
  }
  ExamsList() {
    this.examservice.listExamData()
      .subscribe((res: any) => {
        this.ExamList = res.data;
        console.log('Get ExamList', this.ExamList);
        this.ExamMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  ExamMap() {
    this.examMap = {};
    this.ExamList.forEach((cls: any) => {
        this.examMap[cls.ExId] = cls.ExamName;
    });
    console.log('Exam Map:', this.examMap);
  }  
  Create() {
    if (this.Form.valid) {
      this.examservice.insertMarkData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Subject Marks Added Successfully!');
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
            this.errMsg = "Selected data already exists";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  List() {
    this.examservice.listMarkData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.ExamData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(MarkId: any): void {
    this.isEditing = true;
    this.examservice.getByMarkIdData(MarkId).subscribe((res) => {
      const Exam = res.data;
      console.log('Exam Data:', Exam);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
      this.onClassSelected();
    });    
  }
  Update() { 
    const MarkId = this.Form.get('MarkId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Exam ID:', MarkId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.examservice.updateMarkData(MarkId, this.Form.value).subscribe((res) => {
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
  Delete(MarkId: any) {
    if (confirm('Are you sure you want to delete this Class?')) {
        this.examservice.deleteMarkData(MarkId).subscribe(
            (res) => {
                console.log(res, 'Exam deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Class');
                this.successMsg = 'Error occurred while deleting Class';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
