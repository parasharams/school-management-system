import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ExamService } from 'src/app/services/exam.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Form!: FormGroup;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  ClassData: any[] = [];
  SubjectData: any[] = [];
  StudentData: any[] = [];
  ExamList: any[] = [];
  ExamData: any[] = [];
  classMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};
  studentMap: { [key: number]: string } = {};
  examMap: { [key: number]: string } = {};
  selectedClassId: any = null;
  selectedSubjectId: any = null; 
  selectedRollno: any = null; 
  selectedExamId: any = null; 
  selectedExamIds: any = null; 
  SubjectListData: any[] = [];
  StudfilteredData: any[] = [];
  SubjectMarkData: any[] = [];
  ExamIds: any[] = [];
  StudentListData: any[] = [];
  SelectedStudentId: any[] = [];
  ExamListData: any[] =[];
  showSubjects: boolean = true;

  constructor(private fb: FormBuilder, private classservice: ClassService, private subservice: SubjectService, private studservice: StudentService, private examservice: ExamService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Admin', path: '/' }, { label: 'Add Marks', path: '/', active: true }];
    this.ClassList();
    this.SubjectList();
    this.StudentList();
    this.SubjectMarkList();
    this.ExamsList();
    this.List();
    this.Form = this.fb.group({
      ExamId: [''],
      ClassId: ['', Validators.required],
      RollNo: ['', Validators.required],
      StudentId: [this.SelectedStudentId, Validators.required],
      ExId: ['', Validators.required],
      Subjects: this.fb.array([]), // FormArray for dynamic rows
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
        this.SubjectData = res.data;
        console.log('Get SubjectData', this.SubjectData);
        this.SubjectMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  SubjectMap() {
    this.subjectMap = {};
    this.SubjectData.forEach((cls: any) => {
        this.subjectMap[cls.SubjectId] = cls.SubjectName;
    });
    console.log('Subject Map:', this.subjectMap);
  }
  ExamsList() {
    this.examservice.listExamData()
      .subscribe((res: any) => {
        this.ExamList = res.data;
        console.log('Get ExamList', this.ExamList);
        this.ExamMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  ExamMap() {
    this.examMap = {};
    this.ExamList.forEach((cls: any) => {
        this.examMap[cls.ExId] = cls.ExamName;
    });
    console.log('Exam Map:', this.examMap);
  }
  StudentList() {
    this.studservice.listData()
      .subscribe((res: any) => {
        this.StudentData = res.data;
        console.log('Get StudentData', this.StudentData);
        this.StudentMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  StudentMap() {
    this.studentMap = {};
    this.StudentData.forEach((cls: any) => {
        this.studentMap[cls.StudentId] = cls.StudentName;
    });
    console.log('Student Map:', this.studentMap);
  } 
  SubjectMarkList() {
    this.examservice.listMarkData()
      .subscribe((res: any) => {
        this.SubjectMarkData = res.data;
        console.log('SubjectMarkData:', this.SubjectMarkData);
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  onChangeClass() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    console.log('selectedClassId:', this.selectedClassId);  
    if (this.selectedClassId) {
      this.examservice.getClassStudent(this.selectedClassId).subscribe((res) => {
        this.StudfilteredData = res.data;
        console.log('Student Data:', this.StudfilteredData);
      });
    } else {
      this.StudfilteredData = [];
      console.log('No class selected, StudfilteredData cleared.');
    }
  }  
  onChangeRollno() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedRollno = this.Form.get('RollNo')?.value;
    console.log('selectedClassId:', this.selectedClassId);  
    console.log('selectedRollno:', this.selectedRollno);  
    if (this.selectedRollno) {
      this.StudentListData = this.StudentData.filter(record => record.RollNo == this.selectedRollno);
      if (this.StudentListData.length > 0) {
        const selectedStudent = this.StudentListData[0];
        this.Form.patchValue({
          StudentId: selectedStudent.StudentId
        });
        this.SelectedStudentId = selectedStudent.StudentId;
        console.log('StudentId patched to form:', this.SelectedStudentId);
      }
    }
    if (this.selectedClassId) {
      this.ExamIds = this.SubjectMarkData.filter(record => record.ClassId == this.selectedClassId);
      console.log('ExamIds:', this.ExamIds);
      const uniqueExIds = [...new Set(this.ExamIds.map(record => record.ExId))];
      this.ExamListData = this.ExamList.filter(record => uniqueExIds.includes(record.ExId));
      console.log('ExamListData:', this.ExamListData);
    } else {
      this.ExamListData = [];
    }
  }
  onChangeExam() {
    this.selectedClassId = this.Form.get('ClassId')?.value;
    this.selectedRollno = this.Form.get('RollNo')?.value; 
    this.selectedExamId = this.Form.get('ExId')?.value;  
    console.log('selectedClassId:', this.selectedClassId);
    console.log('selectedRollno:', this.selectedRollno);  
    console.log('selectedExamId:', this.selectedExamId); 
    if (this.selectedClassId && this.selectedExamId) {
      this.examservice.getCSESubMark (this.selectedClassId,this.selectedExamId).subscribe((res) => {
        this.SubjectListData = res.data;
        this.Subjects.clear();
        this.SubjectListData.forEach((subject) => this.addSubject(subject));
        console.log('Subject Data:', this.SubjectListData);
      });
    } else {
      this.SubjectListData = [];
      this.Subjects.clear();
      console.log('No class selected, SubjectList cleared.');
    }
  } 
  get Subjects(): FormArray {
    return this.Form.get('Subjects') as FormArray;
  }
  addSubject(subject: any) {
    this.Subjects.push(
      this.fb.group({
        SubjectId: [subject.SubjectId, Validators.required],
        TotalMarks: [''],
        OutOfMarks: [subject.OutOfMarks],
      })
    );
  }
  getSubject(subject: any) {
    this.Subjects.push(
      this.fb.group({
        SubjectId: [subject.SubjectId, Validators.required],
        TotalMarks: [subject.TotalMarks],
        OutOfMarks: [subject.OutOfMarks],
      })
    );
  }
  List() {
    this.examservice.listData()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.ExamData = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  Create() {
    const dataToSave = {
        ClassId: this.selectedClassId,
        ExId: this.selectedExamId,
        StudentId: this.SelectedStudentId,
        RollNo: this.selectedRollno,
        Subjects: this.Form.value.Subjects // Array of subject details
    };
    console.log('Form Data to Send:', dataToSave);
    this.examservice.insertData(dataToSave).subscribe(
        (res) => {
            console.log(res, 'Marks Added Successfully!');
            this.successMsg = 'Marks added successfully!';
            this.errMsg = ''; // Clear error message if any
            this.List();
            this.showSubjects = false;
            this.Form.reset();
        },
        (err) => {
            console.error('Error:', err);
            if (err.status === 400) {
                this.errMsg = err.error.message; // Display the backend error message
            } else {
                this.errMsg = 'Exam entry already exists for this ClassId, ExId, and StudentId.';
            }
        }
    );
  }
  Edit(ExamId: any): void {
    this.isEditing = true;
    this.examservice.getByIdData(ExamId).subscribe((res) => {
      const subjectList = res.data; 
      this.SubjectListData = res.data;
      this.selectedExamIds = subjectList[0].ExamId; 
      this.selectedClassId = subjectList[0].ClassId; 
      this.selectedRollno = subjectList[0].RollNo;
      this.selectedExamId = subjectList[0].ExId;
      this.Form.get('ExamId')?.setValue(this.selectedExamIds);
      this.Form.get('ClassId')?.setValue(this.selectedClassId);
      this.Form.get('RollNo')?.setValue(this.selectedRollno);
      this.Form.get('ExId')?.setValue(this.selectedExamId);
      this.onChangeClass();
      this.onChangeRollno();
      this.Subjects.clear();
      this.SubjectListData.forEach((subject) => this.getSubject(subject));      
    });
  }
  Update() { 
    const ExamId = this.Form.get('ExamId')?.value;
    console.log('Form Data:', this.Form.value);
    console.log('Exam ID:', ExamId);  
    this.isEditing = false;
    if (this.Form.valid) {
      this.examservice.updateData(ExamId, this.Form.value).subscribe((res) => {
        console.log(res, 'Data updated successfully!');
        this.successMsg = res.message;
        console.log('Request Data:', this.Form.value);
        this.List();
        this.showSubjects = false;
        this.Form.reset();
      });
    } else {
      this.successMsg = 'All Fields are Required';
    }  
    setTimeout(() => {
      this.successMsg = null;
    }, 1000);
  }  
  Delete(ExamId: any) {
    if (confirm('Are you sure you want to delete this Class?')) {
        this.examservice.deleteData(ExamId).subscribe(
            (res) => {
                console.log(res, 'Exam deleted successfully!');
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
