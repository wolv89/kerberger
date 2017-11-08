import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Cluster from '../../../hoc/Cluster';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];
	if(props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<Cluster>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo/>
				</div>
				<nav>
					<NavigationItems/>
				</nav>
			</div>
			<Backdrop show={props.open} clicked={props.closed}/>
		</Cluster>
	);
};

export default sideDrawer;