import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StudentList from './components/StudentList';


function App() {

  //Define state variables
  const [studentList, setStudentList] = useState([{}]);//default value is empty array of objects.
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  //Fast API Call to Get all student data on page load
  useEffect(() => {
    getAllStudents()
  }, []); //Se coloca ", []" para que la llamada se haga solo una vez y no quede enviandola infinitamente comiendo recursos.

  const getAllStudents = () => {
    axios.get('http://127.0.0.1:8000/students')
      .then(
        response => {
          console.log(response.data);
          setStudentList(response.data); //This is how you set data in your state variables
        }
      )//resolve the promise object
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const addNewStudent = (student) => {
    axios.post('http://127.0.0.1:8000/students', student)
      .then(response => {
        getAllStudents();
        alert("Student added successfully!");
      })
      .catch((err) => { console.log(err); })
  }

  const updateStudent = (student) => {
    axios.put(`http://127.0.0.1:8000/students/${studentId}`, student)
      .then(response => {
        getAllStudents();
        alert("Student added successfully!");
      })
      .catch((err) => { console.log(err); })
  }

  //Fast API Call to Add a new student
  const addUpdateStudent = () => {
    const student = {
      'student_name': studentName,
      'student_email': studentEmail,
      'student_phone': studentPhone
    };
    if (studentId != '') {
      updateStudent(student)
    } else {
      addNewStudent(student)
    }
  }

  return (
    <div className="container">
      <div className="text-center mt-3 list-group-item justify-content-center align-items-center mx-auto"
        style={{ "width": "80vw", "backgroundColor": "#ffffff" }}>
        <h2 className="card text-white bg-primary mb-1 pb-2">Scholl Management System</h2>
        <h6 className="card text-white bg-primary mb-1 pb-1">Manage Your Students</h6>
        <div className="card-body">
          <h5 className="card text-white bg-dark pb-1">Add Your Student</h5>
          <span className="card-text">
            <input value={studentName} onChange={event => setStudentName(event.target.value)} className="mb-2 form-control stud-name" placeholder='Enter name'></input>
            <input value={studentEmail} onChange={event => setStudentEmail(event.target.value)} className="mb-2 form-control stud-email" placeholder='Enter email'></input>
            <input value={studentPhone} onChange={event => setStudentPhone(event.target.value)} className="mb-2 form-control stud-phone" placeholder='Enter phone'></input>
            <button onClick={addUpdateStudent} className="mb-2 btn btn-outline-primary" style={{ 'fontWeight': 'bold' }}>Add Student</button>
          </span>
          <h5 className="card text-white bg-dark pb-1">Your Student</h5>
          <div>
            <StudentList
              setStudentId={setStudentId}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setStudentPhone={setStudentPhone}
              setStudentList={setStudentList}
              studentListVar={studentList} />
          </div>
        </div>
        <h6 className="card text-dark bg-warning py-2">"All rights reserver &copy;2023</h6>
      </div>
    </div>
  );
}

export default App;
