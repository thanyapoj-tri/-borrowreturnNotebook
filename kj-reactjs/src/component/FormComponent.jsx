import React, { useState } from 'react';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [notebookDropdown, setNotebookDropdown] = useState(1);
  const [machineNumberDropdown, setMachineNumberDropdown] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const MachineDropdown = ({ count }) => {
    // Generate an array of count numbers for the dropdowns
    const machines = Array.from({ length: count }, (_, index) => index + 1);
  
    return (
      
        machines.map((machine) => (
          <select>
          {[...Array(10)].map((_,machine) => (
            <option key={machine} value={machine+1}>
              Machine {machine+1}
            </option>
          ))}
        </select>
        ))
      
    );
  };



  const handleNotebookChange = (e) => {
    setNotebookDropdown(parseInt(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h1>แบบฟอร์ม</h1>
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Notebook จำนวน:
        <select value={notebookDropdown} onChange={(e) => setNotebookDropdown(e.target.value)}>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>{index + 1}</option>
          ))}
        </select>
        เครื่อง
      
        
        </label>
      <br />

       
          <label>
        Machine: <MachineDropdown count={notebookDropdown} />
      </label>
      
      <br />
      <label>
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="return">Return</button>
    </form>
  );
};


export default FormComponent;
