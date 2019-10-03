import React from 'react';

const button = (props) => {
    return (
        <button onClick={props.clicked}>{props.btnName}</button>
    )
}

export default button;
