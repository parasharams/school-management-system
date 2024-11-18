import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  form!: FormGroup;
  loading = false;
  stockList: any;
  studentdata: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  modalRef!: NgbModalRef;
  errMsg: any;
  successMsg: any;
  registrationID: any;
  isEditing: boolean = false;
  getparamid: number | null = null;
  yearList: any[] = [];
  classList: any[] = [];
  yearMap: { [key: number]: string } = {}; 
  classMap: { [key: number]: string } = {}; 
  years: Select2Data = [];
  classes: Select2Data = [];

  constructor(private apiservice: ApiserviceService, private router: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Student List', path: '/', active: true }];
    this.getStudentData();
    this.getYear();
    this.getClass();
    this.studentForm = this.formBuilder.group({
      studentId: [''],
      fname: [''],
      mname: [''],
      lname: [''],
      gender: [''],
      dob: [''],  
      mothername: [''],
      contact: [''],
      password: [''],
      address: [''],
      yearId: [[]],
      classId: [[]],
      admissionDate: [''],
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
        console.log('Get All Data', res);
        this.yearList = res.data;
        this.yearSelect2Data();
        this.createYearMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  yearSelect2Data(): void {
    this.years = this.yearList.map((yrs: any) => {
      return {
        value: yrs.yearId,  // 'value' is the key expected by Select2
        label: yrs.year     // 'label' will be shown in the dropdown
      };
    });
  }
  createYearMap() {
    this.yearMap = {};
    this.yearList.forEach((year: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.yearMap[year.yearId] = year.year; // Ensure these keys are correct
    });
    console.log('Subject Map:', this.yearMap); // Check the entire mapping
  }
  getClass() {
    this.apiservice.listClass()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.classList = res.data;
        this.classSelect2Data();
        this.createClassMap();
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  classSelect2Data(): void {
    this.classes = this.classList.map((cls: any) => {
      return {
        value: cls.classId,  // 'value' is the key expected by Select2
        label: cls.classname     // 'label' will be shown in the dropdown
      };
    });
  }
  createClassMap() {
    this.classMap = {};
    this.classList.forEach((cls: any) => {
        //console.log(`Mapping subjectId ${subject.subjectId} to name ${subject.subname}`); // Debug line
        this.classMap[cls.classId] = cls.classname; // Ensure these keys are correct
    });
    console.log('Subject Map:', this.classMap); // Check the entire mapping
  }

  // Add Student
  studentForm = new FormGroup({
    'fname': new FormControl('', Validators.required),
    'mname': new FormControl('', Validators.required),
    'lname': new FormControl('', Validators.required),
    'dob': new FormControl('', Validators.required),
    'mothername': new FormControl('', Validators.required),
    'gender': new FormControl('', Validators.required),
    'contact': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'yearId': new FormControl('', Validators.required),
    'classId': new FormControl('', Validators.required),
    'admissionDate': new FormControl('', Validators.required),
  })
  generateRegistrationID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (1-12)
    const day = String(now.getDate()).padStart(2, '0');        // Day (1-31)
    const hours = String(now.getHours()).padStart(2, '0');     // Hours (00-23)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes (00-59)
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Seconds (00-59)    
    const registrationID = `S${year}${month}${day}${hours}${minutes}${seconds}`;    
    this.studentForm.patchValue({ registrationID: registrationID });
  }
  addStudent() {
    if (this.studentForm.valid) {
        this.generateRegistrationID(); // Set registration ID based on timestamp
        const dob = this.studentForm.get('dob')?.value;
        // Extract day, month, and year
        const day = dob.substring(0, 2);     // DD
        const month = dob.substring(2, 4);   // MM
        const year = dob.substring(4, 10);    // YYYY          
        // Format to YYYYMMDD
        const formattedDOB = `${day}${month}${year}`; // YYYYMMDD format
        console.log('formattedDOB:', formattedDOB);
        // Set the password to the formatted DOB
        this.studentForm.patchValue({ password: formattedDOB }); // Set password as formatted DOB
        setTimeout(() => {
            this.apiservice.createStudData(this.studentForm.value).subscribe(
                (res) => {
                    console.log(res, 'Data Added Successfully!');
                    this.studentForm.reset();
                    this.getStudentData();
                    this.successMsg = res.message;
                    this.modalRef.close();
                    setTimeout(() => {
                        this.successMsg = null;
                    }, 5000);
                },
                (error) => {
                    console.error('Failed to add student:', error);
                    this.errMsg = "An error occurred while adding the student.";
                }
            );
        }, 100); // Small delay to ensure registrationID is set
    } else {
        this.errMsg = "All fields are required";
    }
  }
  getStudentData() {
    this.apiservice.studentlist()
      .subscribe((res: any) => {
        console.log('Get All Data', res);
        this.studentdata = res.data;
      },
        (err: any) => {
          alert("Something Went Wrong")
        })
  }
  getStudDetails(StudForm: TemplateRef<NgbModal>, studentId: any): void {
    this.isEditing = true; // Indicate that we're in edit mode
    this.getparamid = studentId; // Store studentId for later updates
    
    this.apiservice.getStudentDataById(studentId).subscribe((res) => {
        if (res && res.data && res.data.length > 0) {
            const student = res.data[0];
            this.studentForm.patchValue(student); // Populate form with student data
            console.log('Patched Form Data:', this.studentForm.value);
            
            // Open the modal after data is patched
            this.modalRef = this.modalService.open(StudForm, { centered: true, backdrop: 'static' });
            
            // Optionally reset the form when the modal is closed or dismissed
            this.resetModalResult(this.modalRef, this.studentForm);
        } else {
            console.error("No data found for the provided student ID.");
            alert("No data found for the provided student ID.");
        }
    }, (error) => {
        console.error("Error fetching student data:", error);
        alert("An error occurred while fetching the student's data.");
    });
  }
  updateStudent() { 
    const studentId = this.studentForm.get('studentId')?.value;
    console.log('Form Data:', this.studentForm.value);  // Check form data
    console.log('Registration ID:', studentId);  // Check if studentId is set
    if (this.studentForm.valid) {
      this.apiservice.updateStudentData(studentId, this.studentForm.value).subscribe((res) => {
        console.log(res, 'Data updated successfull!')
        this.successMsg = res.message;
        this.getStudentData();
        // Close the modal after successful form submission
        this.modalRef.close();
        console.log('Request Data:', this.studentForm.value);
      })
    } else {
      this.successMsg = 'All Fields are Required'
    }
    setTimeout(() => {
      this.successMsg = null;
    }, 5000);
  }
  viewStudDetails(StudForm: TemplateRef<NgbModal>, studentId: any): void {
    this.isEditing = true; // Indicate that we're in edit mode
    this.getparamid = studentId; // Store studentId for later updates
    
    this.apiservice.getStudentDataById(studentId).subscribe((res) => {
        if (res && res.data && res.data.length > 0) {
            const student = res.data[0];
            this.studentForm.patchValue(student); // Populate form with student data
            console.log('Patched Form Data:', this.studentForm.value);
            
            // Open the modal after data is patched
            this.modalRef = this.modalService.open(StudForm, { centered: true, backdrop: 'static' });
            
            // Optionally reset the form when the modal is closed or dismissed
            this.resetModalResult(this.modalRef, this.studentForm);
        } else {
            console.error("No data found for the provided student ID.");
            alert("No data found for the provided student ID.");
        }
    }, (error) => {
        console.error("Error fetching student data:", error);
        alert("An error occurred while fetching the student's data.");
    });
  }
  deleteStudentData(studentId: any) {
    console.log('Deleting Student ID:', studentId);
    if (confirm('Are you sure you want to delete this student?')) {
        this.apiservice.deleteStudent(studentId).subscribe((res) => {
            console.log(res, 'Student deleted successfully!');
            this.successMsg = res.message; 
            this.getStudentData();
            setTimeout(() => {
              this.successMsg = null;
            }, 5000);
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
// json-server --watch data.json