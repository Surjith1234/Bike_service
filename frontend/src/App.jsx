import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import AddServices from './pages/Owner/AddServices'
import Service from './pages/Service'
import Mybooking from './pages/Mybooking'
import Booking from './pages/Booking'
import Status from './pages/Status'
import UpdateService from './pages/Owner/UpdateService'


function App() {
  return (
    
  <BrowserRouter>
    <Navbar/>
    <Routes>
      {/* ProtectedRoute ensures that the Home component is only accessible if the user is authenticated */}
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      {/* Route for the register page */}
      <Route path='/register' element={<Register/>}/>
      {/* Route for the login page */}
      <Route path='/login' element={<Login/>}/>
      {/* ProtectedRoute ensures that the AddServices component is only accessible if the user is authenticated */}
      <Route path='/addservice' element={<ProtectedRoute><AddServices/></ProtectedRoute>}/>
      {/* ProtectedRoute ensures that the Service component is only accessible if the user is authenticated */}
      <Route path='/service' element={<ProtectedRoute><Service/></ProtectedRoute>}/>
      {/* ProtectedRoute ensures that the Mybooking component is only accessible if the user is authenticated */}
      <Route path='/mybooking' element={<ProtectedRoute><Mybooking/></ProtectedRoute>}/> 
      {/* ProtectedRoute ensures that the Booking component is only accessible if the user is authenticated */}
      <Route path='/booking' element={<ProtectedRoute><Booking/></ProtectedRoute>}/>
      {/* ProtectedRoute ensures that the status component is only accessible if the user is authenticated */}
      <Route path='/status' element={<ProtectedRoute><Status/></ProtectedRoute>}/>
      {/* ProtectedRoute ensures that the updateService component is only accessible if the user is authenticated */}
      <Route path='/updateservice' element={<ProtectedRoute><UpdateService/></ProtectedRoute>}/>
    </Routes>
  </BrowserRouter>
  )
}


export default App