import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
	return (
		<li className={classes.NavigationItem} id={props.id}>
			<NavLink to={props.path} exact={props.exact} activeClassName={classes.NavigationItemActive}>{props.children}</NavLink>
		</li>
	);
};

export default NavigationItem;