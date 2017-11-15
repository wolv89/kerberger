import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Details from './Details/Details';

class Checkout extends Component {

	/*
	componentWillMount() {

		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for (let param of query.entries()) {
			if(param[0] === 'price') {
				price = +param[1];
			}
			else {
				ingredients[param[0]] = +param[1]; // Note the + to cast to int
			}
		}

		this.setState({ingredients: ingredients, price: price});

	}
	*/

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/details');
	}

	render() {

		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler} />
				<Route
					path={this.props.match.path + '/details'}
					component={Details} />
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		ings: state.ingredients
	}
};

export default connect(mapStateToProps)(Checkout);