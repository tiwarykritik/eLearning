// src/pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { useEnrollment } from "../components/EnrollmentContext";
import CourseContent from "../components/CourseContent";

// Course titles mapping
const courseTitles = {
  1: "Web Development",
  2: "Basic & Core Java",
  3: "Data Structures"
};

const Dashboard = () => {
  // Use the enrollment context
  const { enrolledCourses, courseProgress, calculateProgress, quizStatus } = useEnrollment();

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      
      {enrolledCourses.length > 0 ? (
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">My Courses</div>
              <div className="card-body">
                {enrolledCourses.map(courseId => {
                  const progress = calculateProgress(courseId);
                  const quiz = quizStatus[courseId] || {};

                  return (
                    <div key={courseId} className="mb-4">
                      <h4>{courseTitles[courseId] || `Course ${courseId}`}</h4>
                      
                      {/* Progress bar */}
                      <div className="progress mb-3">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${progress}%` }} 
                          aria-valuenow={progress} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          {progress}% Complete
                        </div>
                      </div>
                      
                      {/* Course content */}
                      <div className="card">
                        <div className="card-header">Course Content</div>
                        <div className="card-body">
                          <CourseContent courseId={courseId} />
                        </div>
                      </div>
                      
                      {/* Quiz section */}
                      <div className="card mt-3">
                        <div className="card-header">Quiz</div>
                        <div className="card-body">
                          {quiz.unlocked ? (
                            quiz.completed ? (
                              <div>
                                <p>Quiz completed!</p>
                                <p>Your score: {quiz.score}/100</p>
                              </div>
                            ) : (
                              <div>
                                <p>Quiz is unlocked! Complete it to test your knowledge.</p>
                                <Link to={`/quiz/${courseId}`} className="btn btn-primary">Start Quiz</Link>
                              </div>
                            )
                          ) : (
                            <p>🔒Complete all course contents to unlock the quiz.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">
          You are not enrolled in any courses yet.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
