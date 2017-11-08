import React, {Component} from 'react';

import Cluster from '../../hoc/Cluster';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerOpenedHandler = () => {
		this.setState({showSideDrawer: true});
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState( (prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		} );
	}

	render () {
		return (
			<Cluster>
				<Toolbar open={this.sideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Cluster>
		);
	}
};

export default Layout;