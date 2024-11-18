import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { SubjectRecord } from 'src/app/models/subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  stockList: any;
  subdata: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  subjectId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Subject Information', path: '/', active: true }];
    this.getdata();
    this.subForm = this.formBuilder.group({
      subjectId: [''],
      subcode: [''],
      subname: [''],
      createdate: [''],
  });
  }  

  subForm = new FormGroup({
    'subcode': new FormControl('', Validators.required),
    'subname': new FormControl('', Validators.required),
    'createdate': new FormControl('', Validators.required),
  })
 
  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  create() {
    //alert("hi")
    console.log("Data", this.subForm.value);
    if (this.subForm.valid) {
      this.apiservice.createSubject(this.subForm.value).subscribe((res) => {
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
  getdata() {
    this.apiservice.listSubject()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.subdata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  edit(FormModal: TemplateRef<NgbModal>, subjectId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = subjectId;  // Store the ID for updating
    this.apiservice.getSubjectById(subjectId).subscribe((res) => {
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
    console.log('Subject ID:', this.subjectId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateSubject(this.subForm.value, this.subjectId).subscribe((res) => {
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
  delete(subjectId: any) {
    console.log('Deleting Subject ID:', subjectId);
    if (confirm('Are you sure you want to delete this Subject?')) {
        this.apiservice.deleteSubject(subjectId).subscribe((res) => {
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
