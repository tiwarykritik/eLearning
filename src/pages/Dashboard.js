import React from "react";
import { useEnrollment } from "../components/EnrollmentContext";

// Course titles mapping
const courseTitles = {
  1: "Web Development",
  2: "Basic & Core Java",
  3: "Data Structures"
};

const Dashboard = () => {
  // Use the enrollment context
  const { enrolledCourses } = useEnrollment();

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              My Courses
            </div>
            <div className="card-body">
              {enrolledCourses.length > 0 ? (
                <>
                  <p>You are currently enrolled in the following courses:</p>
                  <ul className="list-group">
                    {enrolledCourses.map(courseId => (
                      <li key={courseId} className="list-group-item d-flex justify-content-between align-items-center">
                        {courseTitles[courseId] || `Course ${courseId}`}
                        <span className="badge bg-primary rounded-pill">In progress</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>You are not enrolled in any courses yet. <a href="/courses">Browse courses</a></p>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;