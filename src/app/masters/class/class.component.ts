import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  stockList: any;
  teacherList: any[] = [];
  subdata: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  classId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  subjectMap: { [key: number]: string } = {}; // To map subjectId to subject name
  teacherMap: { [key: number]: string } = {}; // To map subjectId to Teacher name
  examMap: { [key: number]: string } = {}; // To map subjectId to Teacher name
  subjectList: any[] = [];
  examList: any[] = [];
  subjects: Select2Data = [];
  exams: Select2Data = [];
  teachers: Select2Data = [];  

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Subject Information', path: '/', active: true }];
    this.getExam();
    this.getsubject();
    this.getteacher();
    this.getdata();
    this.subForm = this.formBuilder.group({
      classId: [''],
      classname: [''],
      classcode: [''],
      subjectId: [[]],
      examId: [[]],
      teacherId: [''],
    });
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  subForm = new FormGroup({
    'classname': new FormControl('', Validators.required),
    'classcode': new FormControl('', Validators.required),
    'subjectId': new FormControl([], Validators.required),
    'examId': new FormControl([], Validators.required),
    'teacherId': new FormControl('', Validators.required),
    'createdate': new FormControl('', Validators.required),
  })
  
  getExam() {
    this.apiservice.listExam()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.examList = res.data;
        this.ExamSelect2Data();  // Populate data for Select2
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  ExamSelect2Data(): void {
    this.exams = this.examList.map((exm: any) => {
      return {
        value: exm.examId,  // 'value' is the key expected by Select2
        label: exm.examname     // 'label' will be shown in the dropdown
      };
    });
  } 
  getsubject() {
    this.apiservice.listSubject().subscribe(
      (res: any) => {
        this.subjectList = res.data;
        console.log('Get All Subject Data', this.subjectList);
        this.SubSelect2Data();  // Populate data for Select2
      },
      (err: any) => {
        alert("Something went wrong");
      }
    );
  }
  SubSelect2Data(): void {
    this.subjects = this.subjectList.map((subject: any) => {
      return {
        value: subject.subjectId,  // 'value' is the key expected by Select2
        label: subject.subname     // 'label' will be shown in the dropdown
      };
    });
  } 
  getteacher() {
    this.apiservice.listTeacher()
      .subscribe((res: any) => {
        console.log('Get All Teachers Data', res);
        this.teacherList = res.data;
        this.TeacherSelect2Data();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  TeacherSelect2Data(): void {
    this.teachers = this.teacherList.map((teacher: any) => {
      return {
        value: teacher.teacherId,  // 'value' is the key expected by Select2
        label: teacher.tfname     // 'label' will be shown in the dropdown
      };
    });
  } 
  create() {
    //alert("hi")
    console.log("Data", this.subForm.value);
    if (this.subForm.valid) {
      this.apiservice.createClass(this.subForm.value).subscribe((res) => {
        console.log(res, 'Data Added Successfully!')
        this.subForm.reset();
        this.getdata();
        this.successMsg = res.message;
        // Remove success message after 5 seconds (5000 milliseconds)
        this.modalRef.close();
        setTimeout(() => {
          this.successMsg = null;
        }, 1000);
      })
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  getdata() {
    this.apiservice.listClass()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.subdata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  edit(FormModal: TemplateRef<NgbModal>, classId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = classId;  // Store the ID for updating
    this.apiservice.getClassById(classId).subscribe((res) => {
      //console.log('Fetched Student Data:', res);
      const student = res.data[0];
      student.classexam = student.classexam[0];
      console.log('Student Data:', student.classexam);
      this.subForm.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.subForm.value);
      // Reset the form when the modal is closed or dismissed
      this.modalRef = this.modalService.open(FormModal, { centered: true, backdrop: 'static' });
      this.resetModalResult(this.modalRef, this.subForm);
    });    
  }
  update() { 
    const classId = this.subForm.get('classId')?.value;
    console.log('Form Data:', this.subForm.value);  // Check form data
    console.log('Class ID:', classId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateClass(classId, this.subForm.value).subscribe((res) => {
        console.log(res, 'Data updated successfull!')
        this.successMsg = res.message;
        this.getdata();
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
  delete(classId: any) {
    console.log('Deleting Class ID:', classId);
    if (confirm('Are you sure you want to delete this Class?')) {
        this.apiservice.deleteClass(classId).subscribe((res) => {
            console.log(res, 'Class deleted successfully!');
            this.successMsg = res.message; 
            this.getdata();
            setTimeout(() => {
              this.successMsg = null;
            }, 1000);
        }, (err) => {
            console.log(err, 'Error occurred while deleting Class');
            this.successMsg = 'Error occurred while deleting Class';
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
