import React from 'react';

import Course from './Course/Course';

const Courses = (props) => {

    let courses = props.courses.map(course => {
        return <Course key={course.name} course={course}  />
    });

    return (
        <div>
            {courses}
        </div>
    )
}

export default Courses;
