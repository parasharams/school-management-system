import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { FeesService } from 'src/app/services/fees.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-classfees',
  templateUrl: './classfees.component.html',
  styleUrls: ['./classfees.component.scss']
})
export class ClassfeesComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  FeesData: any[] = [];
  classMap: { [key: number]: string } = {};

  constructor(private fb: FormBuilder, private classservice: ClassService, private feesservice: FeesService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Class Fees', path: '/', active: true }];
    this.ClassList();
    this.List();
    this.Form = this.fb.group({
      FeesId: [''],
      ClassId: ['', Validators.required],
      FeesAmount: ['', Validators.required]
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
      this.feesservice.insertData(this.Form.value).subscribe(
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
            this.errMsg = err.error.message; // "Class fees already exists"
          } else {
            this.errMsg = "Class fees already exists.";
            this.successMsg = "";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  } 
  List() {
    this.feesservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.FeesData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(FeesId: any): void {
    this.isEditing = true;
    this.feesservice.getByIdData(FeesId).subscribe((res) => {
      const Fees = res.data;
      console.log('Class Fees Data:', Fees);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const FeesId = this.Form.get('FeesId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('FeesId ID:', FeesId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.feesservice.updateData(FeesId, this.Form.value).subscribe((res) => {
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
  Delete(FeesId: any) {
    if (confirm('Are you sure you want to delete this Class fees?')) {
        this.feesservice.deleteData(FeesId).subscribe(
            (res) => {
                console.log(res, 'Class fees deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Class fees');
                this.successMsg = 'Error occurred while deleting Class fees';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  }  
}
