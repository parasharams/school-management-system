import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeachersubjectService } from 'src/app/services/teachersubject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-teachersubject',
  templateUrl: './teachersubject.component.html',
  styleUrls: ['./teachersubject.component.scss']
})
export class TeachersubjectComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  TeacherData: any[] = [];
  TeacherSubData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  teacherMap: { [key: number]: string } = {};
  selectedClassId: number | null = null;
  selectedSubjectId: string | null = null;
  SubjectListData: any[] = [];

  constructor(private fb: FormBuilder, private techsubService: TeachersubjectService, private techservice: TeacherService, private classservice: ClassService, private subService: SubjectService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Teacher Subjects', path: '/', active: true }];
    this.ClassList(); 
    this.SubjectList();
    this.TeacherList();
    this.List();
    this.Form = this.fb.group({
      Id: [''],
      ClassId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      TeacherId: ['', Validators.required]
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
    this.subService.listData()
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
  TeacherList() {
    this.techservice.listData()
      .subscribe((res: any) => {
        console.log('Get All ClassData', res);
        this.TeacherData = res.data;
        this.TeacherMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  TeacherMap() {
    this.teacherMap = {};
    this.TeacherData.forEach((cls: any) => {
        this.teacherMap[cls.TeacherId] = cls.TeacherName;
    });
    console.log('Teacher Map:', this.teacherMap);
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
      this.techsubService.insertData(this.Form.value).subscribe(
        (res) => {
          console.log(res, 'Teacher subject Added Successfully!');
          this.Form.reset();
          this.List();
          this.successMsg = res.message;
          this.errMsg = '';
        },
        (err) => {
          // Show error message if the classID and SubjectID already exist
          if (err.status === 400) {
            this.errMsg = err.error.message; // "Data already exists!"
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
    this.techsubService.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.TeacherSubData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Edit(Id: any): void {
    this.isEditing = true;
    this.techsubService.getByIdData(Id).subscribe((res) => {
      const Class = res.data;
      console.log('Class Data:', Class);
      this.Form.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.Form.value);
    });    
  }
  Update() { 
    const Id = this.Form.get('Id')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Class ID:', Id);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.techsubService.updateData(Id, this.Form.value).subscribe((res) => {
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
  Delete(Id: any) {
    if (confirm('Are you sure you want to delete this Class?')) {
        this.techsubService.deleteData(Id).subscribe(
            (res) => {
                console.log(res, 'Teacher subject deleted successfully!');
                this.successMsg = res.message; 
                this.List();
            },
            (err) => {
                console.log(err, 'Error occurred while deleting Teacher subject');
                this.successMsg = 'Error occurred while deleting Teacher subject';
            }
        );
    }
  }
  Cancel() { 
    this.Form.reset(); 
    this.isEditing = false;
  } 
}
