import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  classMap: { [key: number]: string } = {};

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'New Subject', path: '/', active: true }];
    this.ClassList();
    this.List();
    this.Form = this.fb.group({
      SubjectId: [''],
      SubjectName: ['', Validators.required],
      ClassId: ['', Validators.required]
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
  Create() {
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      // Call the backend to add the class
      this.subservice.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Subject Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = "";
        },
        (err) => {
          // Show error message if the classID and SubjectID already exist
          if (err.status === 400) {
            this.errMsg = err.error.message; // "Class subject already exists!"
          } else {
            this.successMsg = "";
            this.errMsg = "Class subject already exists!";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  List() {
    this.subservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.SubjectData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(SubjectId: any): void {
    this.isEditing = true;
    this.subservice.getByIdData(SubjectId).subscribe((res) => {
      const Class = res.data;
      console.log('Subject Data:', Class);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const SubjectId = this.Form.get('SubjectId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Subject ID:', SubjectId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.subservice.updateData(SubjectId, this.Form.value).subscribe((res) => {
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
  Delete(SubjectId: any) {
    if (confirm('Are you sure you want to delete this Subject?')) {
        this.subservice.deleteData(SubjectId).subscribe(
            (res) => {
                console.log(res, 'Subject deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Subject');
                this.successMsg = 'Error occurred while deleting Subject';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
