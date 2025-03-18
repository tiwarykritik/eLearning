import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on component mount and when localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
    };

    // Initial check
    checkLoginStatus();

    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Login Navbar (shown when user is not logged in)
  const LoginNavbar = () => (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black', padding: '10px 20px' }}>
      <div className="container">
        <p className="navbar-brand" style={{ color: 'bisque', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'serif' }}>
          E-Learning
        </p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'bisque', fontSize: '1rem' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{ color: 'bisque', fontSize: '1rem' }}>Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ color: 'bisque', fontSize: '1rem' }}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  // Main Navbar (shown when user is logged in)
  const MainNavbar = () => (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black', padding: '10px 20px' }}>
      <div className="container">
        <p className="navbar-brand"  style={{ color: 'bisque', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'serif' }}>
          E-Learning
        </p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'bisque', fontSize: '1rem' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard" style={{ color: 'bisque', fontSize: '1rem' }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses" style={{ color: 'bisque', fontSize: '1rem' }}>Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={handleLogout} style={{ color: 'bisque', fontSize: '1rem' }}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return isLoggedIn ? <MainNavbar /> : <LoginNavbar />;
};

export default Navigation;