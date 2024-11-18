import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  StudentData: any[] = [];
  classMap: { [key: number]: string } = {};
  currentDateTime: any;

  constructor(private fb: FormBuilder, private classservice: ClassService, private studservice: StudentService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Student', path: '/', active: true }];
    this.ClassList();
    this.List();
    this.updateDateTime();
    this.Form = this.fb.group({
      StudentId: [''],
      StudentName: ['', Validators.required],
      Gender: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Mobile: ['', Validators.required],
      RollNo: ['', Validators.required],
      Address: ['', Validators.required],
      ClassId: ['', Validators.required],
      AdmissionDate: [this.currentDateTime, Validators.required]
    });
  }

  get form1() { return this.Form.controls; }
  
  updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0'); // Ensures a two-digit day
    this.currentDateTime = `${year}-${month}-${day}`;
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
  Create() {
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      // Call the backend to add the class
      this.studservice.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Student Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = '';
        },
        (err) => {
          // Show error message if the classID and SubjectID already exist
          if (err.status === 400) {
            this.errMsg = err.error.message; // "ClassID and SubjectID combination already exists"
          } else {
            this.successMsg = '';
            this.errMsg = "Student RollNo already exists!";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
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
  Edit(StudentId: any): void {
    this.isEditing = true;
    this.studservice.getByIdData(StudentId).subscribe((res) => {
      const Student = res.data;
      console.log('Student Data:', Student);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const StudentId = this.Form.get('StudentId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Student ID:', StudentId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.studservice.updateData(StudentId, this.Form.value).subscribe((res) => {
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
  Delete(StudentId: any) {
    if (confirm('Are you sure you want to delete this Student?')) {
        this.studservice.deleteData(StudentId).subscribe(
            (res) => {
                console.log(res, 'Student deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Student');
                this.successMsg = 'Error occurred while deleting Student';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
