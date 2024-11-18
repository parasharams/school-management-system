import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-expensedetails',
  templateUrl: './expensedetails.component.html',
  styleUrls: ['./expensedetails.component.scss']
})
export class ExpensedetailsComponent implements OnInit {

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
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private expservice: ExpenseService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Expense Details', path: '/', active: true }];
    this.ClassList();
    this.SubjectList();
    this.List();
    this.initTableCofig();
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
  initTableCofig(): void {
    this.columns = [
      {
        name: 'ClassId',
        label: 'Class',
        formatter: (record: { ClassId: any; }) => {
          const classRecord = this.ClassData.find(item => item.ClassId === record.ClassId);
          return classRecord ? classRecord.ClassName : 'Unknown Class';
        },
        width: 245,
      },
      {
        name: 'SubjectId',
        label: 'Subject',
        formatter: (record: { SubjectId: any; }) => {
          const subjectRecord = this.SubjectData.find(item => item.SubjectId === record.SubjectId);
          return subjectRecord ? subjectRecord.SubjectName : 'Unknown Subject';
        },
        width: 360,
      },
      {
        name: 'ChargeAmount',
        label: 'Fees (Annual)',
        formatter: (record: { ChargeAmount: any; }) => record.ChargeAmount,
        width: 180
      }
    ];
  }
  compare(v1: string | number, v2: string | number): any {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  onSort(event: SortEvent): void {
    this. List();
    if (event.direction === '') {
      this.ExpenseData;
    } else {
      this.ExpenseData = [...this.ExpenseData].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }
  matches(row: any, term: string) {
    return (row.ClassId ? row.ClassId.toString().toLowerCase().includes(term.toLowerCase()) : false)
      || (row.SubjectId ? row.SubjectId.toString().toLowerCase().includes(term.toLowerCase()) : false)
      || (row.ChargeAmount ? row.ChargeAmount.toString().toLowerCase().includes(term.toLowerCase()) : false);
  }  
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this.List();
    }
    else {
      let updatedData = this.ExpenseData;
      console.log("Search", updatedData)
      updatedData = updatedData.filter(record => this.matches(record, searchTerm));
      this.ExpenseData = updatedData;
    }
  }
}

