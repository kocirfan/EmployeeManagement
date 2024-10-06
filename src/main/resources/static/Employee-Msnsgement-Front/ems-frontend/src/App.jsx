
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFoundPage from './components/NotFoundPageComponent'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
              <Route path='/' element ={<ListEmployeeComponent />} ></Route>
              <Route path='/emplooyes' element ={<ListEmployeeComponent />} ></Route>
              <Route path='/add-employee' element ={<EmployeeComponent />} ></Route>
              <Route path='/edit-employee/:id' element ={<EmployeeComponent />} ></Route>
              <Route path="/edit-employee/:id/*" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
