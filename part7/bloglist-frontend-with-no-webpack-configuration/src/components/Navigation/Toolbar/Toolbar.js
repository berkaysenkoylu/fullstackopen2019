import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<div>
				FSO2019 | Part 7
			</div>
			<div className={classes.SmallScreens}>
				<SideDrawerToggle clicked={props.sidedrawerToggleClicked} />
			</div>
			<nav>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;