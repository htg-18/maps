import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Adminlogin from './components/AdminLogin/Adminlogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavbarFooter/Navbar';
import Footer from './components/NavbarFooter/Footer';
import Contacts from './components/OtherPages/Contacts';
import Services from './components/OtherPages/Services';
import ProtectedRouteAdmin from './components/AdminLogin/ProtectedRoutsAdmin';
import Arrow from './components/OtherPages/Arrow';
import States from './components/Maps/States';
import { GeoProvider } from './components/context/GeoContext';
import Map from "./components/Maps/Map"
import DevTeam from './components/OtherPages/DevTeam';
import PanIndia from './components/Maps/PanIndia';

function App() {
  return (
    <Router>
     <GeoProvider>
        <AppContent />
      </GeoProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/adminlogin' ;

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/about" element={<DevTeam />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/services" element={<Services />} />

        {/* Protected Routes Admin */}
        <Route path="/" element={<ProtectedRouteAdmin />}>
          <Route path="/admin/map" element={<Map />} />
          <Route path="/admin/state" element={<States/>}/>
          <Route path="/admin/filterByZone" element={<PanIndia/>}/>
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>

      {!isLoginPage && <Footer />}
      <ToastContainer />
      {!isLoginPage && <Arrow />}
    </>
  );
}

export default App;
