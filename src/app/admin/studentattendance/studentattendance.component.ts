import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
@Component({
  selector: 'app-studentattendance',
  templateUrl: './studentattendance.component.html',
  styleUrls: ['./studentattendance.component.scss']
})
export class StudentattendanceComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  StudentList: any[] = [];
  ExamData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  selectedClassId: number | null = null;
  selectedSubjectId: string | null = null;
  SubjectList: any[] = [];
  currentDateTime: any;

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private studservice: StudentService, private attenservice: AttendanceService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Student Attendance', path: '/', active: true }];
    this.ClassList();
    this.SubjectLists();
    this.StudListData();
    this.ListData();
    this.updateDateTime();
    this.Form = this.fb.group({
      Id: [''],
      ClassId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      StudentId: ['', Validators.required],
      RollNo: ['', Validators.required],
      Status: ['', Validators.required],
      Date: ['', Validators.required]
    });
  }

  get form1() { return this.Form.controls; }

  updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.currentDateTime = `Date: ${formattedDate}, ${formattedTime}`;
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
  SubjectLists() {
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
  ListData() {
    this.subservice.listData()
      .subscribe(
        (res: any) => {
          this.SubjectData = res.data;
          console.log('API Response:', this.SubjectData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }
  StudListData() {
    this.studservice.listData()
      .subscribe(
        (res: any) => {
          this.StudentList = res.data;
          console.log('API Response:', this.StudentList);
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
      const filteredData = this.SubjectData.filter(record => record.ClassId == this.selectedClassId);

      const uniqueSubjectsMap = new Map();
      filteredData.forEach(item => {
        if (!uniqueSubjectsMap.has(item.SubjectId)) {
          uniqueSubjectsMap.set(item.SubjectId, item.SubjectName);
        }
      });
      this.SubjectList = Array.from(uniqueSubjectsMap, ([SubjectId, SubjectName]) => ({ SubjectId, SubjectName }));
      console.log('SubjectList:', this.SubjectList);
    } else {
      this.SubjectList = [];
    }
  }
  GetData() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedSubjectId = this.Form.get('SubjectId')?.value;  
    this.StudentData = [];  
    if (!this.selectedClassId && !this.selectedSubjectId) {
      this.errMsg = "Class and Subject is not selected.";
      return;
      this.StudentData = [];
    }  
    if (!this.selectedClassId) {
      this.errMsg = "Class is not selected.";
      return;
      this.StudentData = [];
    }  
    if (!this.selectedSubjectId) {
      this.errMsg = "Subject is not selected.";
      return;
      this.StudentData = [];
    } 
    if (this.selectedClassId && this.selectedSubjectId) {
        this.StudentData = this.StudentList.filter(record => record.ClassId == this.selectedClassId);
        console.log('Filtered Student Data:', this.StudentData);
        this.errMsg = "";
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.StudentData = [];
    this.errMsg = "";
  }
  onCheckboxChange(item: any) {
    item.Status = item.Status === 1 ? 0 : 1;
    console.log(item.Status)
  }
  saveStudentAttendance() {
    const dataToSave = this.StudentData.map(item => ({
      classId: item.ClassId,
      subjectId: this.selectedSubjectId,
      studentId: item.StudentId,
      rollNo: item.RollNo,
      status: item.Status || 0,
      date: new Date().toISOString().split('T')[0]
    }));    
    this.attenservice.insertData(dataToSave).subscribe(
      (res) => {
        console.log('Attendance Added Successfully!', res);
        this.Form.reset();
        this.successMsg = 'Attendance saved successfully!';
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = err.error.message;
        } else {
          this.errMsg = "Attendance for this class and subject already exists.";
        }
      }
    );
  }

}
