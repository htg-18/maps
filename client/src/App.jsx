import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Adminlogin from "./components/Adminlogin"
import Userlogin from "./components/Userlogin"
import Admindashboard from "./components/Admindashboard"
import Userdashboard from "./components/Userdashboard"
import Adminrequest from "./components/Adminrequest"
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adminlogin" element={<Adminlogin/>}/>
          <Route path="/userlogin" element={<Userlogin/>}/>
          <Route path="/admindashboard" element={<Admindashboard/>}/>
          <Route path="/userdashboard" element={<Userdashboard/>}/>
          <Route path="/adminrequest" element={<Adminrequest/>}/>
        </Routes>
      </Router>
      

    </>
  )
}

export default App
