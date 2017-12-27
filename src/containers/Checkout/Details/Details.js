import React, { Component } from 'react';
import classes from './Details.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/';

class Details extends Component {

	state = {
		orderForm: {
			name: {
				kind: 'input',
				config: {
					type: 'text',
					placeholder: 'Full Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				kind: 'input',
				config: {
					type: 'text',
					placeholder: 'Street Address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			postcode: {
				kind: 'input',
				config: {
					type: 'text',
					placeholder: 'Postcode'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			country: {
				kind: 'input',
				config: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				kind: 'input',
				config: {
					type: 'email',
					placeholder: 'Email Address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				kind: 'select',
				config: {
					options: [
						{value: 'fastest', label: 'Fastest'},
						{value: 'cheapest', label: 'Cheapest'}
					]
				},
				value: 'fastest'
			}
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		const formData = {};
		for(let field in this.state.orderForm) {
			formData[field] = this.state.orderForm[field].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		}
		
		this.props.onOrderBurger(order);

	}

	checkValidity(value, rules) {

		let isValid = false;

		if(rules.required) {
			isValid = value.trim() !== '';
		}

		if(rules.minLength) {
			isValid = value.length >= rules.minLength;
		}

		return isValid;

	}

	inputChangedHandler = (event, inputId) => {

		const updatedForm = {
			...this.state.orderForm
		};

		const updatedElement = {
			...this.state.orderForm[inputId]
		};

		updatedElement.value = event.target.value;
		updatedElement.valid = updatedElement.validation ? this.checkValidity(updatedElement.value, updatedElement.validation) : true;
		if(!updatedElement.touched)
			updatedElement.touched = true;
		updatedForm[inputId] = updatedElement;

		this.setState({orderForm: updatedForm});

	}

	render() {

		let fields = Object.keys(this.state.orderForm)
			.map(field => {
				return <Input
					key={field}
					kind={this.state.orderForm[field].kind}
					config={this.state.orderForm[field].config}
					value={this.state.orderForm[field].value}
					handler={(event) => this.inputChangedHandler(event,field)}
					valid={this.state.orderForm[field].valid}
					touched={this.state.orderForm[field].touched} />
			});

		// ALTERNATE - flatten array then map
		// const formElements = [];
		// for(let key in this.state.orderForm) {
		// 	formElements.push({
		// 		id: key,
		// 		config: this.state.orderForm[key]
		// 	});
		// }

		let form = (<form onSubmit={this.orderHandler}>
						{fields}
						<Button btnType="Success">ORDER</Button>
					</form>);
		if(this.props.loading)
			form = <Spinner/>;

		return (
			<div className={classes.Details}>
				<h4>Enter your Details</h4>
				{form}
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
};


const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData) => dispatch(orderActions.orderBurger(orderData))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Details, axios));