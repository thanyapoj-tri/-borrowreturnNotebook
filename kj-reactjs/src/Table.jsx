import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Table() {
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/borrowed')
        .then(res => setData(res.data))
        .catch(er => console.log(er))
    }, [])
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>numNotebook</th>
                <th>machineNumber</th>
            </tr>
        </thead>
        <tbody>
                {
                    data.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.amount}</td>
                            <td>{user.machine}</td>
                        </tr>
                    ))
                }
        </tbody>
      </table>
    </div>
  )
}

export default Table