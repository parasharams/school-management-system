import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];

  constructor(private fb: FormBuilder, private classservice: ClassService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'New Class', path: '/', active: true }];
    this.List();
    this.Form = this.fb.group({
      ClassId: [''],
      ClassName: ['', Validators.required]
    });
  }

  get form1() { return this.Form.controls; }
  // Create() {
  //   console.log("Data", this.Form.value);
  //   if (this.Form.valid) {
  //     this.classservice.insertData(this.Form.value).subscribe((res) => {
  //       console.log(res, 'Class Added Successfully!')
  //       this.Form.reset();
  //       this.List();
  //       this.successMsg = res.message;
  //     })
  //   } else {
  //     this.errMsg = "All Fields Are Required";
  //   }
  // }  
  
  Create() {
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      this.classservice.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Class Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = "";
        },  
        (err) => {
          // Show error message if the class name already exists
          if (err.status === 400) {
            this.errMsg = err.error.message; // "Class name already exists"
          } else {
            this.successMsg = "";
            this.errMsg = "Class name already exists.";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  } 
  List() {
    this.classservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.ClassData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(ClassId: any): void {
    this.isEditing = true;
    this.classservice.getByIdData(ClassId).subscribe((res) => {
      const Class = res.data;
      console.log('Class Data:', Class);
      this.Form.patchValue(res.data[0]);
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const ClassId = this.Form.get('ClassId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Class ID:', ClassId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.classservice.updateData(ClassId, this.Form.value).subscribe((res) => {
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
  Delete(ClassId: any) {
    if (confirm('Are you sure you want to delete this Class?')) {
        this.classservice.deleteData(ClassId).subscribe(
            (res) => {
                console.log(res, 'Class deleted successfully!');
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
