import React, { createContext, useContext, useState } from "react";

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [quizStatus, setQuizStatus] = useState({});

  // Course content data - typically this would come from an API
  const courseContentData = {
    1: [
      { id: 1, title: "HTML Basics", type: "document", url: "https://www.w3schools.com/html/html_basic.asp", completed: false },
      { id: 2, title: "CSS Fundamentals", type: "video", url: "https://youtu.be/yfoY53QXEnI?feature=shared", completed: false },
      { id: 3, title: "JavaScript Introduction", type: "document", url: "https://www.w3schools.com/js/", completed: false }
    ],
    2: [
      { id: 1, title: "Java Syntax", type: "document", url: "https://www.w3schools.com/java/java_syntax.asp", completed: false },
      { id: 2, title: "OOP Concepts", type: "video", url: "https://www.youtube.com/watch?v=a199KZGMNxk", completed: false },
      { id: 4, title: "Exception Handling", type: "link", url: "https://www.geeksforgeeks.org/exceptions-in-java/", completed: false }
    ],
    3: [
      { id: 1, title: "Arrays and Lists", type: "document", url: "https://www.geeksforgeeks.org/difference-between-list-and-array-in-python/", completed: false },
      { id: 2, title: "Stacks and Queues", type: "video", url: "https://www.youtube.com/watch?v=A3ZUpyrnCbM&pp=0gcJCfcAhR29_xXO", completed: false },
      { id: 3, title: "Trees and Graphs", type: "document", url: "https://www.geeksforgeeks.org/difference-between-graph-and-tree/#", completed: false }
    ]
  };

  // Function to enroll in a course
  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      
      // Initialize with actual course content
      setCourseProgress((prev) => ({ 
        ...prev, 
        [courseId]: courseContentData[courseId] || [] 
      }));
      
      setQuizStatus((prev) => ({ 
        ...prev, 
        [courseId]: { unlocked: false, completed: false, score: 0, totalQuestions: 5 } 
      }));
    }
  };

  // Function to mark content as completed
  const markContentCompleted = (courseId, contentId) => {
    setCourseProgress((prev) => {
      const updatedContent = prev[courseId].map(item => 
        item.id === contentId ? { ...item, completed: true } : item
      );
      
      // Check if all content is completed to unlock quiz
      const allCompleted = updatedContent.every(item => item.completed);
      if (allCompleted) {
        setQuizStatus((prevQuizStatus) => ({
          ...prevQuizStatus,
          [courseId]: { ...prevQuizStatus[courseId], unlocked: true }
        }));
      }
      
      return { ...prev, [courseId]: updatedContent };
    });
  };

  // Function to submit quiz
  const submitQuiz = (courseId, score, totalQuestions) => {
    setQuizStatus((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        completed: true,
        score: score,
        totalQuestions: totalQuestions
      }
    }));
  };

  // Function to calculate progress
  const calculateProgress = (courseId) => {
    if (!courseProgress[courseId]) return 0;

    const completedItems = courseProgress[courseId].filter(item => item.completed).length;
    const totalItems = courseProgress[courseId].length;

    return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  };

  return (
    <EnrollmentContext.Provider value={{ 
      enrolledCourses, 
      enrollCourse, 
      courseProgress, 
      markContentCompleted,
      calculateProgress,
      quizStatus,
      submitQuiz
    }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => useContext(EnrollmentContext);