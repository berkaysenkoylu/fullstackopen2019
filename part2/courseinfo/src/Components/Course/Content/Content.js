import React from 'react';

import Part from './Part/Part';

const Content = (props) => {

    // 2.3*
    let exerciseNumbers = props.parts.map(element => {
        return element.exercises
    });

    // 2.3*
    let totalExerciseNumber = exerciseNumbers.reduce((acc, curr) => acc + curr);

    let content = props.parts.map(element => {
        //totalExerciseNumber += element.exercises;
        return <Part key={element.name} part={element.name} exercises={element.exercises} />
    })

    return (
        <>
            {content}
            <p>total of {totalExerciseNumber} exercises</p>
        </>
    )
}

export default Content;
