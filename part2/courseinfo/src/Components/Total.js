import React from 'react';

const Total = (props) => {
    let totalCount = 0;

    props.parts.forEach(part => {
        totalCount += part.exercises;
    });

    return (
        <p>
            Number of exercises: {totalCount}
        </p>
    )
}

export default Total;
