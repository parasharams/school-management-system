import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isYearwise: boolean = true;
  ClassData: any[] = [];
  StudentData: any[] = [];
  classMap: { [key: number]: string } = {};
  yearsList: number[] = [];
  selectedYear: number | null = null;
  selectedClass: number | null = null;
  selectedRollNo: number | null = null;
  FilteredStudentData: any[] = [];

  constructor(private fb: FormBuilder, private classservice: ClassService, private studservice: StudentService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Student List', path: '/', active: true }];
    this.ClassList();
    this.List();
    const startYear = 2015; // Define the start year
    const endYear = new Date().getFullYear(); // End year is the current year
    for (let year = startYear; year <= endYear; year++) {
      this.yearsList.push(year);
    }
    this.Form = this.fb.group({
      StudentId: [''],
      StudentName: ['', Validators.required],
      Gender: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Mobile: ['', Validators.required],
      RollNo: ['', Validators.required],
      Address: ['', Validators.required],
      ClassId: ['', Validators.required],
      AdmissionDate: ['', Validators.required]
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
  List() {
    this.studservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.StudentData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  } 
  onChangeYear() {
    this.selectedYear = this.Form.get('AdmissionDate')?.value;
    console.log('selectedYear:', this.selectedYear);
  } 
  onChangeClass() {
    this.selectedClass = this.Form.get('ClassId')?.value;
    console.log('selectedClass:', this.selectedClass);
  }  
  onChangeRoll() {
    this.selectedRollNo= this.Form.get('RollNo')?.value;
    console.log('selectedRollNo:', this.selectedRollNo);
  }
  GetStudentData() { 
    const selectedYear = this.Form.get('AdmissionDate')?.value; 
    const selectedClass = this.Form.get('ClassId')?.value;
    const selectedRollNo = this.Form.get('RollNo')?.value;  
    if (selectedYear) {
      const selectedDate = new Date(selectedYear);
      const formattedYear = selectedDate.getFullYear().toString(); // Extract "YYYY"      
      console.log('Selected Year:', formattedYear);  
      console.log('Selected Class:', selectedClass);
      console.log('Selected Roll No:', selectedRollNo);  
      // Filtering logic based on selections
      if (selectedClass && selectedRollNo) {
        // Filter by AdmissionDate, ClassId, and RollNo
        this.FilteredStudentData = this.StudentData.filter(record =>
          new Date(record.AdmissionDate).getFullYear().toString() === formattedYear &&
          record.ClassId == selectedClass &&
          record.RollNo == selectedRollNo
        );
      } else if (selectedClass) {
        // Filter by AdmissionDate and ClassId
        this.FilteredStudentData = this.StudentData.filter(record =>
          new Date(record.AdmissionDate).getFullYear().toString() === formattedYear &&
          record.ClassId == selectedClass
        );
      } else {
        // Filter by only AdmissionDate
        this.FilteredStudentData = this.StudentData.filter(record =>
          new Date(record.AdmissionDate).getFullYear().toString() === formattedYear
        );
      }  
      console.log('Filtered Student Data:', this.FilteredStudentData);
      this.errMsg = this.FilteredStudentData.length ? "" : "No data found";
    } else {
      this.errMsg = "Please select a valid values.";
      console.log('Error: No year selected.');
    }
  }
  Edit(StudentId: any): void {
    this.studservice.getByIdData(StudentId).subscribe((res) => {
      const Student = res.data;
      console.log('Student Data:', Student);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Cancel() { 
    this.Form.reset(); 
  } 
}
