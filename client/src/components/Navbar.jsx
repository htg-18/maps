import React ,{useState,useEffect} from 'react'
import {Link,NavLink} from "react-router-dom"
import logo from '../assets/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    useEffect(() => {
        // Set menuOpen to false on screens smaller than 480px
        const handleResize = () => {
          if (window.innerWidth <= 480) {
            setMenuOpen(false);
          } else {
            setMenuOpen(true);
          }
        };
    
        // Set initial state based on window width
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  return (
    <nav  className='w-screen min-w-screen min-h-[70px] flex justify-between items-center bg-teal-900 sticky top-0'>

<Link to="/admindashboard" className='text-white text-3xl font-extrabold'>
        <img src={logo} alt='LOGO' className='h-14 w-60'/>
      </Link>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`flex text-white ${menuOpen ? 'open' : 'hidden'}`}>
        <li className='p-3 rounded-[12px]'>
          <NavLink to="/about" activeClassName="active" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
        </li>
        <li className='p-3 rounded-[6px]'>
          <NavLink to="/Services" activeClassName="active" onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
        </li>
        <li className='p-3 rounded-[6px]'>
          <NavLink to="/Contact" activeClassName="active" onClick={() => setMenuOpen(false)}>
            Contacts
          </NavLink>
        </li>
      </ul>

         <style>
          {
            `
             .active{
                color:white;
                font-size:1.1rem;
                font-weight:bold;
             }
             li:hover{
                font-weight:bold;
             }
             nav .menu {
                display: none;
                position: absolute;
                top: 0.75rem;
                right: 0.5rem;
                flex-direction: column;
                justify-content: space-between;
                width: 2.25rem;
                height: 2rem;
            }

            nav .menu span {
                height: 0.4rem;
                width: 100%;
                background-color: #fff;
                border-radius: 0.2rem;
            }


            @media (max-width: 480px) {
                nav .menu {
                    display: flex;
                }

                nav {
                    flex-direction: column;
                    align-items: flex-start;
                }

                 .hidden{
                    display: none;
                 }
                 .open{
                    display: flex;
                    flex-direction: column;
                 }
                nav ul li {
                    width: 100%;
                    text-align: center;
                }

               
            }
            `
          }
        </style> 
        
    </nav>
  )
}

export default Navbar