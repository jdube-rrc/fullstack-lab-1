import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { EmployeePage } from './components/pages/EmployeePage'
import { Organization } from './components/pages/Organization'
import { departments } from './data/employeeData'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeePage departments={departments} />} />
          <Route path="employees" element={<EmployeePage departments={departments} />} />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App