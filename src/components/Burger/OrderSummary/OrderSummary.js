import React, {Component} from 'react';
import Cluster from '../../../hoc/Cluster';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	// Only to demonstrate via Modal
	// componentWillUpdate() {
	// 	console.log('[OrderSummary] Will Update');
	// }

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return (
					<li key={igKey}>
						<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
					</li>
				);
			});

		return (
			<Cluster>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<h4>Total Price: ${this.props.price.toFixed(2)}</h4>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Cluster>
		);
	}
}

export default OrderSummary;