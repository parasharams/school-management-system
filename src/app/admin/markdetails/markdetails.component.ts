import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExamService } from 'src/app/services/exam.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-markdetails',
  templateUrl: './markdetails.component.html',
  styleUrls: ['./markdetails.component.scss']
})
export class MarkdetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  ExamData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  selectedClassId: number | null = null;
  selectedExamId: any = null; 
  selectedRollNo: string | null = null;
  UniqueRollNos: any[] = [];
  UniqueExam: any[] = [];
  ExamList: any[] = [];
  examMap: { [key: number]: string } = {};

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private studservice: StudentService, private examservice: ExamService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Mark Details', path: '/', active: true }];
    this.ClassList();
    this.SubjectList();
    this.ExamsList();
    this.ListData();
    //this.StudentList();
    this.Form = this.fb.group({
      MarkId: [''],
      ClassId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      ExId: ['', Validators.required],
      RollNo: ['', Validators.required],
      TotalMarks: ['', Validators.required],
      OutofMarks: ['', Validators.required]
    });
  }

  get form1() { return this.Form.controls; }
  
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
        this.SubjectData = res.data;
        console.log('Get SubjectData', this.SubjectData);
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
  ListData() {
    this.examservice.listData()
      .subscribe(
        (res: any) => {
          this.ExamData = res.data;
          console.log('API Response:', this.ExamData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }
  onChangeClass() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    if (this.selectedClassId) {
      const filteredData = this.ExamData.filter(record => record.ClassId == this.selectedClassId);
      this.UniqueRollNos = Array.from(new Set(filteredData.map(item => item.RollNo)));
      // this.UniqueExam = Array.from(new Set(filteredData.map(item => item.ExId)));
      console.log('Unique Data:', this.UniqueRollNos);
    } else {
      // this.UniqueExam = [];
      this.UniqueRollNos = [];
    }
  } 
  onChangeExam() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedExamId = this.Form.get('ExId')?.value;  
    console.log('selectedClassId:', this.selectedClassId);
    console.log('selectedExamId:', this.selectedExamId);
  }  
  GetData() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedExamId = this.Form.get('ExId')?.value;
    this.selectedRollNo = this.Form.get('RollNo')?.value;
    console.log('selectedClassId:', this.selectedClassId);
    console.log('selectedExamId:', this.selectedExamId);
    console.log('selectedRollNo:', this.selectedRollNo);  
    if (this.selectedClassId || this.selectedExamId || this.selectedRollNo) {
      let filteredData = this.ExamData;  
      // Filter by selectedClassId if it exists
      if (this.selectedClassId) {
        filteredData = filteredData.filter(record => record.ClassId == this.selectedClassId);
      }  
      // Filter by selectedExamId if it exists
      if (this.selectedExamId) {
        filteredData = filteredData.filter(record => record.ExId == this.selectedExamId);
      }  
      // Filter by selectedRollNo if it exists
      if (this.selectedRollNo) {
        filteredData = filteredData.filter(record => record.RollNo == this.selectedRollNo);
      }  
      // Filter unique RollNo records
      // const uniqueRecords = new Map();
      // filteredData.forEach(record => {
      //   if (!uniqueRecords.has(record.RollNo)) {
      //     uniqueRecords.set(record.RollNo, record);
      //   }
      // });
      // Set filtered data to StudentData
      this.StudentData = filteredData;
      // this.StudentData = Array.from(uniqueRecords.values());
      console.log('Student Exam Data:', this.StudentData);  
      if (this.StudentData.length === 0) {
        this.errMsg = "No data found for the selected filters.";
        this.successMsg = '';
      } else {
        this.successMsg = "Data loaded successfully.";
        this.errMsg = '';
      }
    } else {
      // If no filter is applied, reset fields and show error message
      this.UniqueRollNos = [];
      this.StudentData = [];
      this.successMsg = '';
      this.errMsg = "Please select at least one field to filter data.";
    }
  }
  
  Cancel() { 
    this.Form.reset(); 
    this.StudentData = [];
  } 
}
