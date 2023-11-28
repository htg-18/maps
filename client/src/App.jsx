import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Adminlogin from "./components/Adminlogin"
import Userlogin from "./components/Userlogin"
import Admindashboard from "./components/Admindashboard"
import Userdashboard from "./components/Userdashboard"
import Adminrequest from "./components/Adminrequest"
import Toaster from "react-hot-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNewUser from "./components/CreateNewUser"
import UserRequests from "./components/UserRequests"
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import Footer from "./components/Footer"
import About from "./components/About"
import Contacts from "./components/Contacts"
import Services from "./components/Services"
function App() {
  
  return (
    <>
    {/* <div><Toaster/></div> */}
      <Router >
        <Navbar/>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/adminlogin" element={<Adminlogin/>}/>
          <Route path="/userlogin" element={<Userlogin/>}/>
          <Route path="/admindashboard" element={<Admindashboard/>}/>
          <Route path="/userdashboard" element={<Userdashboard/>}/>
          <Route path="/adminrequest" element={<Adminrequest/>}/>
          <Route path="/createNewUser" element={<CreateNewUser/>}/>
          <Route path="/userrequests" element={<UserRequests/>}/>
          <Route path="/admin/users" element={<Users/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contacts/>}/>
          <Route path="/services" element={<Services/>}/>
        </Routes>
        <Footer/>
      </Router>
       <ToastContainer/>
    </>
  )
}

export default App
