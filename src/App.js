import React, { useState , useEffect } from "react";
import './App.css';
import Form from "./Screens/Form.js";

const grade_point_dict = {
  "A+": 4.0,
  "A":4.0,
  "A-":3.7,
  "B+":3.3,
  "B":3.0,
  "B-":2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D":1.0 ,
  "F":0.0,
};

const App = () => {
  const [termEntries, setTermEntries] = useState(JSON.parse(localStorage.getItem('entries')) || []);
  const [cgpa, setCgpa] = useState(parseFloat(localStorage.getItem('cgpa')) || 4.0);
  const [creditHours, setCreditHours] = useState(parseInt(localStorage.getItem('creditHours')) || 0);
  const [gradePoint, setGradePoint] = useState(parseFloat(localStorage.getItem('gradePoint')) || 0.0);

  useEffect(() => {
    console.log(gradePoint)
    console.log(creditHours)
    setCgpa(gradePoint / creditHours);
    localStorage.setItem('cgpa', cgpa.toString());
  }, [creditHours, gradePoint]);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(termEntries));
  }, [termEntries]);

  const addEntry = (entry) => {
    setTermEntries([...termEntries, entry]);
    setCreditHours(creditHours + entry["creditHours"]);
    let grade_points = grade_point_dict[entry["grade"]] * entry["creditHours"];
    setGradePoint(gradePoint + grade_points);
  };

  const deleteEntry = (index) => {
    const entry_deleted = termEntries[index];
    setCreditHours(creditHours - entry_deleted["creditHours"]);
    setGradePoint(gradePoint - (grade_point_dict[entry_deleted["grade"]] * entry_deleted["creditHours"]));
    const updatedEntries = [...termEntries];
    updatedEntries.splice(index, 1);
    setTermEntries(updatedEntries);
  };

  useEffect(() => {
    localStorage.setItem('creditHours', creditHours.toString());
    localStorage.setItem('gradePoint', gradePoint.toString());
  }, [creditHours, gradePoint]);

  return (
    <div>
      <div className="Heading">
        <h1>CGPA Calculator</h1>
        <h4>by Minhal Javed</h4>
      </div>

      <div className="AddingForm">
        <Form addEntry={addEntry} />
      </div>

      <div className="CGPA-Display">
        <h1>CGPA: {creditHours === 0? "0.00": cgpa.toFixed(2)}</h1>
        <h2>Total Credit Hours Taken: {creditHours.toFixed(0)}</h2>
      </div>

      <div className="EntryTable">
        <table>
          <thead>
            <tr>
              <th>Action</th> 
              <th>Course Name</th>
              <th>Credit Hours</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {termEntries.map((entry, index) => (
              <tr key={index+1}>
                <td>
                  <button className="delete-button" onClick={() => deleteEntry(index)}>X</button>
                </td>
                <td>{entry.courseName}</td>
                <td>{entry.creditHours}</td>
                <td>{entry.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
