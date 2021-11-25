import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import './Navbar.css';

//import Registration from '../Registration-form/Registration';

const Navbar = ()=>{
  const history=useHistory();

  const handleLogout=()=>{
    localStorage.removeItem("isAuthenticated");
    //localStorage.clear();
    //window.location.pathname('/');
    history.push('/');
  }
  return(
    <nav>
      <div className="sidenav">
      <ul>
        {/* <li>
          <NavLink exact to='/registration'>Registration Form</NavLink>
        </li> */}
        <li>
          <NavLink exact to='/userDetails'>User Details</NavLink>
        </li>
        <li>
        <button type="submit" name="logout" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
    </nav>
  )
}

export default Navbar;