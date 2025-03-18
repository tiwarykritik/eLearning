import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For password mismatch
  const [showModal, setShowModal] = useState(false); // Modal state
  const [isCheckingEmail, setIsCheckingEmail] = useState(false); // Email check state
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  // Function to check if email exists
  const checkEmailAvailability = (emailToCheck) => {
    if (!emailToCheck || !emailToCheck.includes('@')) return;
    
    setIsCheckingEmail(true);
    fetch("https://localhost:7292/api/Registration/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: emailToCheck }),
    })
      .then(response => response.text())
      .then(data => {
        console.log("Email check response:", data);
        if (data === "Email already registered") {
          setErrorMessage("This email is already registered");
        } else {
          setErrorMessage("");
        }
        setIsCheckingEmail(false);
      })
      .catch(error => {
        console.error("Error checking email:", error);
        setIsCheckingEmail(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setErrorMessage(""); // Clear error if matched

    // Send registration request to API
    fetch("https://localhost:7292/api/Registration/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        UserName: name, 
        Email: email, 
        Password: password,
        IsActive: 1
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log("Registration response:", data);
        if (data === "Data Inserted") {
          setShowModal(true); // Show modal on successful registration
        } else if (data === "User already registered") {
          setErrorMessage("This email is already registered. Please use a different email.");
        } else {
          setErrorMessage("Registration failed: " + data);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setErrorMessage("An error occurred during registration. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Add a small delay to avoid too many API calls while typing
              if (e.target.value) {
                setTimeout(() => checkEmailAvailability(e.target.value), 500);
              }
            }}
            required
          />
          {isCheckingEmail && <small className="text-muted">Checking email availability...</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message (Red Color) */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header with Bisque Background */}
              <div className="modal-header" style={{backgroundColor:'white', color:'black'}}>
                <h5 className="modal-title">Registration Successful</h5>
              </div>
              <div className="modal-footer" style={{backgroundColor:'black', color:'white'}}>
                <button className="btn btn-primary" onClick={() => navigate("/login")}>
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;