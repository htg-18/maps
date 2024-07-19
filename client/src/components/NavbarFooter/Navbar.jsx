import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    } else if (localStorage.getItem("admintoken")) {
      localStorage.removeItem("admintoken");
    }
    navigate("/home");
  };

  const isLoggedIn = localStorage.getItem("token") || localStorage.getItem("admintoken");
  const menuClass = `md:flex items-center text-white ${menuOpen ? "flex" : "hidden"} flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#2c2c2c] p-4 md:p-0 z-10`;

  return (
    <nav className="max-h-[70px] w-full flex justify-between items-center bg-[#2c2c2c] shadow-lg sticky top-0  p-4" style={{zIndex:40}}>
      <Link to="/admin/map" className="flex items-center text-white text-3xl font-extrabold">
        <img src={logo} alt="LOGO" className="h-14 w-auto mr-2" />
      </Link>

      <div className="menu md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="block w-8 h-0.5 bg-white mb-1"></span>
        <span className="block w-8 h-0.5 bg-white mb-1"></span>
        <span className="block w-8 h-0.5 bg-white"></span>
      </div>

      <ul className={menuClass} style={{ fontSize: 18, fontWeight: 400 }}>
        <NavItem to="/about" onClick={() => setMenuOpen(false)}>About Us</NavItem>
        <NavItem to="/services" onClick={() => setMenuOpen(false)}>Services</NavItem>
        <NavItem to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavItem>
        {isLoggedIn && (
          <li className="p-3">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const NavItem = ({ to, onClick, children }) => (
  <li className="p-3 rounded-md transition duration-300 ease-in-out">
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-white hover:bg-orange-700 hover:text-white px-3 py-2.5 rounded-md ${isActive ? "font-bold text-gray-300" : ""}`
      }
    >
      {children}
    </NavLink>
  </li>
);

export default Navbar;
