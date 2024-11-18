import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-teacherattendancedetails',
  templateUrl: './teacherattendancedetails.component.html',
  styleUrls: ['./teacherattendancedetails.component.scss']
})
export class TeacherattendancedetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  TeacherData: any[] = [];
  TeacherListData: any[] = [];
  AttendanceData: any[] = [];
  TeacherAttendance: any[] = [];
  selectedTeacherId: number | null = null;
  selectedMonth: number | null = null;
  TechData: any[] = [];
  techMap: { [key: number]: string } = {};
  currentDateTime: any;

  constructor(private fb: FormBuilder, private techservice: TeacherService, private attenservice: AttendanceService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Teacher Attendance', path: '/', active: true }];
    this.TeacherList();
    this.ListData();
    this.
    updateDateTime();
    this.Form = this.fb.group({
      Id : [''],
      TeacherId: ['', Validators.required],
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
  ListData() {
    this.attenservice.techlistData()
      .subscribe(
        (res: any) => {
          this.AttendanceData = res.data.map((record: any) => {
            const localDate = new Date(record.Date);
            record.Date = localDate.toLocaleDateString('en-CA'); // Formats to YYYY-MM-DD
            return record;
          });
          console.log('API Responses:', this.AttendanceData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }  
  TeacherList() {
    this.techservice.listData()
      .subscribe(
        (res: any) => {
          this.TeacherData = res.data;
          console.log('API Response:', this.TeacherData);
          this.TeacherMap();
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }  
  TeacherMap() {
    this.techMap = {};
    this.TeacherData.forEach((cls: any) => {
        this.techMap[cls.TeacherId] = cls.TeacherName;
    });
    console.log('Teacher Map:', this.techMap);
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
  onChangeTeacher() {
    this.selectedTeacherId = this.Form.get('TeacherId')?.value;
    if (this.selectedTeacherId) {
      this.TeacherListData = this.AttendanceData.filter(record => record.TeacherId == this.selectedTeacherId);
      console.log('TeacherListData:', this.TeacherListData);
    } else {
      this.TeacherListData = [];
    }
  }
  onChangeMonth() {
    this.selectedTeacherId = this.Form.get('TeacherId')?.value;
    this.selectedMonth = this.Form.get('Date')?.value;
    console.log('selectedTeacherId:', this.selectedTeacherId);
    console.log('selectedMonth:', this.selectedMonth);
  }
  GetData() {
    const selectedTeacherId = this.Form.get('TeacherId')?.value;
    const selectedMonth = this.Form.get('Date')?.value;
    const selectedDate = new Date(selectedMonth);
    
    if (isNaN(selectedDate.getTime())) {
        console.error('Invalid Date');
        return;
    }
    const formattedMonth = selectedDate.toISOString().substring(0, 7); // "YYYY-MM"    
    console.log('Selected TeacherId:', selectedTeacherId);
    console.log('Selected Month:', formattedMonth);
    // Filter the attendance data by TeacherId and selectedMonth
    this.TeacherAttendance = this.AttendanceData.filter(record => 
        record.TeacherId == selectedTeacherId && 
        record.Date.substring(0, 7) === formattedMonth // Match only the month part of the Date
    );
    console.log('Filtered TeacherAttendance Data:', this.TeacherAttendance);
    this.errMsg = "";
  }
}
