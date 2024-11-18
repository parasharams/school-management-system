import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  modalRef!: NgbModalRef;
  loading = false;
  stockList: any;
  errMsg: any;
  yeardata: any[] = [];
  successMsg: any;
  yearId: any;
  isEditing: boolean = false;
  getparamid: number | null = null;

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Year Information', path: '/', active: true }];
    this.getYearData();
    this.yearForm = this.formBuilder.group({
      yearId: [''],
      year: [''],
      datetime: ['',]
    });
  } 
  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }  
  yearForm = new FormGroup({
    'year': new FormControl('', Validators.required),
    'createdate': new FormControl('', Validators.required),
  })
  addYear() {
    console.log("Data", this.yearForm.value);
    if (this.yearForm.valid) {
      console.log(this.yearForm.value);
      this.apiservice.createYear(this.yearForm.value).subscribe((res) => {
        console.log(res, 'Data Added Successfully!')
        this.yearForm.reset();
        this.modalRef.close();
        this.getYearData();
        this.successMsg = res.message;
        setTimeout(() => {
          this.successMsg = null;
        }, 1000);
      })
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  getYearData() {
    this.apiservice.listYear()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.yeardata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  editYear(yearId: any): void {
    this.isEditing = true;
    this.apiservice.getYearById(yearId).subscribe((res) => {
      const student = res.data[0];
      this.yearForm.patchValue(res.data[0]);    
      console.log('Patched Form Data:', this.yearForm.value); 
    });    
  }
  updateYear() { 
    const yearId = this.yearForm.get('yearId')?.value;
    if (this.yearForm.valid) {
      this.apiservice.updateYear(yearId, this.yearForm.value).subscribe((res) => {
        console.log(res, 'Data updated successfull!')
        this.successMsg = res.message;
        this.getYearData();
        this.modalRef.close();
        console.log('Request Data:', this.yearForm.value);
      })
    } else {
      this.successMsg = 'All Fields are Required'
    }
    setTimeout(() => {
      this.successMsg = null;
    }, 1000);
  }
  deleteYear(yearId: any) {
    console.log('Deleting Student ID:', yearId);
    if (confirm('Are you sure you want to delete this student?')) {
        this.apiservice.deleteYear(yearId).subscribe((res) => {
            console.log(res, 'Student deleted successfully!');
            this.successMsg = res.message; 
            this.getYearData();
            this.modalRef.close();
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
