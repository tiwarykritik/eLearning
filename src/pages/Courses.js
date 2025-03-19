import React from "react";
import { Link } from "react-router-dom";
import { useEnrollment } from "../components/EnrollmentContext";
import "./Courses.css"; // Import styles

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

  console.log("Current enrolled courses:", enrolledCourses);

  return (
    <div className="container mt-4 courses-container">
      <h1 className="text-center courses-title">Courses</h1>
      <div className="row justify-content-center">
        {courseData.map(course => (
          <div key={course.id} className="col-md-4">
            <div className="card course-card">
              <div className="card-body">
                <h4 className="card-title" style={{ fontWeight: "bold" }}>{course.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{course.subtitle}</h6>
                <p className="card-text">{course.description}</p>
                <Link to={`/course/${course.id}`} className="btn btn-primary btn-sm course-btn">
                  Description
                </Link>
                <button
                  type="button"
                  className={`btn ${enrolledCourses.includes(course.id) ? 'btn-success' : 'btn-secondary'} btn-sm ms-2 course-btn`}
                  onClick={() => enrollCourse(course.id)}
                  disabled={enrolledCourses.includes(course.id)}
                >
                  {enrolledCourses.includes(course.id) ? 'Enrolled ✓' : 'Enroll'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
