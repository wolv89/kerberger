import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cluster from '../../hoc/Cluster';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/';

import axios from '../../axios-orders';




class BurgerBuilder extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		totalPrice: 4,
		purchaseable: false,
		purchasing: false
	}

	componentDidMount() {
		// console.log(this.props) --> gets Route props
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = 0; //INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = 0; //INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing:true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing:false});
	}

	purchaseContinueHandler = () => {

		// this.setState({loading:true});
		/*
		const ingredientParams = Object.keys(this.state.ingredients)
			.map(igKey => {
				return encodeURIComponent(igKey) + '=' + encodeURIComponent(this.state.ingredients[igKey]);
			})
			.join('&');

		//this.props.history.push('/checkout?' + ingredientParams);
		this.props.history.push({
			pathname: '/checkout',
			search: ingredientParams + '&price=' + this.state.totalPrice
		}) */

		// Redux update
		this.props.history.push('/checkout');

	}

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger =  this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

		if(this.props.ings) {
			burger = (
				<Cluster>
					<Burger ingredients={this.props.ings}/>
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler} />
				</Cluster>
			);
			orderSummary = <OrderSummary
						ingredients={this.props.ings}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.props.price} />;
		}

		return (
			<Cluster>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Cluster>
		);
	}

}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));