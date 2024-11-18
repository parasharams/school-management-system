import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  loading = false;
  subdata: any[] = [];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  examId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  yearList: any[] = []; 
  examList: any[] = []; 
  studentList: any[] = [];
  subList: any[] = [];
  years: Select2Data = [];
  exams: Select2Data = [];
  classes: Select2Data = [];
  students: Select2Data = [];
  examMap: { [key: number]: string } = {};
  classMap: { [key: number]: string } = {};
  yearMap: { [key: number]: string } = {};
  studMap: { [key: number]: string } = {};
  subMap: { [key: number]: string } = {};
  selectedYearId: any = null;
  selectedExamId: any = null;
  selectedClassId: any = null;
  selectedStudId: any = null;
  yearControl = new FormControl(null);
  examControl = new FormControl(null);
  classControl = new FormControl(null);  
  studControl = new FormControl(null);  
  subjects: any[] = [];
  clssss: any[] = [];
  studList: any[] = [];
  submarks: any[] = [];
  filteredSubjectsData: any[] = [];
  selectedSubjectIds: string[] = []; 
  selectedExamIds: string[] = [];
  selectedClassIds: string[] = [];
  selectedSubMarksIds: string[] = [];
  subForm!: FormGroup;
  srudentName: any;
  srudentDOB: any;
  groupedExamResults: any[] = [];

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Exam List', path: '/', active: true }];
    this.getdata();
    this.getYear();
    this.getExam();
    this.getClass();
    this.getStudent();
    this.getSubject();
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  getYear() {
    this.apiservice.listYear()
      .subscribe((res: any) => {
        console.log('Get Exam List', res);
        this.yearList = res.data;
        this.createYearMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }  
  getExam() {
    this.apiservice.listExam()
      .subscribe((res: any) => {
        console.log('Get Exam List', res);
        this.examList = res.data;
        this.createExamMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }  
  createExamMap() {
    this.examMap = {};
    this.examList.forEach((exam: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.examMap[exam.examId] = exam.examname; // Ensure these keys are correct
    });
    console.log('Exam Map:', this.examMap); // Check the entire mapping
  }
  getClass() {
    this.apiservice.listClass()
      .subscribe((res: any) => {
        console.log('Get Class List', res);
        this.examList = res.data;
        this.createClassMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }  
  createClassMap() {
    this.classMap = {};
    this.examList.forEach((cls: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.classMap[cls.classId] = cls.classname; // Ensure these keys are correct
    });
    console.log('Class Map:', this.classMap); // Check the entire mapping
  }
  createYearMap() {
    this.yearMap = {};
    this.yearList.forEach((yrs: any) => {
        this.yearMap[yrs.yearId] = yrs.year;
    });
    console.log('Year Map:', this.yearMap);
  }
  getStudent() {
    this.apiservice.studentlist()
      .subscribe((res: any) => {
        console.log('Get Student List', res);
        this.studentList = res.data;
        this.createStudentMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }  
  createStudentMap() {
    this.studMap = {};
    this.studentList.forEach((stud: any) => {
        const fullName = [stud.lname, stud.fname, stud.mname].filter(Boolean).join(' ');
        this.studMap[stud.studentId] = fullName; 
    });
    console.log('Teacher Map:', this.studMap);
  } 
  getSubject() {
    this.apiservice.listSubject()
      .subscribe((res: any) => {
        console.log('Get Subject List', res);
        this.subList = res.data;
        this.createSubMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }    
  createSubMap() {
    this.subMap = {};
    this.subList.forEach((sub: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.subMap[sub.subjectId] = sub.subname; // Ensure these keys are correct
    });
    console.log('Sub Map:', this.subMap); // Check the entire mapping
  }
  getSubnameById(subjectId: number): string {
    return this.subMap[subjectId] || 'Unknown Subject';
  }
  
  groupExamResults(subdata: any[]) {
    const groupedResults = subdata.reduce((acc, result) => {
      const key = `${result.markdataId}-${result.year}-${result.exam}-${result.class}-${result.student}`;
      if (!acc[key]) {
        acc[key] = { 
          MarkId: result.markdataId, 
          examYear: result.year, 
          examName: result.exam, 
          className: result.class,
          studName: result.student,
          subjects: []
        };
      }
      acc[key].subjects.push(result);
      return acc;
    }, {});
  
    console.log('Get All Data', groupedResults);
    return Object.values(groupedResults);
  }  
  getdata() {
    this.apiservice.listSM()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.subdata = res.data;
        this.groupedExamResults = this.groupExamResults(this.subdata);
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  showResult(FormModal: TemplateRef<NgbModal>, resultID: any, size: string): void {
    this.apiservice.getResultById(resultID).subscribe((res) => {
      const result = res.data[0];  
      console.log('result Data:', result);    
      this.modalRef = this.modalService.open(FormModal, { size: size, centered: true, backdrop: 'static' });
    });    
  }
}
