import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Adminlogin from './components/Adminlogin';
import Userlogin from './components/Userlogin';
import Admindashboard from './components/Admindashboard';
import Userdashboard from './components/Userdashboard';
import Adminrequest from './components/Adminrequest';
import Toaster from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNewUser from './components/CreateNewUser';
import UserRequests from './components/PendingInventoryRequests';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Footer from './components/Footer';
import About from './components/About';
import Contacts from './components/Contacts';
import Services from './components/Services';
import InventoryRequest from './components/Inventory/InventoryrequestbyUser';
import MyinventoryUser from './components/Inventory/MyinventoryUser';
import MyRequests from './components/Inventory/MyRequests';
import PendingInventoryRequests from './components/PendingInventoryRequests';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import ProtectedRouteAdmin from './components/ProtectedRoutsAdmin';
import { ShopContextProvider } from './components/context/shop-context';
import Arrow from './components/Arrow';
import NewItemEntries from './components/Inventory/NewItemEntries';

function App() {
  return (
    <Router>
      <ShopContextProvider>
        <AppContent />
      </ShopContextProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/adminlogin' || location.pathname === '/userlogin';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/services" element={<Services />} />

        {/* Protected Routes User */}
        <Route path="/" element={<ProtectedRouteUser />}>
          <Route path="userdashboard" element={<Userdashboard />} />
          <Route path="/requestitem" element={<InventoryRequest />} />
          <Route path="/myinventory" element={<MyinventoryUser />} />
          <Route path="/myrequests" element={<MyRequests />} />
          <Route path="/pendingInventoryRequests" element={<PendingInventoryRequests />} />
        </Route>

        {/* Protected Routes Admin */}
        <Route path="/" element={<ProtectedRouteAdmin />}>
          <Route path="admindashboard" element={<Admindashboard />} />
          <Route path="/adminrequest" element={<Adminrequest />} />
          <Route path="/createNewUser" element={<CreateNewUser />} />
          <Route path="/userrequests" element={<PendingInventoryRequests />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/newitementries" element={<NewItemEntries />} />
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
