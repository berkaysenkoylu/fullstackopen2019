import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let classList = [classes.SideDrawer, classes.Closed];

    if(props.show) {
        classList = [classes.SideDrawer, classes.Open];
    }

    let content = (
        <nav className={classList.join(' ')} onClick={props.closed}>
            <h1>FSO 2019</h1>
            <Link to="/">Home</Link>
        </nav>
    );

    if (props.userToken && props.userToken !== null && props.userToken !== undefined) {
        content = (
            <nav className={classList.join(' ')} onClick={props.closed}>
                <h1>FSO 2019</h1>

                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/users">Users</Link>
             
                <p className={classes.CopyrightText}>&copy; 2019</p>
            </nav>
        );
    }

    return (
        <div>
            <Backdrop show={props.show} clicked={props.closed} />

            {content}
        </div>
    )
}

export default SideDrawer;