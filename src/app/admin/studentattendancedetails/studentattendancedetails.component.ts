import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-studentattendancedetails',
  templateUrl: './studentattendancedetails.component.html',
  styleUrls: ['./studentattendancedetails.component.scss']
})
export class StudentattendancedetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  StudentList: any[] = [];
  ExamData: any[] = [];
  SubList: any[] = [];
  StudData: any[] = [];
  DateListData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  studentMap: { [key: number]: string } = {};
  selectedClassId: number | null = null;
  selectedSubjectId: string | null = null;
  selectedDate: string | null = null;
  SubjectList: any[] = [];
  currentDateTime: any;

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private studservice: StudentService, private attenservice: AttendanceService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Student Attendance Details', path: '/', active: true }];
    this.ClassList();
    this.SubjectLists();
    this.StudList();
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
  StudList() {
    this.studservice.listData()
      .subscribe((res: any) => {
        console.log('Get StudData', this.StudData);
        this.StudData = res.data;
        this.StudentMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  StudentMap() {
    this.studentMap = {};
    this.StudData.forEach((cls: any) => {
        this.studentMap[cls.StudentId] = cls.StudentName;
    });
    console.log('Subject Map:', this.studentMap);
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
    this.attenservice.listData()
      .subscribe(
        (res: any) => {
          this.DateListData = res.data.map((record: any) => {
            const localDate = new Date(record.Date);
            record.Date = localDate.toLocaleDateString('en-CA'); // Formats to YYYY-MM-DD
            return record;
          });
          console.log('API Response:', this.DateListData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }
  formatDate(date: any): string {
    const validDate = new Date(date);    
    if (isNaN(validDate.getTime())) {
        console.error("Invalid Date");
        return ''; 
    }
    const day = String(validDate.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[validDate.getMonth()];
    const year = validDate.getFullYear();

    return `${day} ${month}, ${year}`;
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
  onChangeSubject() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedSubjectId = this.Form.get('SubjectId')?.value;
    if (this.selectedClassId) {
      this.SubList = this.SubjectData
        .filter(record => record.SubjectId == this.selectedSubjectId);
      console.log('SubList:', this.SubList);
    } else {
      this.SubjectList = [];
    }
  }
  onChangeDate() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedSubjectId = this.Form.get('SubjectId')?.value;
    this.selectedDate = this.Form.get('Date')?.value;
      console.log('selectedDate:', this.selectedDate);
  }
  GetData() { 
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedSubjectId = this.Form.get('SubjectId')?.value;
    this.selectedDate = this.Form.get('Date')?.value;

    // Convert selected date to match data format (YYYY-MM-DD) if it exists
    const formattedDate = this.selectedDate ? new Date(this.selectedDate).toISOString().split('T')[0] : null;
    console.log('Formatted Date:', formattedDate);

    // Filter based on ClassId, SubjectId, and Date (if formattedDate is not null)
    this.StudentData = this.DateListData.filter(record => 
        record.ClassId == this.selectedClassId &&
        record.SubjectId == this.selectedSubjectId &&
        (formattedDate ? record.Date.split('T')[0] === formattedDate : true)
    );

    console.log('Filtered DateListData:', this.DateListData);
    console.log('Filtered Student Data:', this.StudentData);

    // Display an error message if no data found
    this.errMsg = this.StudentData.length ? "" : "No data found for the selected criteria.";
  }


  Cancel() { 
    this.Form.reset(); 
    this.StudentData = [];
    this.errMsg = "";
  }
}
