import React from 'react';

import Header from '../Course/Header/Header';
import Content from '../Course/Content/Content';

const Course = (props) => {

    return (
        <div>
            <Header headerName={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )
}

export default Course;
