import React from "react";
import { useParams } from "react-router-dom";
import webDevImage from "../assets/web-development.jpg";
import javaImage from "../assets/core-java.jpg";
import dsaImage from "../assets/dsa.jpg";
import "./CourseDescription.css"; 

const CourseDescription = () => {
  const { id } = useParams();

  const courses = {
    1: {
      title: "Web Design & Development",
      image: webDevImage,
      description: (
        <>
          <p className="course-intro">Web development involves creating websites and applications using various technologies.</p>
          <h4 className="section-title">Key Topics:</h4>
          <ul className="course-list">
            <li><strong>HTML:</strong> Structures web pages.</li>
            <li><strong>CSS:</strong> Styles and layouts for web pages.</li>
            <li><strong>JavaScript:</strong> Adds interactivity.</li>
            <li><strong>Bootstrap:</strong> Makes websites responsive.</li>
          </ul>
          <h4 className="section-title">Benefits:</h4>
          <p>Mastering web development allows you to create professional websites and web applications.</p>
          <h4 className="section-title">Prerequisites:</h4>
          <p>Basic knowledge of computers and willingness to learn coding.</p>
        </>
      ),
    },
    2: {
      title: "Basic & Core Java",
      image: javaImage,
      description: (
        <>
          <p className="course-intro">Java is a powerful programming language used for application development.</p>
          <h4 className="section-title">Key Topics:</h4>
          <ul className="course-list">
            <li>OOP Principles: Inheritance, Polymorphism, Encapsulation.</li>
            <li>Method Overloading & Overriding.</li>
            <li>Exception Handling for runtime errors.</li>
            <li>Multithreading for parallel execution.</li>
          </ul>
          <h4 className="section-title">Benefits:</h4>
          <p>Java is widely used in enterprise applications, Android development, and backend systems.</p>
          <h4 className="section-title">Prerequisites:</h4>
          <p>Basic programming knowledge is recommended but not required.</p>
        </>
      ),
    },
    3: {
      title: "Data Structures & Algorithms",
      image: dsaImage,
      description: (
        <>
          <p className="course-intro">DSA is essential for efficient problem-solving and programming interviews.</p>
          <h4 className="section-title">Key Topics:</h4>
          <ul className="course-list">
            <li>Sorting and Searching Algorithms.</li>
            <li>Linked Lists, Stacks, and Queues.</li>
            <li>Graphs and Trees for real-world applications.</li>
            <li>Dynamic Programming for optimization.</li>
          </ul>
          <h4 className="section-title">Benefits:</h4>
          <p>DSA knowledge is crucial for competitive programming, software development, and technical interviews.</p>
          <h4 className="section-title">Prerequisites:</h4>
          <p>Basic understanding of programming concepts.</p>
        </>
      ),
    },
  };

  const course = courses[id];

  if (!course) {
    return <div className="container mt-4"><h1>Course Not Found</h1></div>;
  }

  return (
    <div className="container mt-4 course-description">
      <h1 className="text-center course-title">{course.title}</h1>
      <img src={course.image} alt={course.title} className="img-fluid course-image rounded" />
      <div className="course-content">{course.description}</div>
    </div>
  );
};

export default CourseDescription;
