import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-exam-subject',
  templateUrl: './exam-subject.component.html',
  styleUrls: ['./exam-subject.component.scss']
})
export class ExamSubjectComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  loading = false;
  subdata: any[] = [];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  examId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  examList: any[] = []; 
  exams: Select2Data = [];
  classes: Select2Data = [];
  examMap: { [key: number]: string } = {};
  classMap: { [key: number]: string } = {};
  selectedExamId: any = null;
  selectedClassId: any = null;
  examControl = new FormControl(null);
  classControl = new FormControl(null);  
  subjects: any[] = [];
  clssss: any[] = [];
  filteredSubjectsData: any[] = [];
  selectedClassSubjectList: string[] = []; 
  selectedClassExamList: string[] = [];
  subForm!: FormGroup;  
  code:any;
  groupedExamSubMarks: any[] = [];

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Subject Mark List', path: '/', active: true }];
    this.getdata();
    this.getClass();
    this.getExam();
    this.classControl.valueChanges.subscribe((selectedClassId) => {
      this.onClassSelected(selectedClassId);
    });
    this.examControl.valueChanges.subscribe((selectedExamId: string) => {
      this.onExamSelected(selectedExamId, this.selectedClassId);
    });
    this.subForm = this.formBuilder.group({
      submarkId: [''],
      classControl: [''],
      examControl: [''],
      subjectList: this.formBuilder.array([])  // Initialize as an empty form array
    });
    this.initializeFormArray();
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
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
        this.selectedClassExamList = response.data[0].examId.split(',');  // ['1', '2', '3']
        console.log('selectedClassExamList', this.selectedClassExamList);
        this.apiservice.listClass().subscribe(response => {
          this.clssss = response.data || [];
          this.ExamSelect2Data();
        });
    });
  }
  ExamSelect2Data(): void {
      this.exams = this.examList.filter(exm => this.selectedClassExamList.includes(exm.examId.toString()))
      .map((exm: any) => {
        return {
          value: exm.examId,  // 'value' is the key expected by Select2
          label: exm.examname     // 'label' will be shown in the dropdown
        };
      });
      console.log('Get Exam List', this.exams );
  }
  onExamSelected(selectedExamId: any, selectedClassId: any): void {
    this.selectedClassId = selectedClassId;
    this.selectedExamId = selectedExamId;
    // Fetch or filter classes based on selected exam
    this.apiservice.getClassExamById(selectedExamId, selectedClassId).subscribe((response) => {
      const ClassIds = this.selectedExamId
        console.log('Select Exam', ClassIds);  
        this.selectedClassSubjectList  = response.data[0].subjectId.split(',');  // ['1', '2', '3']      
        console.log('Get selectedClassSubjectList', this.selectedClassSubjectList );
        this.apiservice.listSubject().subscribe(response => {
          this.subjects = response.data || [];
          this.applyFilter();
        });
    });
  }
  applyFilter(): void {
    this.filteredSubjectsData = this.subjects.filter(subject => this.selectedClassSubjectList.includes(subject.subjectId.toString()))
    .map(subject => ({
      classId: this.selectedClassId,    // Placeholder or use actual exam name if available
      examId: this.selectedExamId,  // Placeholder or use actual class name if available
      subjectId: subject.subjectId,
      maxMark: 0                   // Placeholder for obtained marks if available
    }));
    console.log('Get filteredSubjectsData', this.filteredSubjectsData);
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
  createSubjectFormGroup(subject: { examId: any; classId: any; subjectId: any; maxMark: any; }): FormGroup {
    return this.formBuilder.group({
      examId: [subject.examId],
      classId: [subject.classId],
      subjectId: [subject.subjectId],
      maxMark: [subject.maxMark]
    });
  }
  get subjectList(): FormArray {
    return this.subForm.get('subjectList') as FormArray;
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
  createClassMap() {
    this.classMap = {};
    this.clssss.forEach((cls: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.classMap[cls.classId] = cls.classname; // Ensure these keys are correct
    });
    console.log('Class Map:', this.classMap); // Check the entire mapping
  }
  groupExamSubMarks(subdata: any[]) {
    const groupSubMarks = subdata.reduce((acc, result) => {
      const key = `${result.code}-${result.exam_name}-${result.class_name}`;
      if (!acc[key]) {
        acc[key] = { 
          Id: result.submarkId, 
          Code: result.code, 
          ExamName: result.exam_name, 
          ClassName: result.class_name, 
          subjects: []
        };
      }
      acc[key].subjects.push(result);
      return acc;
    }, {});  
    console.log('Get All Data', groupSubMarks);
    return Object.values(groupSubMarks);
  }
  getdata() {
    this.apiservice.listED()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.subdata = res.data;
        //this.groupedExamSubMarks = this.groupExamSubMarks(this.subdata);
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  create() {
    const dataToSave = {
      classId: this.selectedClassId,
      examId: this.selectedExamId,
      subjects: this.subForm.value.subjectList // Array of subject details
    };
    //const dataToSave = this.subForm.value.subjectList; // `subjectList` holds the array of exam records
    setTimeout(() => {
    if (this.subForm.valid) {
      this.apiservice.insertED(dataToSave).subscribe(
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
  }, 100);
  }
  edit(FormModal: TemplateRef<NgbModal>, submarkId: any): void {
    this.isEditing = true;
    this.apiservice.getByIdED(submarkId).subscribe(res => {
        const subjectList = res.data;
        if (subjectList.length > 0) {
          this.selectedClassId = subjectList[0].classId; 
          this.selectedExamId = subjectList[0].examId;
          this.subForm.get('classControl')?.setValue(this.selectedClassId);
          this.subForm.get('examControl')?.setValue(this.selectedExamId);
            console.log('ClassID, ExamID', this.selectedClassId, this.selectedExamId)
            const subjectsArray = this.subForm.get('subjectList') as FormArray;
            subjectsArray.clear();
            subjectList.forEach((subject: { subjectId: any; maxMark: any; }) => {
                subjectsArray.push(this.formBuilder.group({
                    subjectId: [subject.subjectId],
                    maxMark: [subject.maxMark]
                }));
            });
            console.log('subjectsArray', subjectsArray)
            this.modalRef = this.modalService.open(FormModal, { centered: true, backdrop: 'static' });
            this.modalRef.result.finally(() => {
                this.subForm.reset();
                subjectsArray.clear();
            });
        }
    }, error => {
        console.error('Error fetching subject data:', error);
    });
  }

  update() { 
    const submarkId = this.subForm.get('submarkId')?.value;
    console.log('Form Data:', this.subForm.value);  // Check form data
    console.log('submarkId ID:', submarkId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateED(submarkId, this.subForm.value).subscribe((res) => {
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
  delete(submarkId: any) {
    console.log('Deleting Subject ID:', submarkId);
    if (confirm('Are you sure you want to delete this Subject?')) {
        this.apiservice.deleteED(submarkId).subscribe((res) => {
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
