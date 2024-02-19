import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormComponent from './component/FormComponent.jsx'
import DashBoard from './component/DashBoard.jsx'
import Table from './Table.jsx'

function App() {

  return (
    <>
      {/* <FormComponent /> */}
      <DashBoard />
      <Table />
    </>
  )
}

export default App
