import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    fetch("https://localhost:7292/api/Registration/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Valid User") {
          localStorage.setItem("isLoggedIn", "true");
          window.dispatchEvent(new Event("storage"));

          // Show the modal
          setShowModal(true);

          // Close modal after 2 seconds and redirect
          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 2000);
        } else {
          setErrorMessage("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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

        {/* Error Message (shown only if login fails) */}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{backgroundColor:'white', color:'black'}}>
                <h5 className="modal-title">Success</h5>
              </div>
              <div className="modal-body" style={{backgroundColor:'black', color:'white'}}>
                <p>You have successfully logged in...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;