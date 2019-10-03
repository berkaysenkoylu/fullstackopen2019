import React from 'react';

import './stat.module.css';

const stat = (props) => {

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.amount} {props.name !== 'positive' ? null : '%'}</td> 
        </tr>
            
    )
}

export default stat;
