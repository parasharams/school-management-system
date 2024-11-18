const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { error } = require('jquery');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect Mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test',
    port:3306
})

//check database connection
db.connect(err => {
    if(err){console.log('error')}
    console.log('Database Connected Successful!!!')
})

//Student Table
app.get('/student',(req,res)=>{
    console.log('Get Student All Data');
    let qrr= 'SELECT * FROM student';
    db.query(qrr,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All Student Data',
                data:results
            })
        }
    })
})
app.post('/student', (req, res) => {
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let dob = req.body.dob;
    let mothername = req.body.mothername;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let password = req.body.password;
    let address = req.body.address;
    let yearId = req.body.yearId;
    let classId = req.body.classId;
    let admissionDate = req.body.admissionDate;
    // Insert into the student table
    let qr = `insert into student(fname,mname,lname,dob,mothername,gender,contact,password,address)value('${fname}','${mname}','${lname}','${dob}','${mothername}','${gender}','${contact}','${password}','${address}')`;
    db.query(qr,(err, results)=>{
        if(err){
            console.log(err);
        }
        // Get the inserted student ID
        let studentId = results.insertId; 
        let class_standard_data = {
            studentId: studentId,
            yearId: yearId,      // Assuming year corresponds to yearId
            classId: classId ,// Assuming studclass corresponds to classId
            admissionDate: admissionDate,
        };
        let qrClassStandard = `INSERT INTO class_standard (studentId, yearId, classId, admissionDate) 
                                VALUES ('${class_standard_data.studentId}','${class_standard_data.yearId}','${class_standard_data.classId}','${class_standard_data.admissionDate}')`;
        db.query(qrClassStandard,(err, results)=>{
            if (err) {
                console.error('Error inserting into class_standard table:', err);
                return res.status(500).send({ message: 'Error adding class_standard data' });
            }
            res.send({
                message: 'Student Added Successfully!',
                data: results
            });
        });
    });
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/student/:studentId', (req, res) => {
    let qrId = req.params.studentId;
    let qr = `SELECT * FROM student WHERE studentId = ${qrId}`;
    db.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/student/:studentId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let sid = req.params.studentId;
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let dob = req.body.dob;
    let mothername = req.body.mothername;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let address = req.body.address;
    let year = req.body.year;
    let studclass = req.body.studclass;
    let qr = `update student set fname = '${fname}', mname = '${mname}', lname = '${lname}', dob = '${dob}', age = '${age}', aadhar = '${aadhar}', pan = '${pan}', mothername = '${mothername}', gender = '${gender}', contact = '${contact}', address = '${address}', year = '${year}', studclass = '${studclass}' where studentId = '${sid}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/student/:studentId',(req,res)=>{
    let stud_ID = req.params.studentId;
    let qr = `delete from student where studentId = '${stud_ID}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Student

//Year Table
app.get('/year',(req,res)=>{
    console.log('Get Year All Data');
    let qrr= 'SELECT * FROM year';
    db.query(qrr,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All Year Data',
                data:results
            })
        }
    })
})
app.post('/year',(req,res)=>{
    let year = req.body.year;
    let qr = `insert into year(year)value('${year}')`;
    db.query(qr,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Year Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/year/:yearId', (req, res) => {
    let qrId = req.params.yearId;
    let qr = `SELECT * FROM year WHERE yearId = ${qrId}`;
    db.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/year/:yearId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let yid = req.params.yearId;
    let year = req.body.year;
    let datetime = req.body.datetime;
    //let qr = `update year set yearId = '${yid}', year = '${year}', datetime = '${datetime}'`;
    let qr = `UPDATE year SET year = '${year}', datetime = '${datetime}' WHERE yearId = '${yid}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/year/:yearId',(req,res)=>{
    let yid = req.params.yearId;
    let qr = `DELETE FROM year WHERE yearId='${yid}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Year

//Class Table
app.get('/class',(req,res)=>{
    console.log('Get class All Data');
    let cls= 'SELECT * FROM class';
    db.query(cls,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All class Data',
                data:results
            })
        }
    })
})
app.post('/class',(req,res)=>{
    let classname = req.body.classname;
    let classcode = req.body.classcode;
    let subjectId = req.body.subjectId;
    let examId = req.body.examId;
    let teacherId = req.body.teacherId;
    let cls = `insert into class(classname,classcode,subjectId,examId,teacherId)value('${classname}','${classcode}','${subjectId}','${examId}','${teacherId}')`;
    db.query(cls,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'class Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/class/:classId', (req, res) => {
    let clsId = req.params.classId;
    let cls = `SELECT * FROM class WHERE classId = ${clsId}`;
    db.query(cls, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/class/:classId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let clsId = req.params.classId;
    let classname = req.params.classname;
    let classcode = req.params.classcode;
    let subjectId = req.params.subjectId;
    let examId = req.body.examId;
    let teacherId = req.params.teacherId;
    let cls = `update class set classname = '${classname}', classcode = '${classcode}', subjectId = '${subjectId}', examId = '${examId}', teacherId = '${teacherId}' where  classId = '${clsId}'`;
    db.query(cls,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/class/:classId',(req,res)=>{
    let clsId = req.params.classId;
    let cls = `delete from class where classId = '${clsId}'`;
    db.query(cls,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Class

//Subject Table
app.get('/subject',(req,res)=>{
    console.log('Get Subject All Data');
    let trr= 'SELECT * FROM subject';
    db.query(trr,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All Subject Data',
                data:results
            })
        }
    })
})
app.post('/subject',(req,res)=>{
    let subcode = req.body.subcode;
    let subname = req.body.subname;
    let sub = `insert into subject(subcode,subname)value('${subcode}','${subname}')`;
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Subject Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/subject/:subjectId', (req, res) => {
    let subId = req.params.subjectId;
    let sub = `SELECT * FROM subject WHERE subjectId = ${subId}`;
    db.query(sub, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/subject/:subjectId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let subId = req.params.subjectId;
    let subcode = req.body.subcode;
    let subname = req.body.subname;
    let datetime = req.body.datetime;
    let sub = `update subject set subjectId = '${subId}', subcode = '${subcode}', subname = '${subname}', datetime = '${datetime}'`;
    db.query(sub,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/subject/:subjectId',(req,res)=>{
    let subId = req.params.subjectId;
    let sub = `delete from subject where subjectId = '${subId}'`;
    db.query(sub,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Subject

//Teacher Table
app.get('/teacher',(req,res)=>{
    console.log('Get Teacher All Data');
    let trr= 'SELECT * FROM teacher';
    db.query(trr,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All Teacher Data',
                data:results
            })
        }
    })
})
app.post('/teacher',(req,res)=>{
    let tfname = req.body.tfname;
    let tmname = req.body.tmname;
    let tlname = req.body.tlname;
    let tgender = req.body.tgender;
    let tdob = req.body.tdob;
    let tage = req.body.tage;
    let tcontact = req.body.tcontact;
    let temail = req.body.temail;
    let tqualify = req.body.tqualify;
    let taddress = req.body.taddress;
    let tpassword = req.body.tpassword;
    let tsubject = req.body.tsubject;
    let joiningdate = req.body.joiningdate;
    let tr = `insert into teacher(tfname,tmname,tlname,tgender,tdob,tage,tcontact,temail,tqualify,taddress,tpassword,tsubject,joiningdate)value('${tfname}','${tmname}','${tlname}','${tgender}','${tdob}','${tage}','${tcontact}','${temail}','${tqualify}','${taddress}','${tpassword}','${tsubject}','${joiningdate}')`;
    db.query(tr,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Teacher Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/teacher/:teacherId', (req, res) => {
    let trId = req.params.teacherId;
    let tr = `SELECT * FROM teacher WHERE teacherId = ${trId}`;
    db.query(tr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/teacher/:teacherId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let tid = req.params.teacherId;
    let tfname = req.body.tfname;
    let tmname = req.body.tmname;
    let tlname = req.body.tlname;
    let tgender = req.body.tgender;
    let tdob = req.body.tdob;
    let tage = req.body.tage;
    let tcontact = req.body.tcontact;
    let temail = req.body.temail;
    let tqualify = req.body.tqualify;
    let taddress = req.body.taddress;
    let tpassword = req.body.tpassword;
    let tsubject = req.body.tsubject;
    let joiningdate = req.body.joiningdate;
    let tr = `update teacher set tfname = '${tfname}', tmname = '${tmname}', tlname = '${tlname}', tgender = '${tgender}', tdob = '${tdob}', tage = '${tage}', tcontact = '${tcontact}', temail = '${temail}', tqualify = '${tqualify}', taddress = '${taddress}', tpassword = '${tpassword}', tsubject = '${tsubject}', joiningdate = '${joiningdate}' where teacherId = '${tid}'`;
    db.query(tr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/teacher/:teacherId',(req,res)=>{
    let tid = req.params.teacherId;
    let tr = `delete from teacher where teacherId = '${tid}'`;
    db.query(tr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Teacher

//Exam Table
app.get('/exam',(req,res)=>{
    console.log('Get Exam All Data');
    let ex= 'SELECT * FROM exam';
    db.query(ex,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All exam Data',
                data:results
            })
        }
    })
})
app.post('/exam',(req,res)=>{
    let examcode = req.body.examcode;
    let examname = req.body.examname;
    let ex = `insert into exam(examcode, examname)value('${examcode}','${examname}')`;
    db.query(ex,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Exam Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/exam/:examId', (req, res) => {
    let exId = req.params.examId;
    let ex = `SELECT * FROM exam WHERE examId = ${exId}`;
    db.query(ex, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/exam/:examId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let exid = req.params.examId;
    let examcode = req.body.examcode;
    let examname = req.body.examname;
    let ex = `update exam set examcode = '${examcode}', examname = '${examname}' where examId = '${exid}'`;
    db.query(ex,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/exam/:examId',(req,res)=>{
    let exid = req.params.examId;
    let ex = `delete from exam where examId = '${exid}'`;
    db.query(ex,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Exam

//Exam Session Table
app.get('/exam_session',(req,res)=>{
    console.log('Get exam_session All Data');
    let es= 'SELECT * FROM exam_session';
    db.query(es,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All exam Data',
                data:results
            })
        }
    })
})
app.post('/exam_session',(req,res)=>{
    let year = req.body.year;   
    let exam = req.body.exam;
    let session = req.body.session;
    let es = `insert into exam_session(year, exam, session)value('${year}','${exam}','${session}')`;
    db.query(es,(err, results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Exam Added Successfully!',
            data:results
        })
    })
    console.log(req.body,'Post Data Successful!!');
})
app.get('/exam_session/:esId', (req, res) => {
    let esId = req.params.esId;
    let es = `SELECT * FROM exam_session WHERE esId = ${esId}`;
    db.query(es, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/exam_session/:esId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let esId = req.params.esId;
    let year = req.body.year;   
    let exam = req.body.exam;
    let session = req.body.session;
    let es = `update exam_session set year = '${year}', exam = '${exam}', session = '${session}' where esId = '${esId}'`;
    db.query(es,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/exam_session/:esId',(req,res)=>{
    let esId = req.params.esId;
    let es = `delete from exam_session where esId = '${esId}'`;
    db.query(es,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Exam

//Exam subject_mark Table
app.get('/subject_mark',(req,res)=>{
    console.log('Get Exam All Data');
    let sm= 'SELECT * FROM subject_mark';
    db.query(sm,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All exam Data',
                data:results
            })
        }
    })
})
app.post('/subject_mark', (req, res) => {
    const { classId, examId, subjects } = req.body;
  
    // Check if subjects is an array
    if (!classId || !examId || !Array.isArray(subjects)) {
      return res.status(400).send({ message: 'Invalid input data' });
    }
  
    // Insert into the `subject_mark` table
    const subjectMarkQuery = `INSERT INTO subject_mark (classId, examId) VALUES (?, ?)`;
  
    db.query(subjectMarkQuery, [classId, examId], (err, results) => {
      if (err) {
        console.error('Error inserting into subject_mark table:', err);
        return res.status(500).send({ message: 'Error adding subject_mark data' });
      }
  
      // Get the `submarkId` of the newly inserted row
      const submarkId = results.insertId;
  
      // Prepare data for `subject_mark_standard` table
      const subjectMarkStandardData = subjects.map(subject => [submarkId, subject.classId, subject.examId, subject.subjectId, subject.maxMark]);
  
      // Insert into `subject_mark_standard` table using bulk insert
      const subjectMarkStandardQuery = `INSERT INTO subject_mark_standard (submarkId, classId, examId, subjectId, maxMark) VALUES ?`;
  
      db.query(subjectMarkStandardQuery, [subjectMarkStandardData], (err, results) => {
        if (err) {
          console.error('Error inserting into subject_mark_standard table:', err);
          return res.status(500).send({ message: 'Error adding subject_mark_standard data' });
        }
  
        res.send({
          message: 'Data added successfully!',
          data: results
        });
      });
    });
});  
app.get('/subject_mark/:submarkId', (req, res) => {
    let smid = req.params.submarkId;
    //let sm = `SELECT * FROM subject_mark WHERE submarkId = '${smid}'`;
    // Use JOIN to fetch data from both tables
    let sm = `
        SELECT 
            sm.*, 
            sms.subjectId, 
            sms.maxMark 
        FROM 
            subject_mark sm 
        LEFT JOIN 
            subject_mark_standard sms 
        ON 
            sm.submarkId = sms.submarkId 
        WHERE 
            sm.submarkId = ?`;
    db.query(sm, [smid], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/subject_mark/:code', (req, res) => {
    const { code } = req.params;
    const { exam_name, class_name, subject_name, max_mark } = req.body;
    const query = `UPDATE subject_mark SET exam_name = ?, class_name = ?, subject_name = ?, max_mark = ? WHERE code = ?`;
    const values = [exam_name, class_name, subject_name, max_mark, code];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send({
                message: 'Failed to update data',
                error: err
            });
        }
        res.send({
            message: 'Data Updated Successfully!',
            data: results
        });
    });
});
app.delete('/subject_mark/:submarkId',(req,res)=>{
    let smid = req.params.submarkId;
    let sm = `delete from subject_mark where submarkId = '${smid}'`;
    db.query(sm,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Exam subject_mark

//Exam subject_mark Table
app.get('/student_mark',(req,res)=>{
    console.log('Get Student All Data');
    let sm= 'SELECT * FROM student_mark';
    db.query(sm,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All student_mark Data',
                data:results
            })
        }
    })
})
app.post('/student_mark', (req, res) => {
    const { yearId, classId, examId, studentId } = req.body;  
    // Check if subjects is an array
    if (!yearId || !classId || !examId || !studentId || !Array.isArray(marks)) {
      return res.status(400).send({ message: 'Invalid input data' });
    }  
    // Insert into the `subject_mark` table
    const MarkQuery = `INSERT INTO student_mark (yearId, classId, examId, studentId) VALUES (?, ?, ?, ?)`;  
    db.query(MarkQuery, [yearId, classId, examId, studentId], (err, results) => {
      if (err) {
        console.error('Error inserting into student_mark table:', err);
        return res.status(500).send({ message: 'Error adding student_mark data' });
      }  
      // Get the `submarkId` of the newly inserted row
      const markId = results.insertId;  
      // Prepare data for `subject_mark_standard` table
      const MarkStandardData = marks.map(mark => [markId, mark.yearId, mark.classId, mark.examId, mark.studentId, mark.subjectId, mark.obtainedmark, mark.maxMark]);  
      // Insert into `student_mark_standard` table using bulk insert
      const MarkStandardQuery = `INSERT INTO student_mark_standard (markIdyearId, classId, examId, studentId, subjectId, obtainedmark, maxMark) VALUES ?`;
      db.query(MarkStandardQuery, [MarkStandardData], (err, results) => {
        if (err) {
          console.error('Error inserting into student_mark_standard table:', err);
          return res.status(500).send({ message: 'Error adding student_mark_standard data' });
        }  
        res.send({
          message: 'Data added successfully!',
          data: results
        });
      });
    });
});  
app.get('/student_mark/:markId', (req, res) => {
    let studmid = req.params.markId;
    let smark = `SELECT * FROM student_mark WHERE markId = ${studmid}`;
    db.query(smark, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/student_mark/:markId', (req, res)=>{
    let markdataId = req.body.markdataId;
    let year = req.body.year;
    let exam = req.body.exam;
    let clas = req.body.class;
    let student = req.body.student;
    let subject = req.body.subject;
    let mark = req.body.mark;
    let obtainedmark = req.body.obtainedmark;
    let smark = `update student_mark set markId = '${markId}', markdataId = '${markdataId}', year = '${year}', exam = '${exam}', class = '${clas}', student = '${student}', subject = '${subject}', mark = '${mark}', obtainedmark = '${obtainedmark}'`;
    db.query(smark,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/student_mark/:markId',(req,res)=>{
    let studmid = req.params.markId;
    let smark = `delete from student_mark where markId = '${studmid}'`;
    db.query(smark,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END Exam subject_mark

//class_standard Table
app.get('/class_standard', (req, res) => {
    let YearID = req.query.yearId;
    let ClassID = req.query.classId;
    console.log('Get Student All Data');
    let cs = 'SELECT * FROM class_standard WHERE yearId = ? AND classId = ?';
    db.query(cs, [YearID, ClassID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({
                message: 'Error fetching data',
                error: err
            });
        }
        if (results.length > 0) {
            res.status(200).send({
                message: 'All Student Data',
                data: results
            });
        } else {
            res.status(404).send({
                message: 'No data found for the specified YearID and ClassID'
            });
        }
    });
});
//END class_standard

//subject_mark_standard Table
app.get('/subject_mark_standard',(req,res)=>{
    console.log('Get Student All Data');
    let qrr= 'SELECT * FROM subject_mark_standard';
    db.query(qrr,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All Student Data',
                data:results
            })
        }
    })
})
app.post('/subject_mark_standard', (req, res) => {
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let dob = req.body.dob;
    let mothername = req.body.mothername;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let password = req.body.password;
    let address = req.body.address;
    let yearId = req.body.yearId;
    let classId = req.body.classId;
    let admissionDate = req.body.admissionDate;
    // Insert into the student table
    let qr = `insert into student(fname,mname,lname,dob,mothername,gender,contact,password,address)value('${fname}','${mname}','${lname}','${dob}','${mothername}','${gender}','${contact}','${password}','${address}')`;
    db.query(qr,(err, results)=>{
        if(err){
            console.log(err);
        }
        // Get the inserted student ID
        let studentId = results.insertId; 
        let class_standard_data = {
            studentId: studentId,
            yearId: yearId,      // Assuming year corresponds to yearId
            classId: classId ,// Assuming studclass corresponds to classId
            admissionDate: admissionDate,
        };
        let qrClassStandard = `INSERT INTO class_standard (studentId, yearId, classId, admissionDate) 
                                VALUES ('${class_standard_data.studentId}','${class_standard_data.yearId}','${class_standard_data.classId}','${class_standard_data.admissionDate}')`;
        db.query(qrClassStandard,(err, results)=>{
            if (err) {
                console.error('Error inserting into class_standard table:', err);
                return res.status(500).send({ message: 'Error adding class_standard data' });
            }
            res.send({
                message: 'Student Added Successfully!',
                data: results
            });
        });
    });
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/subject_mark_standard/:submarkId', (req, res) => {
    let sqrId = req.params.submarkId;
    let sqr = `SELECT * FROM subject_mark_standard WHERE subject_mark_standard = ${sqrId}`;
    db.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data by ID',
                error: err
            });
        } else {
            if (results.length > 0) {
                res.status(200).send({
                    message: 'Get Data by ID',
                    data: results
                });
            } else {
                res.status(404).send({
                    message: 'Data not Found!'
                });
            }
        }
    });
});
app.put('/subject_mark_standard/:submarkId', (req, res)=>{
    // console.log(req.body,"Updated Data")
    let sid = req.params.submarkId;
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let dob = req.body.dob;
    let mothername = req.body.mothername;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let address = req.body.address;
    let year = req.body.year;
    let studclass = req.body.studclass;
    let qr = `update student set fname = '${fname}', mname = '${mname}', lname = '${lname}', dob = '${dob}', age = '${age}', aadhar = '${aadhar}', pan = '${pan}', mothername = '${mothername}', gender = '${gender}', contact = '${contact}', address = '${address}', year = '${year}', studclass = '${studclass}' where studentId = '${sid}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
})
app.delete('/subject_mark_standard/:submarkId',(req,res)=>{
    let smark_ID = req.params.submarkId;
    let sqr = `delete from subject_mark_standard where submarkId = '${smark_ID}'`;
    db.query(sqr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
})
//END subject_mark_standard

//Server running port
app.listen(3000,()=>{
    console.log('Server is running on 3000 PORT')
})

//nodemon index.js - Database run Command