import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-studentmark',
  templateUrl: './studentmark.component.html',
  styleUrls: ['./studentmark.component.scss']
})
export class StudentmarkComponent implements OnInit {

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
    this.yearControl.valueChanges.subscribe((selectedYearId) => {
      this.onYearSelected(selectedYearId);
    });
    this.classControl.valueChanges.subscribe((selectedClassId) => {
      this.onClassSelected(selectedClassId);
    });
    this.examControl.valueChanges.subscribe((selectedExamId) => {
      this.onExamSelected(selectedExamId);
    });
    this.studControl.valueChanges.subscribe((selectedStudId) => {
      this.onStudSelected(selectedStudId);
    });
    this.subForm = this.formBuilder.group({
      subjectList: this.formBuilder.array([])  // Initialize as an empty form array
    });
    this.initializeFormArray();
    this.subjectList.valueChanges.subscribe(() => {
      this.getTotalGotMarks(); // Optionally cache or further use total here
    });
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  getYear() {
    this.apiservice.listYear()
      .subscribe((res: any) => {
        console.log('Get Exam List', res);
        this.yearList = res.data;
        this.YearSelect2Data();
        this.createYearMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  } 
  YearSelect2Data(): void {
    this.years = this.yearList.map((yrs: any) => {
      return {
        value: yrs.yearId,
        label: yrs.year
      };
    });
  }   
  onYearSelected(selectedYearId: any): void {
    this.selectedYearId = selectedYearId;    
    console.log('selectedYearId', this.selectedYearId);
  }  
  getClass() {
    this.apiservice.listClass()
      .subscribe((res: any) => {
        console.log('Get Class List', res);
        this.clssss = res.data;
        this.ClassSelect2Data();
        this.createClassMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  } 
  ClassSelect2Data(): void {
    this.classes = this.clssss.map((cls: any) => {
      return {
        value: cls.classId,
        label: cls.classname
      };
    });
  } 
  onClassSelected(selectedClassId: any): void {
    this.selectedClassId = selectedClassId;  // Store selected exam ID    
    // Fetch or filter classes based on selected exam
    this.apiservice.getClassById(selectedClassId).subscribe((response) => {
      const ClassIds = response.data[0].classname.split(',');  // ['1', '2', '3']      
      console.log('Select Class', ClassIds);  
        this.selectedClassIds = response.data[0].examId.split(',');  // ['1', '2', '3']
        console.log('selectedClassExamList', this.selectedClassIds);
        const yearId = this.yearControl.value;
        const classId = this.classControl.value;
        this.apiservice.listClass().subscribe(response => {
          this.clssss = response.data || [];
          this.ExamSelect2Data();
          this.StudentSelect2Data(yearId, classId);
        });
    });
  }
  ExamSelect2Data(): void {
      this.exams = this.examList.filter(exm => this.selectedClassIds.includes(exm.examId.toString()))
      .map((exm: any) => {
        return {
          value: exm.examId,
          label: exm.examname
        };
      });
      console.log('Get Exam List', this.exams );
  }
  onExamSelected(selectedExamId: any): void {
    this.selectedExamId = selectedExamId;
    this.apiservice.getExamById(selectedExamId).subscribe((response) => {
        const ExamIds = response.data[0].examname.split(','); 
        console.log('Select Exam', ExamIds);
        const yearId = this.yearControl.value;
        const classId = this.classControl.value;
        console.log('Select yearId, classId', yearId, classId);
        this.apiservice.listClass().subscribe(response => {
          this.clssss = response.data || [];
          this.StudentSelect2Data(yearId, classId);
        });
    });
  }  
  StudentSelect2Data(yearId: any, classId: any): void {
    this.apiservice.getStudentsByYearClass(yearId, classId).subscribe((response) => { 
        console.log('API Response:', response);
        this.students = response.data
            .filter((stud: any) => stud.yearId === yearId.toString() && stud.classId === classId.toString())
            .map((stud: any) => ({
                value: stud.studentId,
                label: stud.studentId,
            }));
  
        console.log('Filtered Year and Class-wise Student Data', this.students);
    });
  }
  // onStudSelected(selectedStudId: any): void {
  //   //alert('Selected Class ID: ' + selectedClassId);
  //   this.selectedStudId = selectedStudId;
  //   // Fetch or filter classes based on selected exam
  //   this.apiservice.getStudentDataById(selectedStudId).subscribe((response) => {
  //       const studentData = response.data;
  //       console.log('Select Student', studentData);  
  //       this.selectedSubMarksIds  = response.data[0].classId;
  //       console.log('Get subMark', this.selectedSubMarksIds);
  //       this.apiservice.listED().subscribe(response => {  
  //         this.submarks = response.data || [];
  //         this.applyFilter(); 
  //       });
  //   });
  // }
  onStudSelected(selectedStudId: any): void {    
    console.log('Selected Student:', selectedStudId);
    this.selectedStudId = selectedStudId;
    // Fetch student data by selected student ID
    this.apiservice.getStudentDataById(selectedStudId).subscribe((response) => {
        const studentData = response.data;
        console.log('Selected Student:', studentData);
        this.selectedSubMarksIds = studentData[0].classId; // Assuming classId is available
        console.log('Class ID for selected student:', this.selectedSubMarksIds);

        const classId = this.classControl.value;
        const examId = this.examControl.value;
        // Now get marks for the specific student
        this.apiservice.getMarksByClassExam(classId, examId).subscribe((markResponse) => {
            console.log('Marks Data:', markResponse.data);
            this.submarks = markResponse.data || [];
            this.applyFilter(); // Apply any filters as needed
        });
    });
}
  applyFilter(): void {
    this.filteredSubjectsData = this.submarks.filter(subject => this.selectedSubMarksIds.includes(subject.classId.toString()))
    .map(subject => ({
      yearId: this.selectedYearId,  
      classId: this.selectedClassId,   
      examId: this.selectedExamId, 
      studentId: this.selectedStudId,
      subjectId: subject.subjectId,
      obtainedMark: 0,
      maxMark: subject.maxMark,
    }));
    console.log('Get Table Data', this.filteredSubjectsData);
    this.subForm = this.formBuilder.group({
      subjectList: this.formBuilder.array(this.filteredSubjectsData.map(subject => this.createSubjectFormGroup(subject)))
    });
    console.log('subForm', this.subForm);
  }
  initializeFormArray() {
    const subjectsArray = this.subForm.get('subjectList') as FormArray;
    this.filteredSubjectsData.forEach(subject => {
      subjectsArray.push(this.createSubjectFormGroup(subject));
    });
    console.log("filteredSubjectsData", this.filteredSubjectsData);
  }
  createSubjectFormGroup(subject: { yearId: any; classId: any; examId: any; studentId: any; subjectId: any; obtainedMark: any; maxMark: any; }): FormGroup {
    return this.formBuilder.group({
      yearId: [subject.yearId],
      classId: [subject.classId],
      examId: [subject.examId],
      studentId: [subject.studentId],
      subjectId: [subject.subjectId],
      obtainedMark: [subject.obtainedMark],
      maxMark: [subject.maxMark],
    });
  }
  get subjectList(): FormArray {
    return this.subForm.get('subjectList') as FormArray;
  }
  getTotalObtainedMarks(): number {
    return this.subjectList.controls
        .map(control => control.get('obtainedmark')?.value || 0)  // Get each obtained_mark or 0 if null
        .reduce((acc, value) => acc + value, 0);  // Sum up all obtained marks
  }
  getTotalGotMarks(): number {
    return this.subjectList.controls
      .map(control => control.get('mark')?.value || 0) // Get each got_mark value or 0 if null
      .reduce((acc, value) => acc + value, 0); // Sum up all values
  }

  getExam() {
    this.apiservice.listExam()
      .subscribe((res: any) => {
        console.log('Get Exam List', res);
        this.examList = res.data;
        this.ExamSelect2Data();
        this.createExamMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
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
  
  
  createYearMap() {
    this.yearMap = {};
    this.yearList.forEach((yrs: any) => {
        this.yearMap[yrs.yearId] = yrs.year;
    });
    console.log('Year Map:', this.yearMap);
  } 
  createClassMap() {
    this.classMap = {};
    this.clssss.forEach((cls: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.classMap[cls.classId] = cls.classname; // Ensure these keys are correct
    });
    console.log('Class Map:', this.classMap); // Check the entire mapping
  }
  createExamMap() {
    this.examMap = {};
    this.examList.forEach((exam: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.examMap[exam.examId] = exam.examname; // Ensure these keys are correct
    });
    console.log('Exam Map:', this.examMap); // Check the entire mapping
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
  create() {
    const dataToSave = this.subForm.value.subjectList; // `subjectList` holds the array of exam records
    if (this.subForm.valid) {
      this.apiservice.insertSM(dataToSave).subscribe(
        (res) => {
          console.log(res, 'Data Added Successfully!');
          this.subForm.reset();
          this.getdata();  // Refresh data after insertion
          this.successMsg = res.message;
          this.modalRef.close();
          setTimeout(() => {
            this.successMsg = null;
          }, 1000);
        },
        (error) => {
          console.error("Error inserting data", error);
          this.errMsg = "Failed to insert data. Please try again.";
        }
      );
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  edit(FormModal: TemplateRef<NgbModal>, examId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = examId;  // Store the ID for updating
    this.apiservice.getExamById(examId).subscribe((res) => {
      //console.log('Fetched Student Data:', res);
      const student = res.data[0];
      //console.log('Student Data:', student);
      this.subForm.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.subForm.value);    
      // Open the modal after data is patched
      this.modalRef = this.modalService.open(FormModal, { centered: true, backdrop: 'static' });
      // Reset the form when the modal is closed or dismissed
      this.resetModalResult(this.modalRef, this.subForm);
    });    
  }
  update() { 
    console.log('Form Data:', this.subForm.value);  // Check form data
    console.log('Exam ID:', this.examId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateExam(this.subForm.value, this.examId).subscribe((res) => {
        console.log(res, 'Data updated successfull!')
        this.successMsg = res.message;
        this.getdata();
        // Close the modal after successful form submission
        this.modalRef.close();
        console.log('Request Data:', this.subForm.value);
      })
    } else {
      this.successMsg = 'All Fields are Required'
    }
    setTimeout(() => {
      this.successMsg = null;
    }, 1000);
  }
  delete(examId: any) {
    console.log('Deleting Subject ID:', examId);
    if (confirm('Are you sure you want to delete this Subject?')) {
        this.apiservice.deleteExam(examId).subscribe((res) => {
            console.log(res, 'Subject deleted successfully!');
            this.successMsg = res.message; 
            this.getdata();
            setTimeout(() => {
              this.successMsg = null;
            }, 1000);
        }, (err) => {
            console.log(err, 'Error occurred while deleting Subject');
            this.successMsg = 'Error occurred while deleting Subject';
        });
    }
  }
  resetModalResult(modalRef: NgbModalRef, form: FormGroup): void {
    modalRef.result.then(
      (result) => {
        // Modal closed successfully
        form.reset(); // Reset the form
        console.log('Modal closed:', result);
      },
      (reason) => {
        // Modal dismissed
        form.reset(); // Reset the form
        console.log('Modal dismissed:', reason);
      }
    );
  }
}
