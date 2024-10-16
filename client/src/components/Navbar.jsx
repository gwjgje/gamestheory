import React, { useEffect, useState } from 'react'
import style from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { FaUserShield, FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Navbar() {
     const { user } = useSelector(store => store.authManager);
     const [userFromSs, setUserFromSs] = useState(sessionStorage.getItem("USER") || "");

     useEffect(() => {
          if (user.name) setUserFromSs(user.name);
     }, [user])

     return (
          <header className={style.Navbar}>
               <Link to='/' className={style.logo}>
                    <img src="basketball.png" alt="logo" />
                    <h1>Playo</h1>
               </Link>

               <nav>
                    <ul>
                         <li><Link to="/">Home</Link></li>
                         <li><Link to="/dashboard">Dashboard</Link></li>
                         <li>
                              {
                                   userFromSs ? <a href='#'>
                                        <FaRegUserCircle />
                                        {userFromSs}
                                   </a> :
                                        <Link to="/auth">
                                             <FaUserShield />
                                             <span>Sign in</span>
                                        </Link>
                              }
                         </li>
                    </ul>
               </nav>
          </header>
     )
}

export default Navbar