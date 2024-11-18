import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  ExpenseData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  selectedClassId: number | null = null;
  selectedSubjectId: string | null = null;
  SubjectListData: any[] = [];

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private expservice: ExpenseService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Expense', path: '/', active: true }];
    this.ClassList();
    this.SubjectList();
    this.List();
    this.Form = this.fb.group({
      ExpenseId: [''],
      ClassId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      ChargeAmount: ['', Validators.required]
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
  SubjectList() {
    this.subservice.listData()
      .subscribe((res: any) => {
        console.log('Get All ClassData', res);
        this.SubjectData = res.data;
        this.SubjectMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  SubjectMap() {
    this.subjectMap = {};
    this.SubjectData.forEach((cls: any) => {
        this.subjectMap[cls.SubjectId] = cls.SubjectName;
    });
    console.log('Subject Map:', this.subjectMap);
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
      this.SubjectListData = Array.from(uniqueSubjectsMap, ([SubjectId, SubjectName]) => ({ SubjectId, SubjectName }));
      console.log('SubjectListData:', this.SubjectListData);
    } else {
      this.SubjectListData = [];
    }
  }
  Create() {  
    console.log("Data", this.Form.value);    
    if (this.Form.valid) {
      // Call the backend to add the class
      this.expservice.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Class Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = '';
        },
        (err) => {
          // Show error message if the class name already exists
          if (err.status === 400) {
            this.errMsg = err.error.message; // "Class name already exists"
          } else {
            this.successMsg = '';
            this.errMsg = "Data already exists!";
          }
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  } 
  List() {
    this.expservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.ExpenseData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(ExpenseId: any): void {
    this.isEditing = true;
    this.expservice.getByIdData(ExpenseId).subscribe((res) => {
      const Class = res.data;
      console.log('Class Data:', Class);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const ExpenseId = this.Form.get('ExpenseId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Class ID:', ExpenseId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.expservice.updateData(ExpenseId, this.Form.value).subscribe((res) => {
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
  Delete(ExpenseId: any) {
    if (confirm('Are you sure you want to delete this Class?')) {
        this.expservice.deleteData(ExpenseId).subscribe(
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
