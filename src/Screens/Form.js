import React, { useState } from 'react';
import './Form.css';

const Form = ({ addEntry }) => {
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(0);
  const [grade, setGrade] = useState('A+');

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      courseName,
      creditHours,
      grade,
    };

    addEntry(entry);

    setCourseName('');
    setCreditHours(0);
    setGrade('A+');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label">
        Course Name:
        <input
          className="form-input"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </label>
      <label className="form-label">
        Credit Hours:
        <input
          className="form-input"
          type="number"
          min="0"
          max="4"
          value={creditHours}
          onChange={(e) => setCreditHours(parseInt(e.target.value))}
        />
      </label>
      <label className="form-label">
        Grade:
        <select
          className="form-input"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </label>
      <button className="form-button" type="submit">Add Entry</button>
    </form>
  );
};

export default Form;
