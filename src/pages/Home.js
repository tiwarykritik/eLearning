import React from "react";
import web from "../assets/web.jpg";
import ds from "../assets/ds.jpg";
import java from "../assets/java.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">Welcome to E-Learning Dashboard</h1>
              <p className="lead">Your journey to mastering new skills begins here.</p>
              <Link to="/courses" className="btn btn-light btn-lg mt-3">Explore Courses</Link>
            </div>
            <div className="col-md-6 text-center">
              
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Why Choose Our Platform?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-book fs-2 text-primary"></i>
                </div>
                <h5 className="card-title">Diverse Course Selection</h5>
                <p className="card-text">From programming to design, we offer courses for every interest and skill level.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-graph-up fs-2 text-primary"></i>
                </div>
                <h5 className="card-title">Track Your Progress</h5>
                <p className="card-text">Our intuitive dashboard helps you monitor your learning journey every step of the way.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-trophy fs-2 text-primary"></i>
                </div>
                <h5 className="card-title">Earn Certificates</h5>
                <p className="card-text">Complete courses and quizzes to earn certificates that showcase your new skills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses Preview */}
      {/* Popular Courses Preview */}
<div className="bg-light py-5">
  <div className="container">
    <h2 className="text-center mb-4">Popular Courses</h2>
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card h-100">
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img src={web} className="card-img-top" alt="Web Development" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">Web Development</h5>
            <p className="card-text">Learn HTML, CSS, and JavaScript to build beautiful websites.</p>
            <Link to="/course/1" className="btn btn-outline-primary">View Course</Link>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100">
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img src={java} className="card-img-top" alt="Java Programming" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">Basic & Core Java</h5>
            <p className="card-text">Master object-oriented programming with Java.</p>
            <Link to="/course/2" className="btn btn-outline-primary">View Course</Link>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100">
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img src={ds} className="card-img-top" alt="Data Structures" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">Data Structures</h5>
            <p className="card-text">Learn essential data structures for efficient programming.</p>
            <Link to="/course/3" className="btn btn-outline-primary">View Course</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      
      {/* Call to Action */}
      <div className="container my-5 text-center">
        <div className="p-5 bg-primary text-white rounded">
          <h1 style={{fontFamily:"cursive"}}>"E-learning is not just a phase, it's the future's mainstay of education"</h1>
          <br></br>
          <br></br>
          <h3>Ready to Start Learning?</h3>
          <p className="lead">Join thousands of students who are mastering new skills on our platform.</p>
      
        </div>
      </div>
    </div>
  );
};

export default Home;