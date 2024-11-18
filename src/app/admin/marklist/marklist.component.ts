import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-marklist',
  templateUrl: './marklist.component.html',
  styleUrls: ['./marklist.component.scss']
})
export class MarklistComponent implements OnInit {

  studentId!: string;
  StudentDatas: any[] = [];
  StudentSubjects: any[] = [];
  SubjectData: any[] = [];

  studentMap: { [key: number]: string } = {};
  subjectMap: { [key: number]: string } = {};

  totalOutofMarks: number = 0; // To store the sum
  totalMarks: number = 0; // To store the sum
  StudentName: any;
  RollNo: any;
  
  constructor(private route: ActivatedRoute, private examService: ExamService, private subservice: SubjectService, private studservice: StudentService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('StudentId') || '';
      console.log('StudentId:', this.studentId);
      this.examService.getDataByStudentId(this.studentId).subscribe((res) => {
        if (res.data && res.data.length > 0) {
          this.StudentList(this.studentId);

          const filteredData = res.data.filter((item: any) => item.StudentId == this.studentId);
          console.log('Filtered Subject Data for StudentId:', filteredData);
          this.StudentSubjects = filteredData.map((item: any) => ({
            SubjectId: item.SubjectId,
            SubjectName: this.subjectMap[item.SubjectId] || 'N/A',
            TotalMarks: item.TotalMarks,
            OutofMarks: item.OutofMarks,
          }));    
          this.totalOutofMarks = this.StudentSubjects.reduce(
            (sum, subject) => sum + (subject.OutofMarks || 0),
            0
          );    
          this.totalMarks = this.StudentSubjects.reduce(
            (sum, subject) => sum + (subject.TotalMarks || 0),
            0
          );
          console.log('Student Subjects:', this.StudentSubjects);
        } else {
          console.error('No data found for StudentId:', this.studentId);
          this.StudentSubjects = [];
        }        
      }, (error) => {
        console.error('Error fetching data for StudentId:', this.studentId, error);
        this.StudentSubjects = [];
      });
    });
    this.SubjectList();
  }
  StudentList(StudentId: any) {
    this.studservice.getByIdData(StudentId)
      .subscribe((res: any) => {
        this.StudentDatas = res.data;
        this.StudentName = this.StudentDatas.reduce((names, student) => names + (names ? ', ' : '') + student.StudentName,'');
        this.RollNo = this.StudentDatas.reduce((names, student) => names + (names ? ', ' : '') + student.RollNo,'');
        console.log('Get Students', this.StudentDatas);
        this.StudentMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  StudentMap() {
    this.studentMap = {};
    this.StudentDatas.forEach((cls: any) => {
        this.studentMap[cls.StudentId] = cls.StudentName;
    });
    console.log('Student Map:', this.studentMap);
  }
  SubjectList() {
    this.subservice.listData()
      .subscribe((res: any) => {
        this.SubjectData = res.data;
        console.log('Get SubjectData', this.SubjectData);
        this.SubjectMap();
      },
      (err: any) => {
        alert("Something Went Wrong");
      });
  }  
  SubjectMap() {
    this.subjectMap = {};
    this.SubjectData.forEach((cls: any) => {
        this.subjectMap[cls.SubjectId] = cls.SubjectName;
    });
    console.log('Subject Map:', this.subjectMap);
  }

}
