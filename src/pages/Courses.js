import React from "react";
import { Link } from "react-router-dom";
import "./Courses.css"; // Import styles
import { useEnrollment } from "../components/EnrollmentContext";

const Courses = () => {
  // Use enrollment context instead of local state
  const { enrolledCourses, enrollCourse } = useEnrollment();

  // Course metadata - helps display course names in Dashboard
  const courseData = [
    {
      id: 1,
      title: "Web Development",
      subtitle: "Learn HTML, CSS, JavaScript, and Bootstrap.",
      description: "A beginner-friendly course covering the fundamentals of web development."
    },
    {
      id: 2,
      title: "Basic & Core Java",
      subtitle: "Master Java fundamentals & OOP concepts.",
      description: "Get hands-on experience with Java syntax, data and OOP."
    },
    {
      id: 3,
      title: "Data Structures",
      subtitle: "Learn sorting, searching & problem-solving.",
      description: "Understand the core concepts of data structures and algorithms in Java."
    }
  ];

  return (
    <div className="container mt-4 courses-container">
      <h1 className="text-center courses-title">Courses</h1>
      <div className="row justify-content-center">
        {/* Course 1 */}
        <div className="col-md-4">
          <div className="card course-card">
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>Web Development</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Learn HTML, CSS, JavaScript, and Bootstrap.
              </h6>
              <p className="card-text">
                A beginner-friendly course covering the fundamentals of web development.
              </p>
              <Link to="/course/1" className="btn btn-primary btn-sm course-btn">
                Description
              </Link>
              <button
                type="button"
                className={`btn ${enrolledCourses.includes(1) ? 'btn-success' : 'btn-secondary'} btn-sm ms-2 course-btn`}
                onClick={() => enrollCourse(1)}
                disabled={enrolledCourses.includes(1)}
              >
                {enrolledCourses.includes(1) ? 'Enrolled ✓' : 'Enroll'}
              </button>
            </div>
          </div>
        </div>

        {/* Course 2 */}
        <div className="col-md-4">
          <div className="card course-card">
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>Basic & Core Java</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Master Java fundamentals & OOP concepts.
              </h6>
              <p className="card-text">
                Get hands-on experience with Java syntax, data and OOP.
              </p>
              <Link to="/course/2" className="btn btn-primary btn-sm course-btn">
                Description
              </Link>
              <button
                type="button"
                className={`btn ${enrolledCourses.includes(2) ? 'btn-success' : 'btn-secondary'} btn-sm ms-2 course-btn`}
                onClick={() => enrollCourse(2)}
                disabled={enrolledCourses.includes(2)}
              >
                {enrolledCourses.includes(2) ? 'Enrolled ✓' : 'Enroll'}
              </button>
            </div>
          </div>
        </div>

        {/* Course 3 */}
        <div className="col-md-4">
          <div className="card course-card">
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>Data Structures</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Learn sorting, searching & problem-solving.
              </h6>
              <p className="card-text">
                Understand the core concepts of data structures and algorithms in Java.
              </p>
              <Link to="/course/3" className="btn btn-primary btn-sm course-btn">
                Description
              </Link>
              <button
                type="button"
                className={`btn ${enrolledCourses.includes(3) ? 'btn-success' : 'btn-secondary'} btn-sm ms-2 course-btn`}
                onClick={() => enrollCourse(3)}
                disabled={enrolledCourses.includes(3)}
              >
                {enrolledCourses.includes(3) ? 'Enrolled ✓' : 'Enroll'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;