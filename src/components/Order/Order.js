import React from 'react';
import classes from './Order.css';

const order = (props) => {

	const ingredients = [];
	for(let iName in props.ingredients) {
		ingredients.push({name: iName, amount: props.ingredients[iName]});
	}

	const ingredientOutput = ingredients.map(ing => {
		return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', padding: '4px', border: '1px solid #eee'}}
				key={ing.name}>{ing.name} ({ing.amount})</span>
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>AUD ${props.price.toFixed(2)}</strong></p>
		</div>
	);
};

export default order;