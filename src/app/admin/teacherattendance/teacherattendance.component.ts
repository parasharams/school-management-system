import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-teacherattendance',
  templateUrl: './teacherattendance.component.html',
  styleUrls: ['./teacherattendance.component.scss']
})
export class TeacherattendanceComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  TeacherData: any[] = [];
  TeacherTodayData: any[] = [];
  currentDateTime: any;
  TechData: any[] = [];
  techMap: { [key: number]: string } = {};
  AttendanceData: any[] = [];
  TeacherAttendance: any[] = [];

  constructor(private fb: FormBuilder, private techservice: TeacherService, private attenservice: AttendanceService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Teacher Attendance', path: '/', active: true }];
    this.ListData();
    this.TechList();
    this.updateDateTime();
    this.GetTodayAttendance();
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
    this.techservice.getTechlistStatus()
      .subscribe(
        (res: any) => {
          this.TeacherData = res.data;
          console.log('API Response:', this.TeacherData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }
  onCheckboxChange(item: any) {
    item.Status = item.Status === 1 ? 0 : 1;
    console.log(item.Status)
  }
  TechList() {
    this.techservice.listData()
      .subscribe((res: any) => {
        this.TechData = res.data;
        console.log('Get TechData', this.TechData);
        this.TeacherMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  TeacherMap() {
    this.techMap = {};
    this.TechData.forEach((cls: any) => {
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
  GetTodayAttendance() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.attenservice.techlistData()
      .subscribe(
        (res: any) => {
          this.TeacherAttendance = res.data;
          console.log('API Response Teacher:', this.TeacherAttendance);
          this.TeacherTodayData = this.TeacherAttendance.filter(record => {
            const recordDate = new Date(record.Date);
            recordDate.setHours(0, 0, 0, 0);
            return recordDate.getTime() === todayDate.getTime();
          });
          console.log('Filtered Teacher Today Data:', this.TeacherTodayData);
        },
        (err: any) => {
          console.error('Error:', err);
          alert("Something Went Wrong");
        }
      );
  }
  saveTeacherAttendance() {
    const dataToSave = this.TeacherData
        .filter(item => item.Status === '1' || item.Status === '0') // Only checked rows
        .map(item => ({
            TeacherId: item.TeacherId,
            status: item.Status,
            date: new Date().toISOString().split('T')[0]
        }));    
    if (dataToSave.length > 0) {
        this.attenservice.techInsertData(dataToSave).subscribe(
            (res) => {
                console.log('Attendance Added Successfully!', res);
                this.Form.reset();
                location.reload();
                this.successMsg = 'Attendance saved successfully!';
            },
            (err) => {
                if (err.status === 400) {
                    this.errMsg = err.error.message;
                } else {
                    this.errMsg = "Attendance for this already exists.";
                }
            }
        );
    } else {
        this.errMsg = 'No attendance data selected to save.';
    }
  }
}
