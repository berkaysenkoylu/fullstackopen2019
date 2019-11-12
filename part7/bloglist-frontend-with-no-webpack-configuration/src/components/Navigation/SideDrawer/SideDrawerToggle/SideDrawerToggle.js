import React from 'react';

import classes from './SideDrawerToggle.module.css';

const SideDrawerToggle = (props) => {
    return (
        <div className={classes.SideDrawerToggle} onClick={props.clicked}>
            <span>&nbsp;</span>
        </div>
    )
}

export default SideDrawerToggle;
