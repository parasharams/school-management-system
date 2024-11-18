import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { TeacherRecord } from 'src/app/models/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  stockList: any;
  teacherdata: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  teacherId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  subjectList: any[] = [];
  subjectMap: { [key: number]: string } = {}; // To map subjectId to subject name

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Teacher Information', path: '/', active: true }];
    this.getTeacherData();
    this.getsubject();
    this.teacherForm = this.formBuilder.group({
      teacherId: [''],
      tfname: [''],
      tmname: [''],
      tlname: [''],
      tgender: [''],
      tdob: [''],
      tage: [''],
      tcontact: [''],
      temail: [''],
      tqualify: [''],
      taddress: [''],
      tpassword: [''],
      tsubject: [''],
      joiningdate: [''],
  });
  }  

  teacherForm = new FormGroup({
    'tfname': new FormControl('', Validators.required),
    'tmname': new FormControl('', Validators.required),
    'tlname': new FormControl('', Validators.required),
    'tgender': new FormControl('', Validators.required),
    'tdob': new FormControl('', Validators.required),
    'tage': new FormControl('', Validators.required),
    'tcontact': new FormControl('', Validators.required),
    'temail': new FormControl('', [Validators.required, Validators.email]),
    'tqualify': new FormControl('', Validators.required),
    'taddress': new FormControl('', Validators.required),
    'tpassword': new FormControl('', Validators.required),
    'tsubject': new FormControl('', Validators.required),
   'joiningdate': new FormControl(new Date(), Validators.required),
  })
 
  getsubject() {
    this.apiservice.listSubject().subscribe(
      (res: any) => {
        this.subjectList = res.data;
        console.log('Get All Subject Data', this.subjectList);
        this.createSubjectMap();
      },
      (err: any) => {
        alert("Something went wrong");
      }
    );
  } 
  createSubjectMap() {
    this.subjectMap = {};
    this.subjectList.forEach((subject: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.subjectMap[subject.subjectId] = subject.subname; // Ensure these keys are correct
    });
    console.log('Subject Map:', this.subjectMap); // Check the entire mapping
  }
  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  addTeacher() {
    //alert("hi")
    console.log("Data", this.teacherForm.value);
    if (this.teacherForm.valid) {
      this.apiservice.createTeacher(this.teacherForm.value).subscribe((res) => {
        console.log(res, 'Data Added Successfully!')
        this.teacherForm.reset();
        this.getTeacherData();
        this.successMsg = res.message;
        // Close the modal after successful form submission
        this.modalRef.close();
        // Remove success message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
          this.successMsg = null;
        }, 1000);
      })
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  getTeacherData() {
    this.apiservice.listTeacher()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.teacherdata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  editTeacher(teacherFormModal: TemplateRef<NgbModal>, teacherId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = teacherId;  // Store the ID for updating
    this.apiservice.getTeacherById(teacherId).subscribe((res) => {
      //console.log('Fetched Student Data:', res);
      const student = res.data[0];
      //console.log('Student Data:', student);
      this.teacherForm.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.teacherForm.value);    
      // Open the modal after data is patched
      this.modalRef = this.modalService.open(teacherFormModal, { centered: true, backdrop: 'static' });
      // Reset the form when the modal is closed or dismissed
      this.resetModalResult(this.modalRef, this.teacherForm);
    });    
  }
  updateTeacher() { 
    const teacherId = this.teacherForm.get('teacherId')?.value;
    console.log('Form Data:', this.teacherForm.value);  // Check form data
    console.log('Teacher ID:', teacherId);  // Check if studentId is set
    if (this.teacherForm.valid) {
      this.apiservice.updateTeacher(teacherId, this.teacherForm.value).subscribe((res) => {
        console.log(res, 'Data updated successfull!')
        this.successMsg = res.message;
        this.getTeacherData();
        // Close the modal after successful form submission
        this.modalRef.close();
        console.log('Request Data:', this.teacherForm.value);
      })
    } else {
      this.successMsg = 'All Fields are Required'
    }
    setTimeout(() => {
      this.successMsg = null;
    }, 1000);
  }
  deleteTeacher(teacherId: any) {
    console.log('Deleting Student ID:', teacherId);
    if (confirm('Are you sure you want to delete this student?')) {
        this.apiservice.deleteTeacher(teacherId).subscribe((res) => {
            console.log(res, 'Student deleted successfully!');
            this.successMsg = res.message; 
            this.getTeacherData();
            setTimeout(() => {
              this.successMsg = null;
            }, 1000);
        }, (err) => {
            console.log(err, 'Error occurred while deleting student');
            this.successMsg = 'Error occurred while deleting student';
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
