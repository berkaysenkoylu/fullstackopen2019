import React from 'react';

import Part from './Part/Part';

const Content = (props) => {

    let content = props.parts.map(element => {
        return <Part key={element.name} part={element.name} exercises={element.exercises} />
    })

    return (
        <>
            {content}
        </>
    )
}

export default Content;
