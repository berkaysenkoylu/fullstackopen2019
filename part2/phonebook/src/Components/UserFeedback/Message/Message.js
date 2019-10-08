import React from 'react';

import classes from './Message.module.css';

const Success = (props) => {
    let componentClasses = [classes.Message, classes.SuccessMessage];

    if(props.error) {
        componentClasses = [classes.Message, classes.ErrorMessage];
    }

    return (
        <div className={componentClasses.join(' ')}>{props.children}</div>
    )
}

export default Success;
