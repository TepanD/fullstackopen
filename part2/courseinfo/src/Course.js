import React from "react";

const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((x, index) => {
        return (
          <div key={index}>
            <Part name={x.name} exercises={x.exercises} />
          </div>
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      <p>total of {total} exercises</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
