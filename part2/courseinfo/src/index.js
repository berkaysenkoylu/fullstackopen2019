import React from 'react';
import ReactDOM from 'react-dom';

import Courses from './Components/Courses';

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            parts: [
                {
                    id: 1,
                    name: 'Fundamentals of React',
                    exercises: 10
                },
                {
                    id: 2,
                    name: 'Using props to pass data',
                    exercises: 7
                },
                {
                    id: 3,
                    name: 'State of a component',
                    exercises: 14
                },
                {
                    id: 4,
                    name: 'Redux',
                    exercises: 11
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <Courses courses={courses} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
