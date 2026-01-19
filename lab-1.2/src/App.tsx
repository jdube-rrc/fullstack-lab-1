import { Page } from './components/Page'
import { departments } from './data/employeeData'
import './App.css'

function App() {
  return <Page departments={departments} />
}

export default App
