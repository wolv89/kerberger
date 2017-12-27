import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Orders extends Component {

	componentDidMount() {
		this.props.fetchOrders();
	}

	render () {

		let page = (
			<div>
				{this.props.orders.map(order => (
					<Order key={order.id} ingredients={order.ingredients} price={+order.price} />
				))}
			</div>
		);

		if(this.props.loading) {
			page = <Spinner/>;
		}

		return page;
	}

}


const mapStateToProps = state => {
	return {
		loading: state.order.loadingOrders,
		orders: state.order.orders
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: () => dispatch(actions.fetchOrders())
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));