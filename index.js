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
    database:'schoolsysdb',
    port:3306
})

//check database connection
db.connect(err => {
    if(err){console.log('error')}
    console.log('Database Connected Successful!!!')
})

//Login
app.get('/user',(req,res)=>{
    console.log('Get login All Data');
    let cls= 'SELECT * FROM login';
    db.query(cls,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All login Data',
                data:results
            })
        }
    })
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // Query the database for the user
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Respond with the user data and token
        res.json({
            message: 'Login successful',    
            user: {
                id: user.id,
                email: user.email,
                role: user.role, // Include role in response
                name: user.name, // Include additional fields if required
            },
        });
    });
});


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
});
app.post('/class',(req,res)=>{
    let ClassName = req.body.ClassName;
    const checkQuery = `SELECT * FROM class WHERE ClassName = ?`;
    db.query(checkQuery, [ClassName], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Database error', error: err });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: 'Class already exists!' });
        } 
        else {
            const insertQuery = `INSERT into class(ClassName)value('${ClassName}')`;
            db.query(insertQuery,(err, results)=>{
                if(err){
                    console.log(err);
                }
                res.send({
                    message:'Class Added Successfully!',
                    data:results
                });
            });
        }
    });    
    console.log(req.body, 'Post Data Successful!');
});
app.get('/class/:ClassId', (req, res) => {
    let clsId = req.params.ClassId;
    let cls = `SELECT * FROM class WHERE ClassId = ${clsId}`;
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
app.put('/class/:ClassId', (req, res)=>{
    let clsId = req.params.ClassId;
    let ClassName = req.body.ClassName;
    let cls = `UPDATE class SET ClassId = '${clsId}', ClassName = '${ClassName}' WHERE ClassId = '${clsId}'`;
    db.query(cls,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/class/:ClassId',(req,res)=>{
    let clsId = req.params.ClassId;
    let cls = `DELETE FROM class WHERE ClassId = '${clsId}'`;
    db.query(cls,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Fees Table
app.get('/fees',(req,res)=>{
    console.log('Get fees All Data');
    let fes= 'SELECT * FROM fees';
    db.query(fes,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All fees Data',
                data:results
            })
        }
    })
});
app.post('/fees',(req,res)=>{
    let ClassId = req.body.ClassId;
    let FeesAmount = req.body.FeesAmount;
    const checkQuery = `SELECT * FROM fees WHERE ClassId = ?`;
    db.query(checkQuery, [ClassId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Database error', error: err });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: 'Class fees already exists!' });
        } 
        else {
            const insertQuery = `INSERT into fees(ClassId,FeesAmount)value('${ClassId}','${FeesAmount}')`;
            db.query(insertQuery,(err, results)=>{
                if(err){
                    console.log(err);
                }
                res.send({
                    message:'Class fees Added Successfully!',
                    data:results
                });
            });
        }
    });    
    console.log(req.body,'Post Data Successful!!');
});
app.get('/fees/:FeesId', (req, res) => {
    let fesId = req.params.FeesId;
    let fes = `SELECT * FROM fees WHERE FeesId = ${fesId}`;
    db.query(fes, (err, results) => {
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
app.put('/fees/:FeesId', (req, res)=>{
    let fesId = req.params.FeesId;
    let ClassId = req.body.ClassId;
    let FeesAmount = req.body.FeesAmount;
    let fes = `UPDATE fees SET FeesId = '${fesId}', ClassId = '${ClassId}', FeesAmount = '${FeesAmount}' WHERE FeesId = '${fesId}'`;
    db.query(fes,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/fees/:FeesId',(req,res)=>{
    let fesId = req.params.FeesId;
    let fes = `DELETE FROM fees WHERE FeesId = '${fesId}'`;
    db.query(fes,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Subject Table
app.get('/subject',(req,res)=>{
    console.log('Get subject All Data');
    let sub= 'SELECT * FROM subject';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All subject Data',
                data:results
            })
        }
    })
});
app.post('/subject', (req, res) => {
    let SubjectName = req.body.SubjectName;
    let ClassId = req.body.ClassId;
    const checkQuery = `SELECT * FROM subject WHERE SubjectName = ? AND ClassId = ?`;
    db.query(checkQuery, [SubjectName,ClassId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Database error', error: err });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: 'Class subject already exists!' });
        } 
        else {
            const insertQuery = `INSERT INTO subject (SubjectName, ClassId) VALUES (?, ?)`;
            db.query(insertQuery, [SubjectName, ClassId], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the class." });
                }
                // Success response
                res.send({
                    message: 'Subject Added Successfully!',
                    data: insertResults
                });
            });
        }
    });    
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/subject/:SubjectId', (req, res) => {
    let subId = req.params.SubjectId;
    let sub = `SELECT * FROM subject WHERE SubjectId = ${subId}`;
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
app.put('/subject/:SubjectId', (req, res)=>{
    let subId = req.params.SubjectId;
    let SubjectName = req.body.SubjectName;
    let ClassId = req.body.ClassId;
    let sub = `UPDATE subject SET SubjectId = '${subId}', SubjectName = '${SubjectName}', ClassId = '${ClassId}' WHERE SubjectId = '${subId}'`;
    db.query(sub,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/subject/:SubjectId',(req,res)=>{
    let subId = req.params.SubjectId;
    let sub = `DELETE FROM subject WHERE SubjectId = '${subId}'`;
    db.query(sub,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
app.get('/subjectClass/:ClassId', (req, res) => {
    let subId = req.params.ClassId;
    let sub = `SELECT * FROM subject WHERE ClassId = ${subId}`;
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
//Teacher Table 
app.get('/teacher',(req,res)=>{
    console.log('Get teacher All Data');
    let sub= 'SELECT * FROM teacher';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All teacher Data',
                data:results
            })
        }
    })
});
app.post('/teacher', (req, res) => {
    let TeacherName = req.body.TeacherName;
    let Gender = req.body.Gender;
    let DateOfBirth = req.body.DateOfBirth;
    let Mobile = req.body.Mobile;
    let Email = req.body.Email;
    let Address = req.body.Address;
    let Password = req.body.Password;
    const checkQuery = `SELECT * FROM teacher WHERE Email = ?`;
    db.query(checkQuery, [SubjectName,ClassId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Database error', error: err });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: 'Email already exists!' });
        } 
        else {
            const insertQuery = `INSERT INTO teacher (TeacherName, Gender, DateOfBirth, Mobile, Email, Address, Password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db.query(insertQuery, [TeacherName, Gender, DateOfBirth, Mobile, Email, Address, Password], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the teacher." });
                }
                // Success response
                res.send({
                    message: 'Teacher Added Successfully!',
                    data: insertResults
                });
            });
        }
    });    
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/teacher/:TeacherId', (req, res) => {
    let techId = req.params.TeacherId;
    let tec = `SELECT * FROM teacher WHERE TeacherId = ${techId}`;
    db.query(tec, (err, results) => {
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
app.put('/teacher/:TeacherId', (req, res)=>{
    let techId = req.params.TeacherId;
    let TeacherName = req.body.TeacherName;
    let Gender = req.body.Gender;
    let DateOfBirth = req.body.DateOfBirth;
    let Mobile = req.body.Mobile;
    let Email = req.body.Email;
    let Address = req.body.Address;
    let Password = req.body.Password;
    let tec = `UPDATE teacher SET TeacherId = '${techId}', TeacherName = '${TeacherName}', Gender = '${Gender}', DateOfBirth = '${DateOfBirth}', Mobile = '${Mobile}', Email = '${Email}', Address = '${Address}', Password = '${Password}' WHERE TeacherId = '${techId}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/teacher/:TeacherId',(req,res)=>{
    let techId = req.params.TeacherId;
    let tec = `DELETE FROM teacher WHERE TeacherId = '${techId}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Teacher Subject Table
app.get('/teachersubject',(req,res)=>{
    console.log('Get teachersubject All Data');
    let sub= 'SELECT * FROM teachersubject';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All teacher Data',
                data:results
            })
        }
    })
});
app.post('/teachersubject', (req, res) => {
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let TeacherId = req.body.TeacherId;
    let checkQuery = `SELECT * FROM teachersubject WHERE ClassId = ? AND SubjectId = ? AND  TeacherId = ?`;
    db.query(checkQuery, [ClassId,SubjectId,TeacherId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "Database error occurred" });
        }        
        if (results.length > 0) {   
            return res.status(400).send({ message: "Data Id already exists" });
        }
        else {
            const insertQuery = `INSERT INTO teachersubject (ClassId, SubjectId, TeacherId) VALUES (?, ?, ?)`;
            db.query(insertQuery, [ClassId, SubjectId, TeacherId], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the teacher." });
                }
                // Success response
                res.send({
                    message: 'Class Added Successfully!',
                    data: insertResults
                });
            });
        }
    });
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/teachersubject/:Id', (req, res) => {
    let id = req.params.Id;
    let tec = `SELECT * FROM teachersubject WHERE Id = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/teachersubject/:Id', (req, res)=>{
    let id = req.params.Id;
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let TeacherId = req.body.TeacherId;
    let tec = `UPDATE teachersubject SET Id = '${id}', ClassId = '${ClassId}', SubjectId = '${SubjectId}', TeacherId = '${TeacherId}' WHERE Id = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/teachersubject/:Id',(req,res)=>{
    let id = req.params.Id;
    let tec = `DELETE FROM teachersubject WHERE Id = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Expense Table
app.get('/expense',(req,res)=>{
    console.log('Get expense All Data');
    let sub= 'SELECT * FROM expense';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All expense Data',
                data:results
            })
        }
    })
});
app.post('/expense', (req, res) => {
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let ChargeAmount = req.body.ChargeAmount;
    const checkQuery = `SELECT * FROM expense WHERE ClassId = ? AND SubjectId = ?`;
    db.query(checkQuery, [ClassId,SubjectId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "Database error occurred" });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: "Data already exists!" });
        }
        else {
            const  insertQuery = `INSERT INTO expense (ClassId, SubjectId, ChargeAmount) VALUES (?, ?, ?)`;
            db.query(insertQuery, [ClassId, SubjectId, ChargeAmount], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the expense." });
                }
                // Success response
                res.send({
                    message: 'Expense Added Successfully!',
                    data: insertResults
                });
            });
        }
    });
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/expense/:ExpenseId', (req, res) => {
    let id = req.params.ExpenseId;
    let tec = `SELECT * FROM expense WHERE ExpenseId = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/expense/:ExpenseId', (req, res)=>{
    let id = req.params.ExpenseId;
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let ChargeAmount = req.body.ChargeAmount;
    let tec = `UPDATE expense SET ExpenseId = '${id}', ClassId = '${ClassId}', SubjectId = '${SubjectId}', ChargeAmount = '${ChargeAmount}' WHERE ExpenseId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/expense/:ExpenseId',(req,res)=>{
    let id = req.params.ExpenseId;
    let tec = `DELETE FROM expense WHERE ExpenseId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Expense Table
app.get('/student',(req,res)=>{
    console.log('Get student All Data');
    let sub= 'SELECT * FROM student';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All student Data',
                data:results
            })
        }
    })
});
app.post('/student', (req, res) => {
    let StudentName = req.body.StudentName;
    let Gender = req.body.Gender;
    let DateOfBirth = req.body.DateOfBirth;
    let Mobile = req.body.Mobile;
    let RollNo = req.body.RollNo;
    let Address = req.body.Address;
    let ClassId = req.body.ClassId;
    let AdmissionDate = req.body.AdmissionDate;
    const checkQuery = `SELECT * FROM student WHERE ClassId = ? AND RollNo = ?`;
    db.query(checkQuery, [ClassId,RollNo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "Database error occurred" });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: "Student RollNo already exists!" });
        } else {
            const insertQuery = `INSERT INTO student (StudentName, Gender, DateOfBirth, Mobile, RollNo, Address, ClassId, AdmissionDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(insertQuery, [StudentName, Gender, DateOfBirth, Mobile, RollNo, Address, ClassId, AdmissionDate], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the student." });
                }
                // Success response
                res.send({
                    message: 'Student Added Successfully!',
                    data: insertResults
                });
            });
        } 
    });
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/student/:StudentId', (req, res) => {
    let id = req.params.StudentId;
    let tec = `SELECT * FROM student WHERE StudentId = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/student/:StudentId', (req, res)=>{
    let id = req.params.StudentId;
    let StudentName = req.body.StudentName;
    let Gender = req.body.Gender;
    let DateOfBirth = req.body.DateOfBirth;
    let Mobile = req.body.Mobile;
    let RollNo = req.body.RollNo;
    let Address = req.body.Address;
    let ClassId = req.body.ClassId;
    let AdmissionDate = req.body.AdmissionDate;
    let tec = `UPDATE student SET StudentId = '${id}', StudentName = '${StudentName}', Gender = '${Gender}', DateOfBirth = '${DateOfBirth}', Mobile = '${Mobile}', RollNo = '${RollNo}', Address = '${Address}', ClassId = '${ClassId}', AdmissionDate = '${AdmissionDate}' WHERE StudentId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/student/:StudentId',(req,res)=>{
    let id = req.params.StudentId;
    let tec = `DELETE FROM student WHERE StudentId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
app.get('/ClassStudent/:ClassId', (req, res) => {   
    let id = req.params.ClassId;
    let tec = `SELECT * FROM student WHERE ClassId = ${id}`;
    db.query(tec, (err, results) => {
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
                    message: 'Data not Found!',
                    data: results
                });
            }
        }
    });
});
//Exam Session Table
app.get('/examsession',(req,res)=>{
    console.log('Get examsession All Data');
    let sub= 'SELECT * FROM examsession';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All examsession Data',
                data:results
            })
        }
    })
});
app.post('/examsession', (req, res) => {
    let ExamName = req.body.ExamName;
    let ExamSession = req.body.ExamSession;
    const insertQuery = `INSERT INTO examsession (ExamName, ExamSession) VALUES (?, ?)`;
    db.query(insertQuery, [ExamName, ExamSession], (err, insertResults) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "An error occurred while adding the Marks." });
        }
        // Success response
        res.send({
            message: 'examsession Added Successfully!',
            data: insertResults
        });
    }); 
    console.log(req.body, 'Post Data Successful!!');
});
app.get('/examsession/:ExId', (req, res) => {
    let id = req.params.ExId;
    let tec = `SELECT * FROM examsession WHERE ExId = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/examsession/:ExId', (req, res)=>{
    let id = req.params.ExId;
    let ExamName = req.body.ExamName;
    let ExamSession = req.body.ExamSession;
    let tec = `UPDATE examsession SET ExId = '${id}', ExamName = '${ExamName}', ExamSession = '${ExamSession}' WHERE ExId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/examsession/:ExId',(req,res)=>{
    let id = req.params.ExId;
    let tec = `DELETE FROM examsession WHERE ExId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
//Subject Marks Table
app.get('/subjectmarks',(req,res)=>{
    console.log('Get subjectmarks All Data');
    let sub= 'SELECT * FROM subjectmarks';
    db.query(sub,(err, results)=>{
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
});
app.post('/subjectmarks', (req, res) => {
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let ExId = req.body.ExId;
    let OutOfMarks = req.body.OutOfMarks;
    const checkQuery = `SELECT * FROM subjectmarks WHERE ClassId = ? AND SubjectId = ? AND ExId = ?`;
    db.query(checkQuery, [ClassId,SubjectId,ExId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "Database error occurred" });
        }        
        if (results.length > 0) {
            return res.status(400).send({ message: "Selected Data already exists!" });
        } else {
            const insertQuery = `INSERT INTO subjectmarks (ClassId, SubjectId, ExId, OutOfMarks) VALUES (?, ?, ?,?)`;
            db.query(insertQuery, [ClassId, SubjectId, ExId, OutOfMarks], (err, insertResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: "An error occurred while adding the Marks." });
                }
                // Success response
                res.send({
                    message: 'subjectmarks Added Successfully!',
                    data: insertResults
                });
            }); 
        }
    });
    console.log(req.body, 'Post Data Successful!!');
});
// app.post('/subjectmarks', (req, res) => {
//     const { ClassId, ExId, subjects } = req.body; // Expecting `subjects` to be an array

//     if (!Array.isArray(subjects) || subjects.length === 0) {
//         return res.status(400).send({ message: "Subjects data is missing or invalid." });
//     }

//     // Query for checking existing records
//     const checkQuery = `SELECT * FROM subjectmarks WHERE ClassId = ? AND SubjectId = ? AND ExId = ?`;
//     const insertQuery = `INSERT INTO subjectmarks (ClassId, SubjectId, ExId, OutOfMarks) VALUES (?, ?, ?, ?)`;

//     // Use a promise-based or callback-based approach to handle multiple inserts
//     const promises = subjects.map(subject => {
//         return new Promise((resolve, reject) => {
//             db.query(checkQuery, [ClassId, subject.SubjectId, ExId], (err, results) => {
//                 if (err) return reject({ status: 500, message: "Database error occurred", error: err });
//                 if (results.length > 0) {
//                     return reject({ status: 400, message: `Subject ID ${subject.SubjectId} already exists.` });
//                 } else {
//                     // If not exists, insert the record
//                     db.query(insertQuery, [ClassId, subject.SubjectId, ExId, subject.OutOfMarks], (err, insertResults) => {
//                         if (err) return reject({ status: 500, message: "Error adding marks", error: err });
//                         resolve(insertResults);
//                     });
//                 }
//             });
//         });
//     });

//     // Execute all promises and respond accordingly
//     Promise.allSettled(promises)
//         .then(results => {
//             const success = results.filter(result => result.status === "fulfilled").map(r => r.value);
//             const errors = results.filter(result => result.status === "rejected").map(r => r.reason);

//             if (success.length > 0) {
//                 res.send({
//                     message: `${success.length} subject marks added successfully.`,
//                     successes: success,
//                     errors: errors.length > 0 ? errors : undefined
//                 });
//             } else {
//                 res.status(400).send({ message: "No records added.", errors });
//             }
//         })
//         .catch(err => {
//             console.log("Unhandled Error:", err);
//             res.status(500).send({ message: "An unexpected error occurred.", error: err });
//         });
// });
app.get('/subjectmarks/:MarkId', (req, res) => {
    let id = req.params.MarkId;
    let tec = `SELECT * FROM subjectmarks WHERE MarkId = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/subjectmarks/:MarkId', (req, res)=>{
    let id = req.params.MarkId;
    let ClassId = req.body.ClassId;
    let SubjectId = req.body.SubjectId;
    let ExId = req.body.ExId;
    let OutOfMarks = req.body.OutOfMarks;
    let tec = `UPDATE subjectmarks SET MarkId = '${id}', ClassId = '${ClassId}', ExId = '${ExId}', SubjectId = '${SubjectId}', OutOfMarks = '${OutOfMarks}' WHERE MarkId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Updated Successfully!',
            data:results,
        })        
    })
});
app.delete('/subjectmarks/:MarkId',(req,res)=>{
    let id = req.params.MarkId;
    let tec = `DELETE FROM subjectmarks WHERE MarkId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
app.get('/ClassExam/:ClassId', (req, res) => {
    let id = req.params.ClassId;
    let tec = `SELECT * FROM subjectmarks WHERE ClassId = ${id}`;
    db.query(tec, (err, results) => {
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
app.get('/CSEsubjectmarks', (req, res) => {
    const { ClassId, ExId } = req.query; // Use query parameters for flexibility

    // Validate that required parameters are provided
    if (!ClassId || !ExId) {
        return res.status(400).send({ 
            message: 'ClassId, and ExId are required parameters' 
        });
    }

    // Query to fetch marks based on ClassId, SubjectId, and ExId
    const query = `
        SELECT * 
        FROM subjectmarks 
        WHERE ClassId = ? AND ExId = ?
    `;

    db.query(query, [ClassId, ExId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error fetching data by criteria',
                error: err
            });
        }

        if (results.length > 0) {
            return res.status(200).send({
                message: 'Get Data by criteria',
                data: results
            });
        } else {
            return res.status(404).send({
                message: 'Data not found!'
            });
        }
    });
});

//Exam Table
app.get('/exam',(req,res)=>{
    console.log('Get exam All Data');
    let sub= 'SELECT * FROM exam';
    db.query(sub,(err, results)=>{
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
});
// app.post('/exam', (req, res) => {
//     let ClassId = req.body.ClassId;
//     let SubjectId = req.body.SubjectId;
//     let ExId = req.body.ExId;
//     let StudentId = req.body.StudentId;
//     let RollNo = req.body.RollNo;
//     let TotalMarks = req.body.TotalMarks;
//     let OutofMarks = req.body.OutofMarks;
//     const checkQuery = `SELECT * FROM exam WHERE ClassId = ? AND SubjectId = ? AND RollNo = ?`;
//     db.query(checkQuery, [ClassId,SubjectId,RollNo], (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send({ message: "Database error occurred" });
//         }        
//         if (results.length > 0) {
//             return res.status(400).send({ message: "Data combination already exists!" });
//         } else {
//             const insertQuery = `INSERT INTO exam (ClassId, SubjectId, ExId, StudentId, RollNo, TotalMarks, OutofMarks) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//             db.query(insertQuery, [ClassId, SubjectId, ExId, StudentId, RollNo, TotalMarks, OutofMarks], (err, insertResults) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).send({ message: "An error occurred while adding the Marks." });
//                 }
//                 // Success response
//                 res.send({
//                     message: 'Marks Added Successfully!',
//                     data: insertResults
//                 });
//             }); 
//         }
//     });
//     console.log(req.body, 'Post Data Successful!!');
// });

app.post('/exam', (req, res) => {
    const { ClassId, ExId, StudentId, RollNo, Subjects } = req.body;

    // Check for duplicate entry
    const CheckQuery = `SELECT * FROM exam WHERE ClassId = ? AND ExId = ? AND StudentId = ?`;

    db.query(CheckQuery, [ClassId, ExId, StudentId], (err, results) => {
        if (err) {
            console.error('Error checking for existing entry:', err);
            return res.status(500).send({ message: 'Error checking for duplicate entry' });
        }
        if (results.length > 0) {
            return res.status(400).send({ message: 'Exam entry already exists for this ClassId, ExId, and StudentId' });
        }
        // Insert into the `exam` table
        const MarkQuery = `INSERT INTO exam (ClassId, ExId, StudentId, RollNo) VALUES (?, ?, ?, ?)`;

        db.query(MarkQuery, [ClassId, ExId, StudentId, RollNo], (err, results) => {
            if (err) {
                console.error('Error inserting into exam table:', err);
                return res.status(500).send({ message: 'Error adding exam data' });
            }

            // Get the `ExamId` of the newly inserted row
            const ExamId = results.insertId;

            // Prepare data for `exam_standrad` table
            const MarkStandardData = Subjects.map(mark => [
                ExamId,
                ClassId,
                ExId,
                StudentId,
                RollNo,
                mark.SubjectId,
                mark.OutOfMarks,
                mark.TotalMarks
            ]);

            // Insert into `exam_standrad` table using bulk insert
            const MarkStandardQuery = `INSERT INTO exam_standrad (ExamId, ClassId, ExId, StudentId, RollNo, SubjectId, OutOfMarks, TotalMarks) VALUES ?`;

            db.query(MarkStandardQuery, [MarkStandardData], (err, results) => {
                if (err) {
                    console.error('Error inserting into exam_standrad table:', err);
                    return res.status(500).send({ message: 'Error adding exam_standrad data' });
                }

                res.send({
                    message: 'Data added successfully!',
                    data: results
                });
            });
        });
    });
}); 
app.get('/exam/:ExamId', (req, res) => {
    let id = req.params.ExamId;
    let tec = `SELECT * FROM exam_standrad WHERE ExamId = ${id}`;
    db.query(tec, (err, results) => {
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
app.put('/exam/:ExamId', (req, res)=>{
    const { ExamId } = req.params;
    const { ClassId, ExId, StudentId, RollNo, SubjectId, TotalMarks, OutofMarks } = req.body;
    const query = `UPDATE exam_standrad SET ClassId = ?, ExId = ?, StudentId = ?, RollNo = ?, SubjectId = ?, TotalMarks = ?, OutofMarks = ? WHERE ExamId = ?`;
    const values = [ClassId, ExId, StudentId, RollNo, SubjectId, TotalMarks, OutofMarks, ExamId];
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
app.delete('/exam/:ExamId',(req,res)=>{
    let id = req.params.ExamId;
    let tec = `DELETE FROM exam WHERE ExamId = '${id}'`;
    db.query(tec,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'Data Deleted Successfully!',
            data:results
        })
    })
});
app.get('/examDataStudectId/:StudentId', (req, res) => {
    let id = req.params.StudentId;
    let tec = `SELECT * FROM exam WHERE StudentId = ${id}`;
    db.query(tec, (err, results) => {
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
//Attendance Table
app.get('/studentattendance',(req,res)=>{
    console.log('Get studentattendance All Data');
    let sub= 'SELECT * FROM studentattendance';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All studentattendance Data',
                data:results
            })
        }
    })
});
app.post('/studentattendance', (req, res) => {
    const attendanceData = req.body;  
    const { ClassId, RollNo, Date } = attendanceData[0];
    let checkQuery = 'SELECT * FROM studentattendance WHERE ClassId = ? AND RollNo = ? AND Date = ?'; 
    db.query(checkQuery, [ClassId, RollNo, Date], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking existing data:', checkError);
            return res.status(500).send({ message: 'Failed to check existing attendance data' });
        }
        if (checkResults.length > 0) {
            return res.status(400).send({ message: 'Attendance for this class and subject already exists' });
        }
        let query = 'INSERT INTO studentattendance (ClassId, SubjectId, StudentId, RollNo, Status, Date) VALUES ?';
        const values = attendanceData.map(item => [
        item.classId,
        item.subjectId,
        item.studentId,
        item.rollNo,
        item.status,
        item.date
        ]);  
        db.query(query, [values], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send({ message: 'Failed to save attendance data' });
        }
        res.status(200).send({ message: 'Attendance saved successfully' });
        });
    });
});

app.get('/teacherattendance',(req,res)=>{
    console.log('Get teacherattendance All Data');
    let sub= 'SELECT * FROM teacherattendance';
    db.query(sub,(err, results)=>{
        if(err){
            console.log(err, 'errors');
        }
        if(results.length>0){
            res.send({
                message:'All teacherattendance Data',
                data:results
            })
        }
    })
});
app.post('/teacherattendance', (req, res) => {
    const attendanceData = req.body;  
    // const { TeacherId, Date } = attendanceData[0];
    // let checkQuery = 'SELECT * FROM studentattendance WHERE TeacherId = ? AND Date = ?'; 
    // db.query(checkQuery, [TeacherId, Date], (checkError, checkResults) => {
    //     if (checkError) {
    //         console.error('Error checking existing data:', checkError);
    //         return res.status(500).send({ message: 'Failed to check existing attendance data' });
    //     }
    //     if (checkResults.length > 0) {
    //         return res.status(400).send({ message: 'Attendance for this already exists' });
    //     }
        let query = 'INSERT INTO teacherattendance (TeacherId, Status, Date) VALUES ?';
        const values = attendanceData.map(item => [
        item.TeacherId,
        item.status,
        item.date
        ]);  
        db.query(query, [values], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send({ message: 'Failed to save attendance data' });
        }
        res.status(200).send({ message: 'Attendance saved successfully' });
        });
    //});
});
app.get('/teacherattendancestatus', (req, res) => {
    const teacherId = req.query.TeacherId; // Optional query parameter for specific teacher
    const status = req.query.Status; // Optional query parameter for filtering status

    let sub = `
      SELECT t.TeacherId, t.TeacherName, t.Mobile, t.Email
        FROM teacher t
        LEFT JOIN teacherattendance ta ON t.TeacherId = ta.TeacherId AND ta.Date = CURDATE()
        WHERE ta.TeacherId IS NULL;`;

    // Optional: If you want to filter by TeacherId or Status
    if (teacherId) {
        sub += ` AND ta.TeacherId = ${db.escape(teacherId)}`;
    }
    if (status !== undefined) {
        sub += ` AND ta.Status = ${db.escape(status)}`;
    }

    db.query(sub, (err, results) => {
        if (err) {
            console.log(err, 'errors');
            return res.status(500).send({ message: 'Server Error' });
        }

        if (results.length > 0) {
            res.send({
                message: 'Filtered teacherattendance Data',
                data: results
            });
        } else {
            res.send({ message: 'No data found' });
        }
    });
});



//Server running port
app.listen(3000,()=>{
    console.log('Server is running on 3000 PORT')
})
//nodemon index.js - Database run Command