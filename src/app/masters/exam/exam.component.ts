import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  subdata: any[] = [];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  examId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  classList: any[] = [];
  classes: Select2Data = [];
  classMap: { [key: number]: string } = {};

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Exam List', path: '/', active: true }];
    this.getdata();
    this.subForm = this.formBuilder.group({
      examId: [''],
      examcode: [''],
      examname: [''],
      createdate: [''],
    });
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  subForm = new FormGroup({
    'examcode': new FormControl([], Validators.required),
    'examname': new FormControl('', Validators.required),
    'createdate': new FormControl('', Validators.required),
  })
  
  getdata() {
    this.apiservice.listExam()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.subdata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  create() {
    //alert("hi")
    console.log("Data", this.subForm.value);
    if (this.subForm.valid) {
      this.apiservice.createExam(this.subForm.value).subscribe((res) => {
        console.log(res, 'Data Added Successfully!')
        this.subForm.reset();
        this.getdata();
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
  edit(FormModal: TemplateRef<NgbModal>, examId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = examId;  // Store the ID for updating
    this.apiservice.getExamById(examId).subscribe((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
         const student = res.data[0];
         this.subForm.patchValue(student);
         console.log('Patched Form Data:', this.subForm.value);   
         // Open the modal after data is patched
         this.modalRef = this.modalService.open(FormModal, { centered: true, backdrop: 'static' });   
         // Reset the form when the modal is closed or dismissed
         this.resetModalResult(this.modalRef, this.subForm);
      } else {
         console.error("Expected an array with items in res.data, but got:", res.data);
      }
   });      
  }
  update() { 
    const examId = this.subForm.get('examId')?.value;
    console.log('Form Data:', this.subForm.value);  // Check form data
    console.log('Exam ID:', examId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateExam(examId, this.subForm.value).subscribe((res) => {
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
