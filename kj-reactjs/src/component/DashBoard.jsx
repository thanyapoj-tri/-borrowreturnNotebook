import React, { useState, useEffect,} from 'react';
import axios from 'axios';

const MachineDropdown = ({ machines }) => {
  return (
    <div>
      <select>
        {machines.map((machine, index) => (
          <option key={index} value={machine.value}>
            Machine {machine.value}
          </option>
        ))}
      </select>
    </div>
  );
};

function BorrowReturnApp() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [machine, setMachine] = useState('');
  const [borrowed, setBorrowed] = useState([]);
  const [availableMachines, setAvailableMachines] = useState([]);

  useEffect(() => {
    // Fetch available machines from the server
    axios.get('http://localhost:3000/machines')
      .then(response => {
        // Extract the machines array from the response data
        const machinesArray = response.data && response.data;
        if (machinesArray) {
          setAvailableMachines(machinesArray);
        }
      })
      .catch(error => {
        console.error('Error fetching available machines:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Handle submitting the borrowing request
    const newBorrow = { name, amount, machine };
    setBorrowed([...borrowed, newBorrow]);
    // Update available machines
    const updatedMachines = availableMachines.filter(m => m.value !== machine);
    setAvailableMachines(updatedMachines);
    // Make a POST request to update the server
    axios.post('http://localhost:3000/borrowed', newBorrow)
      .then(response => {
        console.log('Borrow request submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting borrow request:', error);
      });
  };

  const handleReturn = (borrow) => {
    // Handle returning a borrowed laptop
    const updatedBorrowed = borrowed.filter(b => b !== borrow);
    setBorrowed(updatedBorrowed);
    setAvailableMachines([...availableMachines, borrow.machine]);
    // Make a POST request to update the server for returning
    axios.post('http://localhost:3000/return', borrow)
      .then(response => {
        console.log('Return request submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting return request:', error);
      });
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Amount:
        <select value={amount} onChange={(e) => setAmount(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      {amount > 1 && <MachineDropdown machines={availableMachines} />}
      <label>
        Machine:
        <select value={machine} onChange={(e) => setMachine(e.target.value)}>
        {availableMachines.length > 0 ? (
          availableMachines.map((machine, index) => (
            <option key={index} value={machine.value}>
              Machine {machine.value}
            </option>
          ))
        ): (
          <option value="">Loading...</option>
        )}
        
        </select>
      </label>
      <button onClick={handleSubmit}>Borrow</button>
      <div>
        <h2>Borrowed</h2>
        {borrowed.map((borrow, index) => (
          <div key={index}>
            <p>{borrow.name} borrowed {borrow.amount} laptop(s) - Machine {borrow.machine}</p>
            <button onClick={() => handleReturn(borrow)}>Return</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BorrowReturnApp;
