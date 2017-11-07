import React from 'react';
import Cluster from '../../hoc/Cluster';
import classes from './Layout.css';

const layout = (props) => (
	<Cluster>
		<div>Toolbar, Sidebrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</Cluster>
);

export default layout;