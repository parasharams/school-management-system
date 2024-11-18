import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  TeacherData: any[] = [];

  constructor(private fb: FormBuilder, private techservice: TeacherService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Teacher', path: '/', active: true }];
    this.List();
    this.Form = this.fb.group({
      TeacherId: [''],
      TeacherName: ['', Validators.required],
      Gender: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Mobile: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  get form1() { return this.Form.controls; }

  Create() {
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      // Call the backend to add the class
      this.techservice.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Teacher Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = "";
        },
        (err) => {
          // Show error message if the classID and SubjectID already exist
          if (err.status === 400) {
            this.errMsg = err.error.message; // "ClassID and SubjectID combination already exists"
          } else {
            this.successMsg = "";
            this.errMsg = "Email Id already exists.";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  List() {
    this.techservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.TeacherData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(TeacherId: any): void {
    this.isEditing = true;
    this.techservice.getByIdData(TeacherId).subscribe((res) => {
      const Teacher = res.data;
      console.log('Teacher Data:', Teacher);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const TeacherId = this.Form.get('TeacherId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Teacher ID:', TeacherId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.techservice.updateData(TeacherId, this.Form.value).subscribe((res) => {
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
  Delete(TeacherId: any) {
    if (confirm('Are you sure you want to delete this Teacher?')) {
        this.techservice.deleteData(TeacherId).subscribe(
            (res) => {
                console.log(res, 'Teacher deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Teacher');
                this.successMsg = 'Error occurred while deleting Teacher';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
