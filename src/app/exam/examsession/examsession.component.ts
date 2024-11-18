import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-examsession',
  templateUrl: './examsession.component.html',
  styleUrls: ['./examsession.component.scss']
})
export class ExamsessionComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  subdata: any[] = [];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  yearList: any[] = [];
  years: Select2Data = [];
  yearMap: { [key: number]: string } = {};
  examList: any[] = [];
  exams: Select2Data = [];
  examMap: { [key: number]: string } = {};

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Exam List', path: '/', active: true }];
    this.getdata();
    this.getYear();
    this.getExam();
    this.subForm = this.formBuilder.group({
      esId: [''],
      year: [''],
      exam: [''],
      session: [''],
      createdate: [''],
    });
  }  

  open(content: TemplateRef<NgbModal>): void {
    this.isEditing = false;  // Set to false when adding
    this.getparamid = null;
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  subForm = new FormGroup({
    'year': new FormControl([], Validators.required),
    'exam': new FormControl('', Validators.required),
    'session': new FormControl('', Validators.required),
    'createdate': new FormControl('', Validators.required),
  })
  

  getYear() {
    this.apiservice.listYear()
      .subscribe((res: any) => {
        console.log('Get Year List', res);
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
  createYearMap() {
    this.yearMap = {};
    this.yearList.forEach((yrs: any) => {
        this.yearMap[yrs.yearId] = yrs.year;
    });
    console.log('Year Map:', this.yearMap);
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
  ExamSelect2Data(): void {
    this.exams = this.examList.map((exm: any) => {
      return {
        value: exm.examId, 
        label: exm.examname 
      };
    });
  }
  createExamMap() {
    this.examMap = {};
    this.examList.forEach((exm: any) => {
        this.examMap[exm.examId] = exm.examname; // Ensure these keys are correct
    });
    console.log('Exam Map:', this.examMap); // Check the entire mapping
  }

  getdata() {
    this.apiservice.listES()
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
      this.apiservice.createES(this.subForm.value).subscribe((res) => {
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
  edit(FormModal: TemplateRef<NgbModal>, esId: any): void {
    this.isEditing = true;  // Set to true when editing
    this.getparamid = esId;  // Store the ID for updating
    this.apiservice.getESById(esId).subscribe((res) => {
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
    const esId = this.subForm.get('esId')?.value;
    console.log('Form Data:', this.subForm.value);  // Check form data
    console.log('Exam ID:', esId);  // Check if studentId is set
    if (this.subForm.valid) {
      this.apiservice.updateES(esId, this.subForm.value).subscribe((res) => {
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
  delete(esId: any) {
    console.log('Deleting Subject ID:', esId);
    if (confirm('Are you sure you want to delete this Subject?')) {
        this.apiservice.deleteES(esId).subscribe((res) => {
            console.log(res, 'Subject deleted successfully!');
            this.successMsg = res.message; 
            //this.getdata();
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
