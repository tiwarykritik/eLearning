import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const EnrollmentContext = createContext();

// Create provider component
export const EnrollmentProvider = ({ children }) => {
  // Get enrolled courses from localStorage or default to empty array
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const savedCourses = localStorage.getItem("enrolledCourses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Function to enroll in a course
  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, setEnrolledCourses, enrollCourse }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

// Custom hook to use the enrollment context
export const useEnrollment = () => useContext(EnrollmentContext);