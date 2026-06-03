import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext); 
    const navigate = useNavigate();
  
   const handleLogout = () => {
     logout();
     navigate("/login");
   };
  
  return (
    <header className="navbar">
      <div className="newLogo">
        <img src="/logoOrvix.png" alt="logo" />
        <h1>Finsight</h1>
      </div>

      <nav className="nav">
        <ul className="navLinks">
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/onboarding">Finance</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </nav>
    </header>
  );
}