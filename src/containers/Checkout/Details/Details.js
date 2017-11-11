import React, { Component } from 'react';
import classes from './Details.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Details extends Component {

	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({loading:true});

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Pete D',
				address: {
					street: 'Binary Lane',
					postcode: '1010',
					country: 'Australia'
				},
				email: '11010@binary.io'
			},
			deliveryMethod: 'amazon'
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading:false});
				console.log(response);
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading:false});
				console.log(error)
			});

	}

	render() {

		let form = (<form>
						<input className={classes.Input} type="text" name="name" placeholder="Name" />
						<input className={classes.Input} type="email" name="email" placeholder="Email" />
						<input className={classes.Input} type="text" name="street" placeholder="Street" />
						<input className={classes.Input} type="text" name="postcode" placeholder="Postcode" />
						<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
					</form>);
		if(this.state.loading)
			form = <Spinner/>;

		return (
			<div className={classes.Details}>
				<h4>Enter your Details</h4>
				{form}
			</div>
		);
	}

}

export default Details;