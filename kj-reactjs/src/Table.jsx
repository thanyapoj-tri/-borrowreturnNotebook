import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Table() {
    const [borrow, setData] = useState([])
    const [machines, setMachines] = useState([]);

    useEffect(()=> {
      axios.get('http://localhost:3000/borrowed')
        .then(res => setData(res.data || []))
        .catch(er => console.log(er))
      axios.get('http://localhost:3000/machines')
        .then(response => setMachines(response.data || []));
          
    }, []);


  return (
    <><div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>numNotebook</th>
            <th>machineNumber</th>
          </tr>
        </thead>
        <tbody>
          {borrow.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.amount}</td>
              <td>{user.machine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <label>Select a machine:</label>

      <select>
          {machines.length > 0 ? (
            machines.map(machine => (
              <option key={machine.id} value={machine.value}>
                {machine.id}
              </option>
            ))
          ) : (
            <option value="">Loading...</option>
          )}
        </select>
    </div>
      </>
  )
}

export default Table