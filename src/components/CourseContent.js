import React from "react";
import { useEnrollment } from "./EnrollmentContext";
import "./CourseContent.css";

const CourseContent = ({ courseId }) => {
  const { courseProgress, markContentCompleted } = useEnrollment();
  
  // Get content for this course
  const content = courseProgress[courseId] || [];
  
  const handleViewContent = (item) => {
    // Open the URL in a new tab
    window.open(item.url, "_blank");
    
    // Mark as completed after viewing
    markContentCompleted(courseId, item.id);
  };
  
  return (
    <div className="course-content">
      {content.length > 0 ? (
        <ul className="content-list">
          {content.map(item => (
            <li key={item.id} className="content-item">
              <div className="content-header">
                <h3 className="content-title">{item.title}</h3>
                <span className="content-type-badge">
                  {item.type === "document" && "Document"}
                  {item.type === "video" && "Video"}
                  {item.type === "link" && "External Resource"}
                </span>
              </div>
              
              <div className="content-actions">
                <button 
                  className="view-button"
                  onClick={() => handleViewContent(item)}
                >
                  View
                </button>
                <button 
                  className={`status-button ${item.completed ? 'completed' : ''}`}
                  disabled={true}
                >
                  {item.completed ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-content-message">
          No content available for this course.
        </p>
      )}
    </div>
  );
};

export default CourseContent;